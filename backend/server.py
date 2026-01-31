from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import httpx
import bcrypt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ==================== MODELS ====================

class UserBase(BaseModel):
    email: str
    name: str
    picture: Optional[str] = None

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None
    created_at: datetime

class JobApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    application_id: str
    job_id: str
    user_id: str
    status: str = "pending"
    applied_at: datetime

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactMessageResponse(BaseModel):
    message_id: str
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime

# ==================== AUTH HELPERS ====================

async def get_current_user(request: Request) -> User:
    """Extract and validate session token from cookies or Authorization header"""
    session_token = request.cookies.get("session_token")
    
    if not session_token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            session_token = auth_header.split(" ")[1]
    
    if not session_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Find session
    session_doc = await db.user_sessions.find_one(
        {"session_token": session_token},
        {"_id": 0}
    )
    
    if not session_doc:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    # Check expiry with timezone awareness
    expires_at = session_doc["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
    
    # Find user
    user_doc = await db.users.find_one(
        {"user_id": session_doc["user_id"]},
        {"_id": 0}
    )
    
    if not user_doc:
        raise HTTPException(status_code=401, detail="User not found")
    
    # Convert created_at if string
    if isinstance(user_doc.get("created_at"), str):
        user_doc["created_at"] = datetime.fromisoformat(user_doc["created_at"])
    
    return User(**user_doc)

# ==================== AUTH ROUTES ====================

@api_router.post("/auth/register")
async def register(user_data: UserCreate, response: Response):
    """Register a new user with email/password"""
    # Check if user exists
    existing = await db.users.find_one({"email": user_data.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password
    password_hash = bcrypt.hashpw(user_data.password.encode('utf-8'), bcrypt.gensalt())
    
    # Create user
    user_id = f"user_{uuid.uuid4().hex[:12]}"
    user_doc = {
        "user_id": user_id,
        "email": user_data.email,
        "name": user_data.name,
        "picture": None,
        "password_hash": password_hash.decode('utf-8'),
        "auth_type": "email",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.users.insert_one(user_doc)
    
    # Create session
    session_token = f"session_{uuid.uuid4().hex}"
    session_doc = {
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.user_sessions.insert_one(session_doc)
    
    # Set cookie
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
        max_age=7*24*60*60
    )
    
    return {
        "user_id": user_id,
        "email": user_data.email,
        "name": user_data.name,
        "picture": None
    }

@api_router.post("/auth/login")
async def login(credentials: UserLogin, response: Response):
    """Login with email/password"""
    user_doc = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    
    if not user_doc:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Check password
    if not user_doc.get("password_hash"):
        raise HTTPException(status_code=401, detail="Please use Google login for this account")
    
    if not bcrypt.checkpw(credentials.password.encode('utf-8'), user_doc["password_hash"].encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create session
    session_token = f"session_{uuid.uuid4().hex}"
    session_doc = {
        "user_id": user_doc["user_id"],
        "session_token": session_token,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.user_sessions.insert_one(session_doc)
    
    # Set cookie
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
        max_age=7*24*60*60
    )
    
    return {
        "user_id": user_doc["user_id"],
        "email": user_doc["email"],
        "name": user_doc["name"],
        "picture": user_doc.get("picture")
    }

@api_router.post("/auth/session")
async def create_session_from_google(request: Request, response: Response):
    """Exchange Google OAuth session_id for our session"""
    body = await request.json()
    session_id = body.get("session_id")
    
    if not session_id:
        raise HTTPException(status_code=400, detail="session_id required")
    
    # Call Emergent Auth to get user data
    async with httpx.AsyncClient() as client_http:
        try:
            auth_response = await client_http.get(
                "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
                headers={"X-Session-ID": session_id}
            )
            if auth_response.status_code != 200:
                raise HTTPException(status_code=401, detail="Invalid session_id")
            
            user_data = auth_response.json()
        except Exception as e:
            logger.error(f"Auth error: {e}")
            raise HTTPException(status_code=401, detail="Authentication failed")
    
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data["email"]}, {"_id": 0})
    
    if existing_user:
        user_id = existing_user["user_id"]
        # Update user info
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {
                "name": user_data["name"],
                "picture": user_data.get("picture")
            }}
        )
    else:
        # Create new user
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        user_doc = {
            "user_id": user_id,
            "email": user_data["email"],
            "name": user_data["name"],
            "picture": user_data.get("picture"),
            "auth_type": "google",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(user_doc)
    
    # Create our own session
    session_token = f"session_{uuid.uuid4().hex}"
    session_doc = {
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.user_sessions.insert_one(session_doc)
    
    # Set cookie
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
        max_age=7*24*60*60
    )
    
    return {
        "user_id": user_id,
        "email": user_data["email"],
        "name": user_data["name"],
        "picture": user_data.get("picture")
    }

@api_router.get("/auth/me")
async def get_me(user: User = Depends(get_current_user)):
    """Get current user info"""
    return {
        "user_id": user.user_id,
        "email": user.email,
        "name": user.name,
        "picture": user.picture
    }

@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    """Logout and clear session"""
    session_token = request.cookies.get("session_token")
    
    if session_token:
        await db.user_sessions.delete_one({"session_token": session_token})
    
    response.delete_cookie(
        key="session_token",
        path="/",
        secure=True,
        samesite="none"
    )
    
    return {"message": "Logged out successfully"}

# ==================== JOB ROUTES ====================

# Mock job data
MOCK_JOBS = [
    {
        "job_id": "job_001",
        "title": "Barista",
        "company": "Bean & Brew Coffee",
        "location": "Helsinki",
        "shift_type": "Part-time",
        "pay_rate": 14.50,
        "pay_frequency": "hourly",
        "description": "Join our team at Bean & Brew! We're looking for friendly baristas to craft delicious coffee drinks and provide excellent customer service. Flexible hours perfect for students.",
        "requirements": ["Customer service skills", "Ability to work weekends", "Basic math skills"],
        "benefits": ["Free coffee", "Flexible scheduling", "Tips"],
        "posted_at": "2025-01-10T10:00:00Z",
        "employer_verified": True,
        "instant_payout": True,
        "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"
    },
    {
        "job_id": "job_002",
        "title": "Delivery Rider",
        "company": "QuickDrop Deliveries",
        "location": "Espoo",
        "shift_type": "Flexible",
        "pay_rate": 16.00,
        "pay_frequency": "hourly",
        "description": "Be your own boss! Deliver packages around Espoo with flexible hours. Use your own bike or scooter. Perfect gig for those who love being outdoors.",
        "requirements": ["Own transportation", "Smartphone", "Valid ID"],
        "benefits": ["Choose your hours", "Weekly payments", "Bonus incentives"],
        "posted_at": "2025-01-12T14:30:00Z",
        "employer_verified": True,
        "instant_payout": True,
        "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
    },
    {
        "job_id": "job_003",
        "title": "Retail Cashier",
        "company": "Nordic Mart",
        "location": "Tampere",
        "shift_type": "Part-time",
        "pay_rate": 13.00,
        "pay_frequency": "hourly",
        "description": "Looking for reliable cashiers for our busy retail store. Handle transactions, assist customers, and help maintain store appearance. Evening and weekend shifts available.",
        "requirements": ["Cash handling experience", "Customer friendly", "Reliable"],
        "benefits": ["Employee discount", "Regular schedule", "Training provided"],
        "posted_at": "2025-01-08T09:00:00Z",
        "employer_verified": True,
        "instant_payout": False,
        "image": "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400"
    },
    {
        "job_id": "job_004",
        "title": "Private Tutor",
        "company": "EduConnect",
        "location": "Remote",
        "shift_type": "Flexible",
        "pay_rate": 25.00,
        "pay_frequency": "hourly",
        "description": "Help students excel in their studies! We're seeking tutors for math, science, and languages. Set your own schedule and teach from anywhere.",
        "requirements": ["Subject expertise", "Teaching experience preferred", "Good communication"],
        "benefits": ["Remote work", "Set your rates", "Flexible hours"],
        "posted_at": "2025-01-11T16:00:00Z",
        "employer_verified": True,
        "instant_payout": True,
        "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400"
    },
    {
        "job_id": "job_005",
        "title": "Event Staff",
        "company": "FestPro Events",
        "location": "Helsinki",
        "shift_type": "Gig",
        "pay_rate": 18.00,
        "pay_frequency": "hourly",
        "description": "Work at exciting concerts, sports events, and festivals! Help with setup, crowd management, and guest services. Great for those who thrive in dynamic environments.",
        "requirements": ["Physical stamina", "Team player", "Flexible availability"],
        "benefits": ["Event access", "Meet new people", "Varied work"],
        "posted_at": "2025-01-13T11:00:00Z",
        "employer_verified": True,
        "instant_payout": True,
        "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400"
    },
    {
        "job_id": "job_006",
        "title": "Warehouse Associate",
        "company": "LogiFlow",
        "location": "Vantaa",
        "shift_type": "Part-time",
        "pay_rate": 15.50,
        "pay_frequency": "hourly",
        "description": "Join our warehouse team! Pick, pack, and ship orders in a fast-paced environment. Morning and evening shifts available. No experience needed.",
        "requirements": ["Physical fitness", "Attention to detail", "Punctuality"],
        "benefits": ["Overtime available", "Team environment", "Growth opportunities"],
        "posted_at": "2025-01-09T08:00:00Z",
        "employer_verified": True,
        "instant_payout": False,
        "image": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400"
    }
]

@api_router.get("/jobs")
async def get_jobs(
    location: Optional[str] = None,
    shift_type: Optional[str] = None,
    min_pay: Optional[float] = None,
    instant_payout: Optional[bool] = None
):
    """Get all jobs with optional filters"""
    jobs = MOCK_JOBS.copy()
    
    if location and location != "all":
        jobs = [j for j in jobs if j["location"].lower() == location.lower()]
    
    if shift_type and shift_type != "all":
        jobs = [j for j in jobs if j["shift_type"].lower() == shift_type.lower()]
    
    if min_pay is not None:
        jobs = [j for j in jobs if j["pay_rate"] >= min_pay]
    
    if instant_payout is not None:
        jobs = [j for j in jobs if j["instant_payout"] == instant_payout]
    
    return jobs

@api_router.get("/jobs/{job_id}")
async def get_job(job_id: str):
    """Get a specific job by ID"""
    for job in MOCK_JOBS:
        if job["job_id"] == job_id:
            return job
    raise HTTPException(status_code=404, detail="Job not found")

@api_router.post("/jobs/{job_id}/apply")
async def apply_for_job(job_id: str, user: User = Depends(get_current_user)):
    """Apply for a job (requires authentication)"""
    # Check if job exists
    job = None
    for j in MOCK_JOBS:
        if j["job_id"] == job_id:
            job = j
            break
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Check if already applied
    existing = await db.job_applications.find_one(
        {"job_id": job_id, "user_id": user.user_id},
        {"_id": 0}
    )
    if existing:
        raise HTTPException(status_code=400, detail="Already applied for this job")
    
    # Create application
    application_id = f"app_{uuid.uuid4().hex[:12]}"
    application_doc = {
        "application_id": application_id,
        "job_id": job_id,
        "user_id": user.user_id,
        "status": "pending",
        "applied_at": datetime.now(timezone.utc).isoformat()
    }
    await db.job_applications.insert_one(application_doc)
    
    return {"message": "Application submitted successfully", "application_id": application_id}

@api_router.get("/my-applications")
async def get_my_applications(user: User = Depends(get_current_user)):
    """Get current user's job applications"""
    applications = await db.job_applications.find(
        {"user_id": user.user_id},
        {"_id": 0}
    ).to_list(100)
    
    # Enrich with job details
    enriched = []
    for app in applications:
        for job in MOCK_JOBS:
            if job["job_id"] == app["job_id"]:
                enriched.append({
                    **app,
                    "job_title": job["title"],
                    "company": job["company"],
                    "location": job["location"]
                })
                break
    
    return enriched

# ==================== CONTACT ROUTES ====================

@api_router.post("/contact", response_model=ContactMessageResponse)
async def submit_contact(message: ContactMessage):
    """Submit a contact form message"""
    message_id = f"msg_{uuid.uuid4().hex[:12]}"
    message_doc = {
        "message_id": message_id,
        "name": message.name,
        "email": message.email,
        "subject": message.subject,
        "message": message.message,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.contact_messages.insert_one(message_doc)
    
    return ContactMessageResponse(
        message_id=message_id,
        name=message.name,
        email=message.email,
        subject=message.subject,
        message=message.message,
        created_at=datetime.now(timezone.utc)
    )

# ==================== STATS ROUTES ====================

@api_router.get("/stats")
async def get_stats():
    """Get platform statistics (mock data)"""
    return {
        "total_jobs": len(MOCK_JOBS),
        "active_workers": 15420,
        "verified_employers": 892,
        "avg_payout_time": "2 hours"
    }

# ==================== SETUP ====================

@api_router.get("/")
async def root():
    return {"message": "FinnJob API", "version": "1.0.0"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

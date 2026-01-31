# FinnJob - PRD (Product Requirements Document)

## Original Problem Statement
Create a modern, professional job marketplace website called FinnJob (similar to Zenjob). FinnJob is a platform that connects students, gig workers, and job seekers with part-time, flexible, and short-term jobs with fast or instant payouts.

## User Choices
- **Authentication**: Both JWT-based custom auth and Google social login
- **Job Data**: Static/mock job data for demo purposes
- **Instant Payout**: UI mockup only (visual demonstration)

## User Personas
1. **Job Seekers**: Students, gig workers, freelancers looking for flexible part-time work
2. **Employers**: Businesses needing temporary/flexible staffing solutions
3. **Platform Admins**: Manage platform operations and user support

## Core Requirements (Static)
- Clean, minimal, modern UI with trust-focused professional startup aesthetic
- Soft colors (blue, teal, white) with mobile-first responsive design
- Job marketplace functionality with search and filters
- User authentication (JWT + Google OAuth)
- Contact form and support pages

## What's Been Implemented (January 2025)

### Backend (FastAPI + MongoDB)
- ✅ User registration/login with JWT (bcrypt password hashing)
- ✅ Google OAuth integration via Emergent Auth
- ✅ Session management with httpOnly cookies
- ✅ Mock job data API (6 realistic jobs)
- ✅ Job filtering by location, shift type, instant payout
- ✅ Job application system (authenticated)
- ✅ Contact form submission endpoint
- ✅ Platform stats endpoint

### Frontend (React + TailwindCSS + Shadcn UI)
- ✅ Homepage with hero section, how it works, features
- ✅ Job listings page with search and filters
- ✅ Job detail page with apply functionality
- ✅ For Job Seekers page
- ✅ For Employers page
- ✅ About FinnJob page
- ✅ Contact & Support page with form
- ✅ Login/Signup pages (email + Google)
- ✅ User Dashboard (authenticated)
- ✅ Responsive glassmorphic navbar
- ✅ Professional footer with links
- ✅ Motion animations (framer-motion)

### Design System
- Typography: Outfit (headings), DM Sans (body)
- Brand colors: Teal (#2DD4BF), Slate (#0F172A)
- Glassmorphism effects, rounded corners, soft shadows

## Prioritized Backlog

### P0 (Critical) - None remaining for MVP

### P1 (High Priority)
- [ ] Real job posting by employers (admin dashboard)
- [ ] Employer verification workflow
- [ ] Job application notifications
- [ ] Password reset functionality
- [ ] Email verification for new accounts

### P2 (Medium Priority)
- [ ] Worker profile with skills/availability
- [ ] Employer dashboard with applicant management
- [ ] Job recommendations based on profile
- [ ] Saved jobs functionality
- [ ] Application status tracking
- [ ] Real payment integration for instant payouts

### P3 (Nice to Have)
- [ ] Push notifications
- [ ] In-app messaging between workers and employers
- [ ] Reviews and ratings system
- [ ] Advanced analytics dashboard
- [ ] Calendar integration for shift scheduling

## Technical Architecture
```
Frontend: React 19 + TailwindCSS + Shadcn UI + Framer Motion
Backend: FastAPI + Motor (MongoDB async driver)
Database: MongoDB
Auth: JWT + Emergent Google OAuth
Hosting: Kubernetes (Emergent Platform)
```

## API Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/session` - Google OAuth session
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout
- `GET /api/jobs` - List jobs (with filters)
- `GET /api/jobs/{id}` - Get job details
- `POST /api/jobs/{id}/apply` - Apply for job
- `GET /api/my-applications` - User's applications
- `POST /api/contact` - Submit contact form
- `GET /api/stats` - Platform statistics

## Next Tasks
1. Implement real employer job posting system
2. Add email notifications for applications
3. Build employer dashboard for managing listings
4. Integrate real payment system for payouts

import requests
import sys
import json
from datetime import datetime

class FinnJobAPITester:
    def __init__(self, base_url="https://quick-gig-finder.preview.emergentagent.com"):
        self.base_url = base_url
        self.session_token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if headers:
            test_headers.update(headers)
        
        if self.session_token:
            test_headers['Authorization'] = f'Bearer {self.session_token}'

        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers)

            success = response.status_code == expected_status
            
            if success:
                self.log_test(name, True)
                try:
                    return True, response.json()
                except:
                    return True, response.text
            else:
                error_msg = f"Expected {expected_status}, got {response.status_code}"
                try:
                    error_details = response.json()
                    error_msg += f" - {error_details}"
                except:
                    error_msg += f" - {response.text}"
                self.log_test(name, False, error_msg)
                return False, {}

        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_user_registration(self):
        """Test user registration"""
        timestamp = datetime.now().strftime('%H%M%S')
        test_user_data = {
            "name": f"Test User {timestamp}",
            "email": f"test.user.{timestamp}@example.com",
            "password": "TestPass123!"
        }
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "auth/register",
            200,
            data=test_user_data
        )
        
        if success and 'user_id' in response:
            self.user_id = response['user_id']
            print(f"   Created user: {self.user_id}")
            return True, test_user_data
        return False, {}

    def test_user_login(self, user_data):
        """Test user login"""
        login_data = {
            "email": user_data["email"],
            "password": user_data["password"]
        }
        
        success, response = self.run_test(
            "User Login",
            "POST",
            "auth/login",
            200,
            data=login_data
        )
        
        if success and 'user_id' in response:
            print(f"   Logged in user: {response['user_id']}")
            return True
        return False

    def test_get_current_user(self):
        """Test get current user endpoint"""
        return self.run_test("Get Current User", "GET", "auth/me", 200)

    def test_get_jobs(self):
        """Test get all jobs"""
        return self.run_test("Get All Jobs", "GET", "jobs", 200)

    def test_get_jobs_with_filters(self):
        """Test job filtering"""
        # Test location filter
        success1, _ = self.run_test("Jobs Filter - Location", "GET", "jobs?location=Helsinki", 200)
        
        # Test shift type filter
        success2, _ = self.run_test("Jobs Filter - Shift Type", "GET", "jobs?shift_type=Part-time", 200)
        
        # Test instant payout filter
        success3, _ = self.run_test("Jobs Filter - Instant Payout", "GET", "jobs?instant_payout=true", 200)
        
        return success1 and success2 and success3

    def test_get_single_job(self):
        """Test get single job by ID"""
        # First get all jobs to get a valid job_id
        success, jobs_data = self.run_test("Get Jobs for Single Job Test", "GET", "jobs", 200)
        
        if success and jobs_data and len(jobs_data) > 0:
            job_id = jobs_data[0]['job_id']
            return self.run_test(f"Get Single Job ({job_id})", "GET", f"jobs/{job_id}", 200)
        else:
            self.log_test("Get Single Job", False, "No jobs available to test")
            return False

    def test_job_application(self):
        """Test job application (requires auth)"""
        # First get a job to apply to
        success, jobs_data = self.run_test("Get Jobs for Application Test", "GET", "jobs", 200)
        
        if success and jobs_data and len(jobs_data) > 0:
            job_id = jobs_data[0]['job_id']
            return self.run_test(f"Apply for Job ({job_id})", "POST", f"jobs/{job_id}/apply", 200)
        else:
            self.log_test("Job Application", False, "No jobs available to apply to")
            return False

    def test_get_my_applications(self):
        """Test get user's applications"""
        return self.run_test("Get My Applications", "GET", "my-applications", 200)

    def test_contact_form(self):
        """Test contact form submission"""
        timestamp = datetime.now().strftime('%H%M%S')
        contact_data = {
            "name": f"Test Contact {timestamp}",
            "email": f"contact.test.{timestamp}@example.com",
            "subject": "Test Subject",
            "message": "This is a test message from the API testing suite."
        }
        
        return self.run_test("Contact Form Submission", "POST", "contact", 200, data=contact_data)

    def test_stats_endpoint(self):
        """Test platform stats endpoint"""
        return self.run_test("Platform Stats", "GET", "stats", 200)

    def test_logout(self):
        """Test user logout"""
        return self.run_test("User Logout", "POST", "auth/logout", 200)

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting FinnJob API Testing Suite")
        print("=" * 50)
        
        # Test basic endpoints
        self.test_root_endpoint()
        self.test_stats_endpoint()
        
        # Test job endpoints (no auth required)
        self.test_get_jobs()
        self.test_get_jobs_with_filters()
        self.test_get_single_job()
        
        # Test contact form
        self.test_contact_form()
        
        # Test auth flow
        success, user_data = self.test_user_registration()
        if success:
            login_success = self.test_user_login(user_data)
            if login_success:
                # Test authenticated endpoints
                self.test_get_current_user()
                self.test_job_application()
                self.test_get_my_applications()
                self.test_logout()
        
        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed. Check details above.")
            return False

def main():
    tester = FinnJobAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "total_tests": tester.tests_run,
            "passed_tests": tester.tests_passed,
            "success_rate": f"{(tester.tests_passed/tester.tests_run)*100:.1f}%" if tester.tests_run > 0 else "0%",
            "results": tester.test_results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())
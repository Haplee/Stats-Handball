import requests
import sys
import uuid

BASE_URL = "http://localhost/api"
TEST_USER = {
    "username": f"test_user_{uuid.uuid4().hex[:8]}",
    "password": "testpassword123",
    "email": f"test_{uuid.uuid4().hex[:8]}@example.com"
}

def log(msg, status=None):
    if status == "SUCCESS":
        print(f"{msg.ljust(60)} \033[92m[SUCCESS]\033[0m")
    elif status == "FAILURE":
        print(f"{msg.ljust(60)} \033[91m[FAILURE]\033[0m")
    elif status == "WARNING":
        print(f"{msg.ljust(60)} \033[93m[WARNING]\033[0m")
    else:
        print(msg)

def test_endpoint(session, url, method="GET", data=None, expected_status=200):
    try:
        if method == "GET":
            response = session.get(url, timeout=5)
        elif method == "POST":
            response = session.post(url, json=data, timeout=5)
        
        if response.status_code == expected_status:
            return True, response
        else:
            return False, response
    except Exception as e:
        print(f"Error connecting to {url}: {e}")
        return False, None

def main():
    print("\n=== Backend Integration Test Suite ===\n")
    session = requests.Session()
    
    # 1. Health Check
    success, _ = test_endpoint(session, f"{BASE_URL}/health")
    log("Health Check (/api/health)", "SUCCESS" if success else "FAILURE")
    if not success:
        print("Crticial: API not reachable.")
        sys.exit(1)

    # 2. Authentication (Register/Login)
    print(f"\n--- Auth Check ({TEST_USER['username']}) ---")
    
    # Try Register
    success, resp = test_endpoint(session, f"{BASE_URL}/auth/register", method="POST", data=TEST_USER, expected_status=201)
    if success:
        log("Registration", "SUCCESS")
    else:
        # If failure, maybe user exists? Try login
        log(f"Registration (Got {resp.status_code if resp else 'Error'})", "WARNING")

    # Try Login
    success, resp = test_endpoint(session, f"{BASE_URL}/auth/login", method="POST", data={
        "username": TEST_USER['username'], "password": TEST_USER['password']
    }, expected_status=200)
    
    if success:
        log("Login", "SUCCESS")
    else:
        log(f"Login (Got {resp.status_code if resp else 'Error'})", "FAILURE")
        print("Cannot proceed without auth.")
        sys.exit(1)

    # 3. Feature Endpoints
    print("\n--- Feature Endpoints ---")
    
    endpoints = [
        ("/videos", "Videos List"),
        ("/teams/", "Teams List"),
        ("/players/", "Players List"),
        ("/tactics/", "Tactics List")
    ]

    all_passed = True
    for endpoint, name in endpoints:
        success, resp = test_endpoint(session, f"{BASE_URL}{endpoint}")
        status = "SUCCESS" if success else "FAILURE"
        log(f"{name} ({endpoint})", status)
        if not success: 
            all_passed = False
            if resp: print(f"  -> Returned {resp.status_code}: {resp.text[:100]}")

    if all_passed:
        print("\n\033[92mAll Tests Passed!\033[0m")
        sys.exit(0)
    else:
        print("\n\033[91mSome tests failed.\033[0m")
        sys.exit(1)

if __name__ == "__main__":
    main()

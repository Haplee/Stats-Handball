import requests
import sys
import time

def test_endpoint(url, expected_status=200):
    try:
        print(f"Testing {url}...", end=" ")
        response = requests.get(url, timeout=5)
        if response.status_code == expected_status:
            print(f"SUCCESS ({response.status_code})")
            return True
        elif response.status_code == 401:
            print(f"SUCCESS (401 Unauthorized - Endpoint is reachable)")
            return True
        else:
            print(f"FAILURE (Expected {expected_status}, got {response.status_code})")
            return False
    except requests.exceptions.ConnectionError:
        print("FAILURE (Connection Refused - Is the server running?)")
        return False
    except Exception as e:
        print(f"FAILURE (Error: {str(e)})")
        return False

def main():
    print("=== Backend API Health Check ===")
    base_url = "http://localhost/api" # Nginx proxy
    
    # Test 1: Health Check
    health_ok = test_endpoint(f"{base_url}/health")
    
    # Test 2: Videos Endpoint (GET)
    # Assumes endpoint exists and returns 200 (even if empty list)
    videos_ok = test_endpoint(f"{base_url}/videos")

    if health_ok and videos_ok:
        print("\nAll Backend tests PASSED.")
        sys.exit(0)
    else:
        print("\nSome Backend tests FAILED.")
        sys.exit(1)

if __name__ == "__main__":
    main()

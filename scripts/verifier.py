from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:5173")
        page.screenshot(path="/home/jules/verification/full_page.png", full_page=True)
        browser.close()

if __name__ == "__main__":
    run()
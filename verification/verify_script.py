from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Open the local file
        import os
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        # Check title
        title = page.title()
        print(f"Title: {title}")
        if "릴스 캡션 자판기" in title:
            print("Title verification passed")
        else:
            print("Title verification failed")

        # Check H1
        h1_text = page.locator("h1").inner_text()
        print(f"H1: {h1_text}")
        if "터지는 릴스 캡션" in h1_text:
             print("H1 verification passed")
        else:
             print("H1 verification failed")

        # Check Submit Button
        btn_text = page.locator("button[type='submit']").inner_text()
        print(f"Button: {btn_text}")
        if "매직 캡션 생성하기" in btn_text:
             print("Button verification passed")
        else:
             print("Button verification failed")

        # Take screenshot
        page.screenshot(path="verification/screenshot.png")
        print("Screenshot saved to verification/screenshot.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()

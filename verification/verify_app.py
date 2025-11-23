from playwright.sync_api import sync_playwright, expect
import time

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the local server
        page.goto("http://localhost:8080/index.html")

        # Wait for loading to complete if any
        time.sleep(1)

        # Check if title is correct
        expect(page).to_have_title("릴스 대본 자판기 | 3초 만에 터지는 캡션 생성 (Reels Code)")

        # Fill in the form
        page.fill("#product", "Playwright Test")
        page.fill("#target", "Developers")
        page.fill("#pain", "Manual Testing")
        page.fill("#solution", "Automation")

        # Select a category (e.g., Beauty)
        page.click("button[data-category='beauty']")

        # Select a tone (e.g., Humor)
        page.click("button[data-tone='humor']")

        # Click Generate
        page.click("button[type='submit']")

        # Wait for generation animation (modal shows up and hides)
        # We can wait for the loading modal to be visible then hidden
        expect(page.locator("#loadingModal")).to_be_visible(timeout=5000)
        expect(page.locator("#loadingModal")).to_be_hidden(timeout=10000)

        # Verify results are visible in the phone mockup
        expect(page.locator("#captionText")).to_contain_text("Playwright Test")
        expect(page.locator("#captionHashtags")).to_contain_text("#뷰티")

        # SAVE to History
        # The save button is #saveToHistoryBtn
        page.click("#saveToHistoryBtn")

        # Wait a bit for the visual feedback or local storage update
        time.sleep(0.5)

        # Check History Modal
        # Open History
        page.click("#historyBtn")
        time.sleep(0.5)

        # Check if history item exists
        expect(page.locator("#historyList")).to_contain_text("Playwright Test")

        # Take screenshot
        page.screenshot(path="verification/app_verification.png")

        print("Verification successful!")
        browser.close()

if __name__ == "__main__":
    verify_app()

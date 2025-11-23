from playwright.sync_api import sync_playwright, expect
import time

def verify_quality_upgrade():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the local server
        page.goto("http://localhost:8080/index.html")

        # Fill in the form with metrics to test Smart Variable Extraction
        page.fill("#product", "다이어트 쉐이크")
        page.fill("#target", "직장인")
        page.fill("#pain", "3개월 동안 안 빠지는 살") # metric: 3개월
        page.fill("#solution", "5kg 감량 성공") # metric: 5kg

        # Select a category (Common)
        page.click("button[data-category='common']")

        # Select a tone (Impact)
        page.click("button[data-tone='impact']")

        # Click Generate
        page.click("button[type='submit']")

        # Wait for generation
        expect(page.locator("#loadingModal")).to_be_visible(timeout=5000)
        expect(page.locator("#loadingModal")).to_be_hidden(timeout=10000)

        # Verify output contains metrics or power keywords
        # The output is random, but it should contain the product name.
        caption_text = page.locator("#captionText").inner_text()
        print(f"Generated Caption: {caption_text}")

        expect(page.locator("#captionText")).to_contain_text("다이어트 쉐이크")

        # Try switching to Logic (PAS) tab
        page.click("button[data-tab='logic']")
        time.sleep(0.5)
        logic_caption = page.locator("#captionText").inner_text()
        print(f"Logic (PAS) Caption: {logic_caption}")

        # Try switching to Sales (QUEST) tab
        page.click("button[data-tab='sales']")
        time.sleep(0.5)
        sales_caption = page.locator("#captionText").inner_text()
        print(f"Sales (QUEST) Caption: {sales_caption}")

        # Take screenshot
        page.screenshot(path="verification/quality_upgrade.png")

        print("Verification successful!")
        browser.close()

if __name__ == "__main__":
    verify_quality_upgrade()

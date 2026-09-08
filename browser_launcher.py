from playwright.sync_api import sync_playwright

def launch_custom_browser(extension_path):
    with sync_playwright() as p:
        # Launches a custom Chromium instance with your mixer pre-loaded
        browser = p.chromium.launch_persistent_context(
            user_data_dir="./custom_browser_profile",
            headless=False,
            args=[
                f"--disable-extensions-except={extension_path}",
                f"--load-extension={extension_path}"
            ]
        )
        page = browser.new_page()
        page.goto("https://github.com")
        page.pause() # Keeps the browser open for the user

launch_custom_browser("/path/to/Session-Cookie-Mixer")

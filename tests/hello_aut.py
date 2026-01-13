import unittest, sys, os
from selenium import webdriver
from selenium.webdriver.common.by import By

class AutTest(unittest.TestCase):

    def setUp(self):
        browser_name = os.getenv("BROWSER", "firefox")

        if browser_name == "chrome":
            options = webdriver.ChromeOptions()
        elif browser_name == "edge":
            options = webdriver.EdgeOptions()
        else:
            options = webdriver.FirefoxOptions()

        options.add_argument('--ignore-ssl-errors=yes')
        options.add_argument('--ignore-certificate-errors')

        server = 'http://localhost:4444/wd/hub'

        self.browser = webdriver.Remote(
            command_executor=server,
            options=options
        )
        self.addCleanup(self.browser.quit)

    def test_homepage(self):
        url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost"
        self.browser.get(url)

        self.browser.save_screenshot(f'screenshot-{os.getenv("BROWSER")}.png')

        expected = "Welcome back, Guest!"
        actual = self.browser.find_element(By.TAG_NAME, 'p')
        self.assertIn(expected, actual.text)


if __name__ == "__main__":
    unittest.main(argv=['first-arg-is-ignored'], verbosity=2)

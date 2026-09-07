const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const extensionPath = path.resolve(__dirname, './'); // Path to your unpacked extension

  console.log('Launching browser with extension...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  // Wait for a moment to let the extension initialize
  await new Promise(resolve => setTimeout(resolve, 2000));

  const targets = await browser.targets();
  const backgroundTarget = targets.find(t => t.type() === 'service_worker');

  if (backgroundTarget) {
    console.log('✅ Success: Extension loaded and background worker is running!');
  } else {
    console.error('❌ Error: Extension failed to load or missing service worker.');
    process.exit(1);
  }

  await browser.close();
})();

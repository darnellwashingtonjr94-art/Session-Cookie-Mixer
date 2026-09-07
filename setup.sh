#!/bin/bash

# Create directories
mkdir -p session-cookie-mixer/icons
mkdir -p session-cookie-mixer/popup

# Create manifest.json
cat << 'EOF' > session-cookie-mixer/manifest.json
{
  "manifest_version": 3,
  "name": "Session Cookie Mixer",
  "version": "1.0.0",
  "description": "Generates randomized synthetic cookies on startup for privacy noise generation.",
  "permissions": ["cookies", "storage"],
  "host_permissions": ["<all_urls>"],
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "background": {
    "service_worker": "background.js"
  },
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
EOF

# Create background.js
cat << 'EOF' > session-cookie-mixer/background.js
const SAMPLE_DOMAINS = [
  "example.com", "analytics-demo.org", "ad-tracker-sample.net",
  "privacy-noise.io", "metrics-test.com"
];

function generateRandomString(length = 16) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(val => chars[val % chars.length]).join('');
}

async function generateFakeCookies(count = 1000) {
  const promises = [];
  for (let i = 0; i < count; i++) {
    const domain = SAMPLE_DOMAINS[Math.floor(Math.random() * SAMPLE_DOMAINS.length)];
    const cookiePromise = chrome.cookies.set({
      url: `https://${domain}`,
      name: `noise_sid_${generateRandomString(8)}`,
      value: generateRandomString(32),
      domain: domain,
      path: "/",
      secure: true,
      httpOnly: false,
      expirationDate: Math.floor(Date.now() / 1000) + 86400 * 7
    }).catch(err => console.error(err));
    promises.push(cookiePromise);
  }
  await Promise.allSettled(promises);
  chrome.storage.local.set({ lastRun: new Date().toISOString(), totalGenerated: count });
}

chrome.runtime.onStartup.addListener(() => generateFakeCookies(1000));
chrome.runtime.onInstalled.addListener(() => generateFakeCookies(1000));
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generate_now") {
    generateFakeCookies(request.count || 1000).then(() => sendResponse({ status: "complete" }));
    return true;
  }
});
EOF

# Create popup.html
cat << 'EOF' > session-cookie-mixer/popup/popup.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="container">
    <h2>Cookie Mixer</h2>
    <p class="status" id="statusText">Status: Idle</p>
    <button id="generateBtn">Mix Cookies Now</button>
  </div>
  <script src="popup.js"></script>
</body>
</html>
EOF

# Create popup.css
cat << 'EOF' > session-cookie-mixer/popup/popup.css
body { width: 200px; font-family: Arial, sans-serif; margin: 0; padding: 12px; background-color: #f4f4f9; }
.container { display: flex; flex-direction: column; align-items: center; gap: 10px; }
h2 { font-size: 16px; margin: 0; color: #333; }
.status { font-size: 12px; color: #666; margin: 0; }
button { width: 100%; padding: 8px; border: none; border-radius: 4px; background-color: #007bff; color: #fff; font-weight: bold; cursor: pointer; }
button:hover { background-color: #0056b3; }
EOF

# Create popup.js
cat << 'EOF' > session-cookie-mixer/popup/popup.js
document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateBtn");
  const statusText = document.getElementById("statusText");

  chrome.storage.local.get(["lastRun"], (result) => {
    if (result.lastRun) statusText.innerText = `Last run: ${new Date(result.lastRun).toLocaleTimeString()}`;
  });

  generateBtn.addEventListener("click", () => {
    statusText.innerText = "Generating...";
    chrome.runtime.sendMessage({ action: "generate_now", count: 1000 }, (response) => {
      if (response && response.status === "complete") statusText.innerText = "Done!";
    });
  });
});
EOF

# Create .gitignore
cat << 'EOF' > session-cookie-mixer/.gitignore
.DS_Store
*.log
node_modules/
EOF

echo "Project files generated in ./session-cookie-mixer/"

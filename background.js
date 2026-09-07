const SAMPLE_DOMAINS = [
  "example.com",
  "analytics-demo.org",
  "ad-tracker-sample.net",
  "privacy-noise.io",
  "metrics-test.com"
];

function generateRandomString(length = 16) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
}

async function generateFakeCookies(count = 1000) {
  const promises = [];

  for (let i = 0; i < count; i++) {
    const domain = SAMPLE_DOMAINS[Math.floor(Math.random() * SAMPLE_DOMAINS.length)];
    const cookieName = `noise_sid_${generateRandomString(8)}`;
    const cookieValue = generateRandomString(32);
    const expirationDate = Math.floor(Date.now() / 1000) + 86400 * 7;

    const cookiePromise = chrome.cookies.set({
      url: `https://${domain}`,
      name: cookieName,
      value: cookieValue,
      domain: domain,
      path: "/",
      secure: true,
      httpOnly: false,
      expirationDate: expirationDate
    }).catch(err => console.error(`Error setting cookie ${cookieName}:`, err));

    promises.push(cookiePromise);
  }

  await Promise.allSettled(promises);
  
  // Update last run time in storage
  chrome.storage.local.set({
    lastRun: new Date().toISOString(),
    totalGenerated: count
  });
}

chrome.runtime.onStartup.addListener(() => {
  generateFakeCookies(1000);
});

chrome.runtime.onInstalled.addListener(() => {
  generateFakeCookies(1000);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generate_now") {
    generateFakeCookies(request.count || 1000).then(() => {
      sendResponse({ status: "complete" });
    });
    return true;
  }
});

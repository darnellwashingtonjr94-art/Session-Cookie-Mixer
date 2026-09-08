async function getApiKey() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["geminiApiKey"], (result) => resolve(result.geminiApiKey));
  });
}

// Mutates the AI's realistic seeds to scale up to 1000s instantly
function mutateValue(baseValue) {
  const chars = "abcdef0123456789";
  return baseValue.replace(/[a-zA-Z0-9]/g, (char) => {
    return Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : char;
  });
}

async function generateWithGemini(count = 1000) {
  const apiKey = await getApiKey();
  if (!apiKey) {
    console.error("Gemini API key not found. Please set it in the extension options.");
    return;
  }

  // Ask Gemini to generate 20 ultra-realistic base templates tailored to dev/crypto/HFT profiles
  const prompt = `Generate a raw JSON array of 20 highly realistic web tracking cookie objects. 
  Mix standard analytics trackers with domains mimicking high-frequency trading node dashboards and cryptocurrency notification platforms. 
  Keys needed: 'domain' (string), 'name' (string, e.g., _ga, fbp, session_auth), 'value' (string, realistic UUIDs, JWTs, or base64 hashes). 
  Do not include markdown formatting, just the JSON array.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    let rawText = data.candidates[0].content.parts[0].text;
    
    // Clean up any markdown blocks if the AI includes them
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    const templates = JSON.parse(rawText);
    
    const promises = [];
    
    // Scale the 20 templates up to the requested count (e.g., 1000)
    for (let i = 0; i < count; i++) {
      const template = templates[i % templates.length];
      const expirationDate = Math.floor(Date.now() / 1000) + 86400 * (Math.floor(Math.random() * 30) + 1);

      const cookiePromise = chrome.cookies.set({
        url: `https://${template.domain}`,
        name: `${template.name}_${Math.floor(Math.random() * 1000)}`,
        value: mutateValue(template.value),
        domain: template.domain,
        path: "/",
        secure: true,
        httpOnly: false,
        expirationDate: expirationDate
      }).catch(err => console.log(`Cookie generation error for ${template.domain}:`, err));

      promises.push(cookiePromise);
    }

    await Promise.allSettled(promises);
    chrome.storage.local.set({ lastRun: new Date().toISOString(), totalGenerated: count });
    console.log(`Successfully mixed ${count} AI-generated cookies.`);

  } catch (error) {
    console.error("Failed to generate AI cookies:", error);
  }
}

chrome.runtime.onStartup.addListener(() => generateWithGemini(1000));
chrome.runtime.onInstalled.addListener(() => generateWithGemini(1000));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generate_now") {
    generateWithGemini(request.count || 1000).then(() => sendResponse({ status: "complete" }));
    return true; 
  }
});

// Continuous Interval Injection: Run every 30 minutes
chrome.alarms.create("continuousInjection", { periodInMinutes: 30 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "continuousInjection") {
    generateCookies(100); // Trickle in 100 cookies periodically
  }
});

// Listener for Popup Actions (Reset & Generate)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "reset_identity") {
    chrome.cookies.getAll({}, (cookies) => {
      cookies.forEach(cookie => {
        const url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
        chrome.cookies.remove({ url: url, name: cookie.name });
      });
      generateCookies(1000).then(() => sendResponse({ status: "reset_complete" }));
    });
    return true; // Keep channel open for async response
  }
  if (request.action === "generate_now") {
    generateCookies(1000).then(() => sendResponse({ status: "complete" }));
    return true;
  }
});

async function generateCookies(count) {
  const settings = await chrome.storage.local.get(['aiMode', 'geminiKey', 'persona', 'totalFake']);
  const persona = settings.persona || "Random internet user";
  const prompt = `Generate a raw JSON array of ${count} highly realistic web tracking cookie objects. Tailor the domain names and values for a demographic: ${persona}.`;

  let syntheticCookies = [];
  
  // Local LLM Integration vs Gemini
  if (settings.aiMode === "local") {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "llama3", prompt: prompt, stream: false })
    });
    const data = await response.json();
    syntheticCookies = JSON.parse(data.response); // Assumes JSON output format
  } else {
    // Standard Gemini Logic (truncated for brevity, use existing fetch implementation)
    if (!settings.geminiKey) return console.error("Missing Gemini API Key");
    // ... fetch to Gemini API using settings.geminiKey ...
  }

  // Inject into browser
  for (let cookie of syntheticCookies) {
    await chrome.cookies.set({
      url: `https://${cookie.domain}`,
      name: cookie.name,
      value: cookie.value,
      domain: cookie.domain,
      expirationDate: (Date.now() / 1000) + 86400 * 7
    });
  }
  
  // Update Dilution Tracking
  const newTotal = (settings.totalFake || 0) + count;
  await chrome.storage.local.set({ totalFake: newTotal, lastRun: new Date().toISOString() });
}

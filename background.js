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

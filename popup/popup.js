document.addEventListener("DOMContentLoaded", async () => {
  const personaSelect = document.getElementById("personaSelect");
  const aiModeSelect = document.getElementById("aiModeSelect");
  const realCountEl = document.getElementById("realCount");
  const fakeCountEl = document.getElementById("fakeCount");
  const ratioStrEl = document.getElementById("ratioStr");
  const statusText = document.getElementById("statusText");

  // Load saved settings
  const settings = await chrome.storage.local.get(['persona', 'aiMode', 'totalFake']);
  if (settings.persona) personaSelect.value = settings.persona;
  if (settings.aiMode) aiModeSelect.value = settings.aiMode;

  // Calculate Dilution Ratio Dashboard
  chrome.cookies.getAll({}, (allCookies) => {
    const totalFake = settings.totalFake || 0;
    const totalCookies = allCookies.length;
    const estimatedReal = Math.max(0, totalCookies - totalFake);
    
    realCountEl.innerText = estimatedReal;
    fakeCountEl.innerText = totalFake;
    
    if (totalCookies > 0) {
      const ratio = ((totalFake / totalCookies) * 100).toFixed(1);
      ratioStrEl.innerText = `${ratio}% Obfuscated`;
    }
  });

  // Save changes automatically
  personaSelect.addEventListener("change", () => chrome.storage.local.set({ persona: personaSelect.value }));
  aiModeSelect.addEventListener("change", () => chrome.storage.local.set({ aiMode: aiModeSelect.value }));

  // Generate Button
  document.getElementById("generateBtn").addEventListener("click", () => {
    statusText.innerText = "Generating noise...";
    chrome.runtime.sendMessage({ action: "generate_now" }, (res) => {
      if (res && res.status === "complete") statusText.innerText = "Done!";
    });
  });

  // One-Click Identity Reset
  document.getElementById("resetBtn").addEventListener("click", () => {
    statusText.innerText = "Nuking storage & rebuilding identity...";
    chrome.storage.local.set({ totalFake: 0 }); // Reset counter
    chrome.runtime.sendMessage({ action: "reset_identity" }, (res) => {
      if (res && res.status === "reset_complete") {
        statusText.innerText = "Identity Reset Complete!";
        setTimeout(() => window.location.reload(), 1500);
      }
    });
  });
});

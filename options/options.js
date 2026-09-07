document.addEventListener("DOMContentLoaded", () => {
  const apiKeyInput = document.getElementById("apiKey");
  const saveBtn = document.getElementById("saveBtn");
  const statusDiv = document.getElementById("status");

  // Load existing key
  chrome.storage.local.get(["geminiApiKey"], (result) => {
    if (result.geminiApiKey) apiKeyInput.value = result.geminiApiKey;
  });

  // Save new key
  saveBtn.addEventListener("click", () => {
    const key = apiKeyInput.value.trim();
    chrome.storage.local.set({ geminiApiKey: key }, () => {
      statusDiv.textContent = "API Key securely saved to local storage.";
      setTimeout(() => statusDiv.textContent = "", 3000);
    });
  });
});

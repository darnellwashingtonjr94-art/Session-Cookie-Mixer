document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateBtn");
  const statusText = document.getElementById("statusText");

  chrome.storage.local.get(["lastRun"], (result) => {
    if (result.lastRun) {
      const date = new Date(result.lastRun);
      statusText.innerText = `Last run: ${date.toLocaleTimeString()}`;
    }
  });

  generateBtn.addEventListener("click", () => {
    statusText.innerText = "Generating...";
    chrome.runtime.sendMessage({ action: "generate_now", count: 1000 }, (response) => {
      if (response && response.status === "complete") {
        statusText.innerText = "Done!";
      }
    });
  });
});

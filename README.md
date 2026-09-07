# Session-Cookie-Mixer

Session-Cookie-Mixer is a privacy-focused browser extension that protects your online activity through **data dilution**. By flooding your browser storage with 1,000 fake, AI-generated cookies, it buries your actual browsing habits in synthetic noise—making it impossible for trackers to build an accurate profile on you.

---

## 💡 The Problem & The Solution

* **The Problem:** Advertisers and data brokers constantly collect your browser cookies to track your clicks, build detailed behavioral profiles, and target you with ads.
* **The Solution (Hiding in a Haystack):** Instead of trying to block cookies (which often breaks web features), Session-Cookie-Mixer floods your browser with thousands of fake habits. Your genuine activity gets completely lost in the noise, confusing tracking systems so they can't figure out who you are or what you like.

---

## ✨ Features

* **Data Dilution Privacy:** Obfuscates genuine user tracking profiles by injecting 1,000 randomized synthetic cookies into storage.
* **AI-Powered Realism:** Connects with the **Google Gemini API** to generate highly believable domain names, parameters, and cookie values.
* **Automated Injection:** Runs automatically every time you open your browser to maintain consistent tracking noise.

---

## ⚙️ How It Works

1. **Launch:** Opening your web browser automatically triggers the background extension script.
2. **AI Generation:** The script connects to Google Gemini to dynamically generate 1,000 realistic synthetic cookies.
3. **Storage Mixing:** The extension dumps the fake cookies directly into your browser's storage folder, mixing them seamlessly with your real ones.

---

## 🚀 Installation & Setup

### Prerequisites
* Any Chromium-based browser (Google Chrome, Brave, Microsoft Edge)
* A [Google Gemini API Key](https://aistudio.google.com/)

### Step 1: Download & Build
1. Clone or download the source code files from GitHub:
   ```bash
   git clone [https://github.com/your-username/Session-Cookie-Mixer.git](https://github.com/your-username/Session-Cookie-Mixer.git)
   cd Session-Cookie-Mixer

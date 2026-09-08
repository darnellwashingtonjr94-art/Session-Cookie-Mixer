<p align="center">
  <img src="IMG_4149.jpeg" alt="Session Cookie Mixer Logo" width="600">
</p>

## Languages, Systems & Architecture

*   **Core Languages:** ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Bash](https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white)

   **Core Systems:** ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
   
   **Supported Browsers:** ![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white) ![Microsoft Edge](https://img.shields.io/badge/Edge-0078D7?style=for-the-badge&logo=Microsoft-edge&logoColor=white) ![Brave](https://img.shields.io/badge/Brave-FF1B2D?style=for-the-badge&logo=Brave&logoColor=white)
   
**Target OS / Environments:** ![Alpine Linux](https://img.shields.io/badge/Alpine_Linux-%230D597F.svg?style=for-the-badge&logo=alpine-linux&logoColor=white) ![Debian](https://img.shields.io/badge/Debian-A81D33?style=for-the-badge&logo=debian&logoColor=white) ![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)

## Infrastructure, Security & DevOps

  **Low-Level Infrastructure:**
  
![Manifest V3](https://img.shields.io/badge/Manifest%20V3-4CAF50?style=for-the-badge&logo=googlechrome&logoColor=white)
  
  **Cybersecurity Tactics:**
![Data Privacy](https://img.shields.io/badge/Data_Dilution_&_Privacy-1A1A1A?style=for-the-badge&logo=security&logoColor=white)
  
   **DevOps & CI/CD:**
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

   **Testing & Linting:**
![Puppeteer](https://img.shields.io/badge/puppeteer-%2340B5A4.svg?style=for-the-badge&logo=puppeteer&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

## AI & Cloud Providers

  **Artificial Intelligence:**
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)

   **Cloud Infrastructure:**
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

   **Version Control & Registries:**
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![Docker Hub](https://img.shields.io/badge/Docker%20Hub-2496ED?style=for-the-badge&logo=docker&logoColor=white)

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

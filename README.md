# Session-Cookie-Mixer

Session Cookie Mixer is a privacy-focused browser extension that combats online tracking through data dilution. By automatically injecting 1,000 randomized synthetic cookies into your local storage upon startup, it creates tracking noise. This makes your actual browsing habits impossible for advertisers to isolate, effectively protecting user data.

## Features

* **Data Dilution Privacy:** Obfuscates genuine user tracking profiles by generating massive amounts of synthetic cookie data.
* **AI-Powered Realism:** Uses the Google Gemini API to dynamically generate believable cookie names, domains, and values.
* **Automated Injection:** Automatically populates browser storage on launch to maintain consistent noise.

## How It Works

1. **Launch:** Upon opening the browser, the background service worker initializes the generation routine.
2. **Synthetic Generation:** Sends a prompt to the Gemini API to generate 1,000 realistic, structured cookie parameters.
3. **Storage Mixing:** Merges the generated cookies directly into browser storage alongside authentic browsing cookies.

## Installation & Setup

### Prerequisites

* Google Chrome or any Chromium-based browser (Brave, Edge, Opera)
* A [Google Gemini API Key](https://aistudio.google.com/)

### Build & Install

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/Session-Cookie-Mixer.git](https://github.com/your-username/Session-Cookie-Mixer.git)
   cd Session-Cookie-Mixer

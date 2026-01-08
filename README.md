# PromptifAI 

**PromptifAI** is a full-stack Chrome Extension that uses Google's Gemini AI to transform simple, raw ideas into professional, high-quality prompts for LLMs (like ChatGPT, Claude, and Gemini).

##  Features

* **One-Click Enhancement:** Instantly turn "make a fitness plan" into a detailed, structured prompt.
* **Smart Injection:** Automatically inserts the enhanced prompt into the active chat box on sites like ChatGPT, Gemini, and Perplexity.
* **Copy to Clipboard:** One-click copy for manual pasting.
* **Modern UI:** Sleek, dark-themed interface.
* **Privacy Focused:** Runs locally on your machine communicating with your own backend.

##  Tech Stack

* **Frontend (Extension):** HTML, CSS (Custom Dark Theme), Vanilla JavaScript.
* **Backend:** Node.js, Express.js.
* **AI Engine:** Google Gemini API (`gemini-2.0-flash-exp`) via the new `@google/genai` SDK.

---

##  Setup Guide

### 1. Backend Setup (Server)
The backend handles the API calls to Google Gemini to keep your keys secure.

1.  Navigate to the backend folder:
    ```bash
    cd promptifai-backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root of the backend folder and add your key:
    ```env
    GEMINI_API_KEY=your_google_ai_studio_key_here
    PORT=8000
    ```
    *(Get your key from [Google AI Studio](https://aistudio.google.com/))*

4.  Start the server:
    ```bash
    npm run dev
    ```
    *The server should now be running on `http://localhost:8000`*

### 2. Extension Setup (Browser)

1.  Open Chrome and navigate to `chrome://extensions/`.
2.  Toggle **Developer mode** (top right corner).
3.  Click **Load unpacked**.
4.  Select the **root folder** of this project (where `manifest.json` is located).
5.  Pin the PromptifAI icon to your toolbar!

---

## 💡 How to Use

1.  **Open the Extension:** Click the PromptifAI logo in your toolbar.
2.  **Type or Select:** Type a rough idea (e.g., *"Explain recursion briefly"*) or select text on a webpage.
3.  **Enhance:** Click the **Enhance Prompt** button.
4.  **Result:**
    * The prompt is rewritten instantly.
    * If you are on an AI site (like ChatGPT), it attempts to **auto-insert** the text.
    * Otherwise, use the **Copy** button to paste it anywhere.

##  Contributing

Feel free to fork this repository and submit pull requests!

---

**Author:** [Ishan Saxena](https://github.com/ishansaxena012) 
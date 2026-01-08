// content/content.js

function getSelectedText() {
  const selection = window.getSelection();
  return selection ? selection.toString().trim() : "";
}

/**
 * Finds the best input element.
 * Priority: 
 * 1. The element you currently have focused (Best reliability)
 * 2. Known AI chat box selectors (ChatGPT, Claude, Gemini)
 * 3. Generic fallbacks
 */
function getActiveInput() {
  // 1️⃣ Check if user is already focused on an input
  const active = document.activeElement;
  if (
    active &&
    (active.tagName === "TEXTAREA" ||
      active.getAttribute("contenteditable") === "true" ||
      active.tagName === "INPUT")
  ) {
    return active;
  }

  // 2️⃣ Site-specific selectors (Add more as needed)
  const selectors = [
    'div[contenteditable="true"]', // Gemini, Claude, modern ChatGPT
    'textarea[id="prompt-textarea"]', // Older ChatGPT
    'textarea[placeholder*="Ask"]',   // Perplexity
    'textarea',                       // Generic fallback
    'input[type="text"]'              // Last resort
  ];

  for (const selector of selectors) {
    const el = document.querySelector(selector);
    if (el) return el;
  }

  return null;
}

function insertText(text) {
  const el = getActiveInput();

  if (!el) {
    console.warn("PromptifAI: No input field found.");
    // Fallback: Copy to clipboard so user isn't stuck
    navigator.clipboard.writeText(text);
    alert("Could not find input box automatically. Text copied to clipboard! 📋");
    return;
  }

  el.focus();

  // 1️⃣ Strategy A: execCommand (The "Gold Standard" for Compatibility)
  // This simulates a user pasting text. It triggers ALL events (React, Angular, etc.)
  // and works perfectly on Gemini & ChatGPT's contenteditable divs.
  const success = document.execCommand("insertText", false, text);

  // 2️⃣ Strategy B: React Native Value Setter (Fallback for locked TextAreas)
  if (!success && (el.tagName === "TEXTAREA" || el.tagName === "INPUT")) {
    const nativeSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value"
    ).set;

    if (nativeSetter) {
      nativeSetter.call(el, text);
    } else {
      el.value = text;
    }

    // Dispatch events to wake up the framework
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  } 
  // 3️⃣ Strategy C: Direct InnerText (Last Resort for Divs)
  else if (!success) {
    el.innerText = text;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }
}

// Message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_SELECTED_TEXT") {
    sendResponse({ text: getSelectedText() });
  }

  if (message.type === "INSERT_ENHANCED_PROMPT") {
    insertText(message.payload);
  }
});
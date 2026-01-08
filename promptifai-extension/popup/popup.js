
const promptInput = document.getElementById("promptInput");
const enhanceBtn = document.getElementById("enhanceBtn");
const output = document.getElementById("output");
const status = document.getElementById("status");
const copyBtn = document.getElementById("copyBtn"); 

// Auto-fill selected text when popup opens

document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab?.id) return;

    chrome.tabs.sendMessage(
      tab.id,
      { type: "GET_SELECTED_TEXT" },
      (response) => {
        if (chrome.runtime.lastError) return; 
        if (response?.text) {
          promptInput.value = response.text;
        }
      }
    );
  });
});


enhanceBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    status.textContent = " Please enter a prompt";
    return;
  }

  status.textContent = "✨ Enhancing via Localhost...";
  output.textContent = "";
  enhanceBtn.disabled = true;
  if (copyBtn) copyBtn.style.display = 'none';

  try {
    const response = await fetch("http://localhost:8000/api/v1/prompt/enhance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result?.error?.message || "Server Error");
    }

    const enhancedPrompt = result.data.enhancedPrompt;

    status.textContent = " Enhanced!";
    output.textContent = enhancedPrompt;

    if (copyBtn) {
      copyBtn.style.display = 'block';
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(enhancedPrompt);
        status.textContent = " Copied!";
        setTimeout(() => status.textContent = " Enhanced!", 2000);
      };
    }

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (!tab?.id) return;
      chrome.tabs.sendMessage(tab.id, {
        type: "INSERT_ENHANCED_PROMPT",
        payload: enhancedPrompt
      });
    });

  } catch (error) {
    console.error("Fetch error:", error);
    status.textContent = " Connection Failed";
    output.textContent = "Is the backend running on port 8000?\n\nError: " + error.message;
  } finally {
    enhanceBtn.disabled = false;
  }
});
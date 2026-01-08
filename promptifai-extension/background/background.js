// background/background.js
// Manifest V3 service worker

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "ENHANCE_PROMPT") {
    handleEnhancePrompt(message.payload, sendResponse);
    return true; //  (keeps async channel open)
  }
});

async function handleEnhancePrompt(prompt, sendResponse) {
  try {
    const response = await fetch(
      "http://localhost:8000/api/v1/prompt/enhance",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Server Error ${response.status}: ${text}`);
    }

    const data = await response.json();

    //  expected backend response:

    sendResponse({
      success: true,
      data: data.enhancedPrompt
    });
  } catch (error) {
    console.error("Prompt enhancement failed:", error);

    sendResponse({
      success: false,
      error: error.message
    });
  }
}

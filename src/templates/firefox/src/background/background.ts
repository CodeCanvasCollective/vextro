// Background service worker
// This runs in the background and handles events for your extension.

// Runs when the extension is first installed or updated
chrome.runtime.onInstalled.addListener((details) => {
  console.log('[Vextro] Extension installed:', details.reason);

  // Set default storage values on install
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      greeting: 'Hello from Vextro!',
      clickCount: 0,
    });
  }
});

// Listen for messages from popup, options, or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Vextro] Message received:', message, 'from:', sender.tab?.url);

  if (message.type === 'GET_TAB_INFO') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ tab: tabs[0] ?? null });
    });
    return true; // Keep the message channel open for async response
  }

  sendResponse({ status: 'unknown message type' });
});

// Content script
// This runs in the context of web pages matched by manifest.ts content_scripts.

console.log('[Vextro] Content script loaded on:', window.location.href);

// Example: send a message to the background service worker
chrome.runtime.sendMessage({ type: 'GET_TAB_INFO' }, (response) => {
  if (chrome.runtime.lastError) {
    console.warn('[Vextro] Message error:', chrome.runtime.lastError.message);
    return;
  }
  console.log('[Vextro] Tab info received:', response);
});

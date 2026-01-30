chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_LOCAL_STORAGE_KEY') {
    const value = localStorage.getItem(request.key);
    sendResponse({ value });
  }
});

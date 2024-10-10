chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ isScrolling: false });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getState') {
    chrome.storage.sync.get(['isScrolling'], (result) => {
      sendResponse({ isScrolling: result.isScrolling });
    });
    return true; // indicates we will send a response asynchronously
  }
});


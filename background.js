// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "ldJsonData") {
        chrome.storage.local.set({ ldJsonData: message.data });
    }
});

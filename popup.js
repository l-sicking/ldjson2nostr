// popup.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "ldJsonData") {
        const contentDiv = document.getElementById('content');
        request.data.forEach(json => {
            const pre = document.createElement('pre');
            pre.textContent = JSON.stringify(json, null, 2);
            contentDiv.appendChild(pre);
        });
    }
});

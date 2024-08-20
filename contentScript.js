// contentScript.js

// Function to find and return the content of ld+json scripts
function findLDJSONScripts() {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    //const scripts = document.querySelectorAll('class');
    const jsonData = [];
    
    //console.log(scripts); // Steffen debugging

    scripts.forEach(script => {
        try {
            const json = JSON.parse(script.textContent);
            jsonData.push(json);
        } catch (e) {
            console.error("Error parsing JSON-LD", e);
        }
    });

    return jsonData;
}

window.addEventListener('load', myMain);

function myMain() {
    //alert('Die Seite wurde vollständig geladen!');

    console.log("DOM fully loaded and parsed");

    const ldJsonData = findLDJSONScripts();

    if (ldJsonData.length > 0) {

        console.log("LD+JSON scripts found:", ldJsonData);
        
        // Option 1: Render on the same page (e.g., append to body)
        const pre = document.createElement('pre');
        pre.textContent = JSON.stringify(ldJsonData, null, 2);
        document.body.appendChild(pre);
        
        // Option 2: Send data to the background script for the popup
        chrome.runtime.sendMessage({type: "ldJsonData", data: ldJsonData});
    }
}

// //window.onload
// window.addEventListener('load', Meldung);
// //document.addEventListener("DOMContentLoaded", function() {
// //window.addEventListener("load", function() {
// //document.addEventListener("DOMContentLoaded", function() { 
//     // Your code here will run after the DOM is fully loaded
// });
// Send the extracted JSON-LD data to the popup or render it directly
//const ldJsonData = findLDJSONScripts();


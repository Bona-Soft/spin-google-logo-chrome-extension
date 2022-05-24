chrome.runtime.onInstalled.addListener(() => {
  
  // default state goes here
  // this runs ONE TIME ONLY (unless the user reinstalls your extension)

  // Set the url where you like the popup will be enabled to call the content
  //TODO: Not working
  chrome.storage.sync.set({
    pages: ["https://www.google.com/"]
  }, function () {

  });
});

// Add the background files and style every time that the tab is updated.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
      chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["./helper/base.js", "./inject/content.js"]
      })
      .then(() => {
          console.log("INJECTED THE FOREGROUND SCRIPT.");
      })
      .catch(err => console.log(err));

      chrome.scripting.insertCSS({
        target: { tabId: tabId },
        files: ["./inject/styles.css"]
      })
      .then(() => {
          console.log("INJECTED THE FOREGROUND STYLES.");
      })
      .catch(err => console.log(err));
  }
});


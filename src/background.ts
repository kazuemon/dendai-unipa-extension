import { UnipaPage } from "./types/UnipaPage";

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

  if (changeInfo.status !== 'complete') return;
  if (!tab.url?.startsWith('https://portal.sa.dendai.ac.jp/')) return;

  const test = await chrome.scripting.executeScript({
    files: ['./scripts/getPage.js'],
    target: {
      tabId,
    }
  });

  if (test.length !== 1 && !test[0].result) {
    console.error('Invalid getPage callback');
    return;
  }

  // TODO: validate

  const page = test[0].result as UnipaPage | null;

  console.log(page);

  // TODO: global inject

  if (page) {
    // Inject scripts
    if (page.scripts) {
      chrome.scripting.executeScript({
        target: {
          tabId,
        },
        files: page.scripts,
      });
      console.log('injected scripts', page.scripts);
    }

    // Inject styles
    if (page.styles) {
      chrome.scripting.insertCSS({
        target: {
          tabId,
        },
        files: page.styles,
      });
      console.log('injected styles', page.styles);
    }
  }


})

chrome.action.onClicked.addListener(async (tab) => {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: './images/kari.png',
    title: 'Thank you for using extension!',
    message: 'Nothing here.',
    priority: 1
  })
});
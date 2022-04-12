var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => __async(this, null, function* () {
  var _a;
  if (changeInfo.status !== "complete")
    return;
  if (!((_a = tab.url) == null ? void 0 : _a.startsWith("https://portal.sa.dendai.ac.jp/")))
    return;
  const test = yield chrome.scripting.executeScript({
    files: ["./scripts/getPage.js"],
    target: {
      tabId
    }
  });
  if (test.length !== 1 && !test[0].result) {
    console.error("Invalid getPage callback");
    return;
  }
  const page = test[0].result;
  console.log(page);
  if (page) {
    if (page.scripts) {
      chrome.scripting.executeScript({
        target: {
          tabId
        },
        files: page.scripts
      });
      console.log("injected scripts", page.scripts);
    }
    if (page.styles) {
      chrome.scripting.insertCSS({
        target: {
          tabId
        },
        files: page.styles
      });
      console.log("injected styles", page.styles);
    }
  }
}));
chrome.action.onClicked.addListener((tab) => __async(this, null, function* () {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "./images/kari.png",
    title: "Thank you for using extension!",
    message: "Nothing here.",
    priority: 1
  });
}));
//# sourceMappingURL=background.js.map

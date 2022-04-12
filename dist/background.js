chrome.action.onClicked.addListener((tab) => {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "./images/kari.png",
    title: "Thank you for using extension!",
    message: "Nothing here.",
    priority: 1
  });
});
//# sourceMappingURL=background.js.map

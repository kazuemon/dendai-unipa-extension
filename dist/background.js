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
  var _a, _b;
  if (!((_a = tab.url) == null ? void 0 : _a.startsWith("https://portal.sa.dendai.ac.jp/")))
    return;
  if (changeInfo.status !== "complete")
    return;
  if ((_b = tab.url) == null ? void 0 : _b.endsWith("#"))
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2JhY2tncm91bmQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFVuaXBhUGFnZSB9IGZyb20gXCIuL3R5cGVzL1VuaXBhUGFnZVwiO1xuXG5jaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoYXN5bmMgKHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIpID0+IHtcblxuICBpZiAoIXRhYi51cmw/LnN0YXJ0c1dpdGgoJ2h0dHBzOi8vcG9ydGFsLnNhLmRlbmRhaS5hYy5qcC8nKSkgcmV0dXJuO1xuICBpZiAoY2hhbmdlSW5mby5zdGF0dXMgIT09ICdjb21wbGV0ZScpIHJldHVybjtcbiAgLy8gVE9ETzogXHU2OTFDXHU1MUZBXHU2NUI5XHU2Q0Q1XHUzMDZFXHU2NTM5XHU1NTg0XG4gIGlmICh0YWIudXJsPy5lbmRzV2l0aCgnIycpKSByZXR1cm47XG5cbiAgY29uc3QgdGVzdCA9IGF3YWl0IGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XG4gICAgZmlsZXM6IFsnLi9zY3JpcHRzL2dldFBhZ2UuanMnXSxcbiAgICB0YXJnZXQ6IHtcbiAgICAgIHRhYklkLFxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKHRlc3QubGVuZ3RoICE9PSAxICYmICF0ZXN0WzBdLnJlc3VsdCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0ludmFsaWQgZ2V0UGFnZSBjYWxsYmFjaycpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFRPRE86IHZhbGlkYXRlXG5cbiAgY29uc3QgcGFnZSA9IHRlc3RbMF0ucmVzdWx0IGFzIFVuaXBhUGFnZSB8IG51bGw7XG5cbiAgY29uc29sZS5sb2cocGFnZSk7XG5cbiAgLy8gVE9ETzogZ2xvYmFsIGluamVjdFxuXG4gIGlmIChwYWdlKSB7XG4gICAgLy8gSW5qZWN0IHNjcmlwdHNcbiAgICBpZiAocGFnZS5zY3JpcHRzKSB7XG4gICAgICBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xuICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICB0YWJJZCxcbiAgICAgICAgfSxcbiAgICAgICAgZmlsZXM6IHBhZ2Uuc2NyaXB0cyxcbiAgICAgIH0pO1xuICAgICAgY29uc29sZS5sb2coJ2luamVjdGVkIHNjcmlwdHMnLCBwYWdlLnNjcmlwdHMpO1xuICAgIH1cblxuICAgIC8vIEluamVjdCBzdHlsZXNcbiAgICBpZiAocGFnZS5zdHlsZXMpIHtcbiAgICAgIGNocm9tZS5zY3JpcHRpbmcuaW5zZXJ0Q1NTKHtcbiAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgdGFiSWQsXG4gICAgICAgIH0sXG4gICAgICAgIGZpbGVzOiBwYWdlLnN0eWxlcyxcbiAgICAgIH0pO1xuICAgICAgY29uc29sZS5sb2coJ2luamVjdGVkIHN0eWxlcycsIHBhZ2Uuc3R5bGVzKTtcbiAgICB9XG4gIH1cblxuXG59KVxuXG5jaHJvbWUuYWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihhc3luYyAodGFiKSA9PiB7XG4gIGNocm9tZS5ub3RpZmljYXRpb25zLmNyZWF0ZSh7XG4gICAgdHlwZTogJ2Jhc2ljJyxcbiAgICBpY29uVXJsOiAnLi9pbWFnZXMva2FyaS5wbmcnLFxuICAgIHRpdGxlOiAnVGhhbmsgeW91IGZvciB1c2luZyBleHRlbnNpb24hJyxcbiAgICBtZXNzYWdlOiAnTm90aGluZyBoZXJlLicsXG4gICAgcHJpb3JpdHk6IDFcbiAgfSlcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsT0FBTyxLQUFLLFVBQVUsWUFBWSxDQUFPLE9BQU8sWUFBWSxRQUFRO0FBRnBFO0FBSUUsTUFBSSxDQUFDLFdBQUksUUFBSixtQkFBUyxXQUFXO0FBQW9DO0FBQzdELE1BQUksV0FBVyxXQUFXO0FBQVk7QUFFdEMsTUFBSSxVQUFJLFFBQUosbUJBQVMsU0FBUztBQUFNO0FBRTVCLFFBQU0sT0FBTyxNQUFNLE9BQU8sVUFBVSxjQUFjO0FBQUEsSUFDaEQsT0FBTyxDQUFDLHNCQUFzQjtBQUFBLElBQzlCLFFBQVE7QUFBQSxNQUNOO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELE1BQUksS0FBSyxXQUFXLEtBQUssQ0FBQyxLQUFLLEdBQUcsUUFBUTtBQUN4QyxZQUFRLE1BQU0sMEJBQTBCO0FBQ3hDO0FBQUEsRUFDRjtBQUlBLFFBQU0sT0FBTyxLQUFLLEdBQUc7QUFFckIsVUFBUSxJQUFJLElBQUk7QUFJaEIsTUFBSSxNQUFNO0FBRVIsUUFBSSxLQUFLLFNBQVM7QUFDaEIsYUFBTyxVQUFVLGNBQWM7QUFBQSxRQUM3QixRQUFRO0FBQUEsVUFDTjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE9BQU8sS0FBSztBQUFBLE1BQ2QsQ0FBQztBQUNELGNBQVEsSUFBSSxvQkFBb0IsS0FBSyxPQUFPO0FBQUEsSUFDOUM7QUFHQSxRQUFJLEtBQUssUUFBUTtBQUNmLGFBQU8sVUFBVSxVQUFVO0FBQUEsUUFDekIsUUFBUTtBQUFBLFVBQ047QUFBQSxRQUNGO0FBQUEsUUFDQSxPQUFPLEtBQUs7QUFBQSxNQUNkLENBQUM7QUFDRCxjQUFRLElBQUksbUJBQW1CLEtBQUssTUFBTTtBQUFBLElBQzVDO0FBQUEsRUFDRjtBQUdGLEVBQUM7QUFFRCxPQUFPLE9BQU8sVUFBVSxZQUFZLENBQU8sUUFBUTtBQUNqRCxTQUFPLGNBQWMsT0FBTztBQUFBLElBQzFCLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULFVBQVU7QUFBQSxFQUNaLENBQUM7QUFDSCxFQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

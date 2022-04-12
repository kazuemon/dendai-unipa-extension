const PageList = [
  {
    key: "keiji",
    pageTitle: "\u63B2\u793A\u4E00\u89A7",
    scripts: ["./scripts/keiji.js"],
    styles: ["./styles/keiji.css"]
  },
  {
    key: "error",
    pageTitle: "\u30A8\u30E9\u30FC"
  },
  {
    key: "login",
    pageTitle: "\u30ED\u30B0\u30A4\u30F3"
  }
];
const getCurrentPage = () => {
  const isErrorPage = document.title === "Error Page";
  if (isErrorPage)
    return {
      key: "error",
      pageTitle: "\u30A8\u30E9\u30FC"
    };
  const loginElement = document.getElementById("loginForm");
  if (loginElement)
    return {
      key: "login",
      pageTitle: "\u30ED\u30B0\u30A4\u30F3"
    };
  const headerElement = document.querySelector("#mainWrapTop #funcHeader .ui-menuitem-text");
  if (!headerElement)
    return null;
  if (headerElement instanceof HTMLSpanElement) {
    const pageName = headerElement.textContent;
    const matchedPage = PageList.find((p) => p.pageTitle === pageName);
    if (!matchedPage)
      return null;
    return matchedPage;
  }
  return null;
};
const page = getCurrentPage();
page;
//# sourceMappingURL=getPage.js.map

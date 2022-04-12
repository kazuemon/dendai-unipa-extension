import { UnipaPage } from "../types/UnipaPage";

const PageList: UnipaPage[] = [
  {
    key: 'keiji',
    pageTitle: '掲示一覧',
    scripts: ['./scripts/keiji.js'],
    styles: ['./styles/keiji.css']
  }, {
    key: 'error',
    pageTitle: 'エラー',
  }, {
    key: 'login',
    pageTitle: 'ログイン'
  }
];

const getCurrentPage = (): UnipaPage | null => {
  // エラー画面チェック
  const isErrorPage = document.title === 'Error Page';
  if (isErrorPage) return {
    key: 'error',
    pageTitle: 'エラー',
  };

  // ログイン画面チェック
  const loginElement = document.getElementById('loginForm');
  if (loginElement) return {
    key: 'login',
    pageTitle: 'ログイン'
  };

  // ページヘッダー取得
  const headerElement = document.querySelector('#mainWrapTop #funcHeader .ui-menuitem-text');
  if (!headerElement) return null;
  if (headerElement instanceof HTMLSpanElement) {
    const pageName = headerElement.textContent;
    const matchedPage = PageList.find(p => p.pageTitle === pageName);
    if (!matchedPage) return null;
    return matchedPage;
  }

  return null;
}

const page = getCurrentPage();
// Return for callback
page;
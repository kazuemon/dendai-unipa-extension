import { UnipaPage } from '../types/UnipaPage';

{
  const PageList: UnipaPage[] = [
    {
      key: 'keiji',
      pageTitle: '掲示一覧',
      scripts: ['./scripts/pages/keiji.js'],
      styles: ['./styles/pages/keiji.css'],
    },
    {
      key: 'error',
      pageTitle: 'エラー',
    },
    {
      key: 'login',
      pageTitle: 'ログイン',
    },
    {
      key: 'gakuseki',
      pageTitle: '学籍情報照会',
    },
    {
      key: 'about-gakuseki',
      pageTitle: '説明画面',
      subTitle: '学籍情報照会について[Pkx005]',
    },
    {
      key: 'safety-confirm',
      pageTitle: '安否確認回答一覧',
    },
    {
      key: 'about-timetable',
      pageTitle: '説明画面',
      subTitle: '時間割について[Pkx005]',
    },
    {
      key: 'reg-other-cource',
      pageTitle: '他学部他学科等履修申請',
    },
    {
      key: 'student-timetable',
      pageTitle: '学生時間割表',
    },
    {
      key: 'classes-timetable',
      pageTitle: '授業時間割表',
    },
    {
      key: 'search-teacher',
      pageTitle: '教職員検索',
    },
    {
      key: 'syllabus',
      pageTitle: 'シラバス検索',
    },
    {
      key: 'about-attend-log',
      pageTitle: '説明画面',
      subTitle: '出席管理について[Pkx005]',
    },
    {
      key: 'attend-log',
      pageTitle: '出欠状況確認',
    },
    {
      key: 'about-grades-inquiry',
      pageTitle: '説明画面',
      subTitle: '成績照会について[Pkx005]',
    },
    {
      key: 'grades-inquiry',
      pageTitle: '成績照会',
    },
    {
      key: 'my-step',
      pageTitle: 'マイステップ一覧',
    },
    {
      key: 'settings',
      pageTitle: '個人設定',
    },
  ];

  const getCurrentPage = (): UnipaPage | null => {
    // エラー画面チェック
    const isErrorPage = document.title === 'Error Page';
    if (isErrorPage)
      return {
        key: 'error',
        pageTitle: 'エラー',
      };

    // ログイン画面チェック
    const loginElement = document.getElementById('loginForm');
    if (loginElement)
      return {
        key: 'login',
        pageTitle: 'ログイン',
      };

    // ページヘッダー取得
    const headerElement = document.querySelector(
      '#mainWrapTop #funcHeader .ui-menuitem-text',
    );
    const headerSubElement = document.querySelector(
      '#mainWrapTop #funcHeader h2',
    );
    if (!headerElement) return null;
    if (headerElement instanceof HTMLSpanElement) {
      const pageName = headerElement.textContent;
      const matchedPage = PageList.find((p) => {
        if (
          p.subTitle !== undefined &&
          headerSubElement &&
          headerSubElement instanceof HTMLHeadingElement
        ) {
          const subTitle = headerSubElement.textContent?.trim();
          if (p.subTitle !== subTitle) return false;
        }
        if (p.pageTitle === pageName) return true;
        return false;
      });
      if (!matchedPage) return null;
      return matchedPage;
    }

    return null;
  };

  const page = getCurrentPage();
  // Return for callback
  page;
}

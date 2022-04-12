import { UnipaPage } from '../types/UnipaPage';

{
  const PageList: UnipaPage[] = [
    {
      key: 'BULLETIN_LIST',
      pageTitle: '掲示一覧',
      scripts: ['./scripts/pages/bulletin-list.js'],
      styles: ['./styles/pages/bulletin-list.css'],
    },
    {
      key: 'ERROR',
      pageTitle: 'エラー',
    },
    {
      key: 'LOGIN',
      pageTitle: 'ログイン',
    },
    {
      key: 'GAKUSEKI',
      pageTitle: '学籍情報照会',
    },
    {
      key: 'ABOUT_GAKUSEKI',
      pageTitle: '説明画面',
      subTitle: '学籍情報照会について[Pkx005]',
    },
    {
      key: 'SAFETY_CONFIRM',
      pageTitle: '安否確認回答一覧',
    },
    {
      key: 'ABOUT_TIMETABLE',
      pageTitle: '説明画面',
      subTitle: '時間割について[Pkx005]',
    },
    {
      key: 'REG_OTHER_COURSE',
      pageTitle: '他学部他学科等履修申請',
    },
    {
      key: 'STUDENT_TIMETABLE',
      pageTitle: '学生時間割表',
    },
    {
      key: 'CLASSES_TIMETABLE',
      pageTitle: '授業時間割表',
    },
    {
      key: 'SEARCH_TEACHER',
      pageTitle: '教職員検索',
    },
    {
      key: 'SYLLABUS',
      pageTitle: 'シラバス検索',
    },
    {
      key: 'ABOUT_ATTEND_LOG',
      pageTitle: '説明画面',
      subTitle: '出席管理について[Pkx005]',
    },
    {
      key: 'ATTEND_LOG',
      pageTitle: '出欠状況確認',
    },
    {
      key: 'ABOUT_GRADES_INQUIRY',
      pageTitle: '説明画面',
      subTitle: '成績照会について[Pkx005]',
    },
    {
      key: 'GRADES_INQUIRY',
      pageTitle: '成績照会',
    },
    {
      key: 'MY_STEP',
      pageTitle: 'マイステップ一覧',
    },
    {
      key: 'SETTINGS',
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

import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shibajuku Guidelines",
  description: "ShibajukuのWebサイト制作ガイドライン",
  lang: "ja",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "コーディングガイドライン", link: "/coding-guidelines" }],

    sidebar: [
      {
        text: "コーディングガイドライン",
        items: [
          { text: "基本仕様", link: "/coding-guidelines/" },
          { text: "HTML ガイドライン", link: "/coding-guidelines/html" },
          { text: "CSS ガイドライン", link: "/coding-guidelines/css" },
          { text: "JavaScript ガイドライン", link: "/coding-guidelines/javascript" },
          { text: "命名規則", link: "/coding-guidelines/naming" },
          { text: "品質管理", link: "/coding-guidelines/quality" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/shibajuku/guidelines" }],

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/shibajuku/guidelines/edit/main/src/:path",
      text: "GitHubで編集する",
    },

    lastUpdated: {
      text: "最終更新日",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025 Shibajuku",
    },
  },
});

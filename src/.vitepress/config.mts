import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shibajuku Guidelines",
  description: "ShibajukuのWebサイト制作ガイドライン",
  lang: "ja",
  head: [
    ['meta', { name: 'twitter:card', content: "summary_large_image" }],
    ['meta', { name: 'twitter:site', content: "@shibajuku_salon" }],
    ['meta', { property: 'og:image', content: "https://guidelines.shibajuku.net/ogp.png" }],
    ['meta', { property: 'og:url', content: "https://guidelines.shibajuku.net" }],
    ['meta', { property: 'og:locale', content: "ja_JP" }],
    ['link', { rel: 'icon', href: '/favicon.svg',  type: "image/svg+xml" }],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
    ],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap', rel: 'stylesheet' }
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.svg',
    nav: [
      // { text: "コーディングガイドライン", link: "/coding-guidelines" },
      {
        text: 'コーディングガイドライン',
        items: [
          { text: "基本仕様", link: "/coding-guidelines/" },
          { text: "HTML ガイドライン", link: "/coding-guidelines/html" },
          { text: "CSS ガイドライン", link: "/coding-guidelines/css" },
          { text: "JavaScript ガイドライン", link: "/coding-guidelines/javascript" },
          { text: "Git ガイドライン", link: "/coding-guidelines/git" },
          { text: "命名規則", link: "/coding-guidelines/naming" },
          { text: "品質管理", link: "/coding-guidelines/quality" },
          { text: "用語集", link: "/coding-guidelines/glossary" },
        ]
      },
      {
        text: '3.0.0-alpha.3',
        items: [
          { text: "変更履歴", link: "https://github.com/shibajuku/guidelines/releases" },
        ]
      }
    ],

    sidebar: [
      {
        text: "コーディングガイドライン",
        items: [
          { text: "基本仕様", link: "/coding-guidelines/" },
          { text: "HTML ガイドライン", link: "/coding-guidelines/html" },
          { text: "CSS ガイドライン", link: "/coding-guidelines/css" },
          { text: "JavaScript ガイドライン", link: "/coding-guidelines/javascript" },
          { text: "Git ガイドライン", link: "/coding-guidelines/git" },
          { text: "命名規則", link: "/coding-guidelines/naming" },
          { text: "品質管理", link: "/coding-guidelines/quality" },
          { text: "用語集", link: "/coding-guidelines/glossary" },
        ],
      },
    ],

    outlineTitle: "このページの内容",

    socialLinks: [
      { icon: "x", link: "https://x.com/shibajuku_salon" },
      { icon: "github", link: "https://github.com/shibajuku/guidelines" }
    ],

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/shibajuku/guidelines/edit/main/src/:path",
      text: "GitHubで編集する",
    },


    externalLinkIcon: true,

    lastUpdated: {
      text: "最終更新日",
      formatOptions: {
        dateStyle: "long"
      },
    },

    footer: {
      message: 'This guideline is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja" target="_blank" rel="license noopener">CC BY-NC-SA 4.0</a>.',
      copyright: "Copyright © 2025 Shibajuku",
    },
  },
});

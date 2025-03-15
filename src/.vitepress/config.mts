import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/guidelines/",
  title: "Shibajuku Guidelines",
  description: "ShibajukuのWebサイト制作ガイドライン",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Coding Guidelines', link: '/coding-guidelines' }
    ],

    sidebar: [
      {
        text: 'ガイドライン',
        items: [
          { text: '基本仕様', link: '/coding-guidelines/base' },
          { text: 'HTMLガイドライン', link: '/coding-guidelines/html' },
          { text: 'CSSガイドライン', link: '/coding-guidelines/css' },
          { text: 'JavaScriptガイドライン', link: '/coding-guidelines/javascript' },
          { text: '命名規則', link: '/coding-guidelines/naming' },
          { text: '品質管理', link: '/coding-guidelines/quality' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/shibajuku/guidelines' }
    ],

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Shibajuku'
    }
  }
})

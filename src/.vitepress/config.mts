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
      { text: 'Guidelines', link: '/guidelines' }
    ],

    sidebar: [
      {
        text: 'ガイドライン',
        items: [
          { text: '基本仕様', link: '/guidelines/base' },
          { text: 'HTMLガイドライン', link: '/guidelines/html' },
          { text: 'CSSガイドライン', link: '/guidelines/css' },
          { text: 'JavaScriptガイドライン', link: '/guidelines/javascript' },
          { text: '命名規則', link: '/guidelines/naming' },
          { text: '品質管理', link: '/guidelines/quality' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/shibajuku/coding-guidelines' }
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

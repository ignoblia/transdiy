import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "DIY-HRT Wiki",
  description: "A comprehensive guide on how to do DIY transgender hormone therapy",
  
  
  markdown: {
    theme: {
      light: "catppuccin-latte",
      dark: "catppuccin-mocha",
    },
  },
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ignoblia/ignoblia.github.io' }
    ]
  }
})
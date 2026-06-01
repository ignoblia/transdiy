import { defineEnhanceApp } from 'vitepress'
import ThemeSwitcher from './components/theme-switcher.vue'

export default defineEnhanceApp(({ app }) => {
  // Register the theme switcher component globally
  app.component('ThemeSwitcher', ThemeSwitcher)
})
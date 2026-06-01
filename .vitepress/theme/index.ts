import { defineTheme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { enhanceApp } from './enhanceClient'

export default defineTheme({
  ...DefaultTheme,
  enhanceApp
})
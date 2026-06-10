// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import SafetyBanner from './components/SafetyBanner.vue'
import PanicButton from './components/PanicButton.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(SafetyBanner),
      'layout-bottom': () => h(PanicButton),
    })
  },
}

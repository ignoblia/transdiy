<template>
  <div class="theme-switcher">
    <button 
      @click="toggleTheme" 
      class="theme-switcher-button"
      :class="[currentTheme, isDark ? 'dark' : 'light']"
      title="Switch theme"
    >
      <span class="theme-switcher-icon" :class="currentTheme"></span>
    </button>
    
    <div class="theme-dropdown" v-if="showDropdown">
      <div class="theme-option" 
           v-for="theme in themes" 
           :key="theme.name"
           @click="selectTheme(theme.name)"
           :class="{ active: currentTheme === theme.name }"
      >
        <div class="theme-color-preview" 
             :class="theme.name"
             :style="{ '--bg-color': theme.bgColor }">
        </div>
        <span class="theme-name">{{ theme.displayName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  data() {
    return {
      currentTheme: 'mocha', // default theme
      isDark: true,
      showDropdown: false,
      themes: [
        { 
          name: 'mocha', 
          displayName: 'Mocha', 
          bgColor: '#1e1e2e',
          isDark: true
        },
        { 
          name: 'latte', 
          displayName: 'Latte', 
          bgColor: '#eff1f5',
          isDark: false
        },
        { 
          name: 'macchiato', 
          displayName: 'Macchiato', 
          bgColor: '#24273a',
          isDark: true
        },
        { 
          name: 'frappe', 
          displayName: 'Frappe', 
          bgColor: '#303446',
          isDark: true
        }
      ]
    }
  },
  computed: {
    // Determine if current theme is dark
    isDarkTheme() {
      return this.themes.find(t => t.name === this.currentTheme).isDark;
    }
  },
  methods: {
    toggleTheme() {
      this.showDropdown = !this.showDropdown;
    },
    selectTheme(themeName) {
      this.currentTheme = themeName;
      this.showDropdown = false;
      this.applyTheme(themeName);
    },
    applyTheme(themeName) {
      // Remove all theme classes from body
      document.body.classList.remove('theme-mocha', 'theme-latte', 'theme-macchiato', 'theme-frappe');
      
      // Add selected theme class
      document.body.classList.add(`theme-${themeName}`);
      
      // Update CSS variables for the theme
      const theme = this.themes.find(t => t.name === themeName);
      if (theme) {
        document.documentElement.style.setProperty('--c-bg', theme.bgColor);
        // You would need to set more CSS variables here for a complete theme switch
        // This is a simplified version - in practice, you'd need to switch all the Catppuccin colors
      }
      
      // Save preference to localStorage
      localStorage.setItem('diy-hrt-wiki-theme', themeName);
    }
  },
  mounted() {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('diy-hrt-wiki-theme');
    if (savedTheme && this.themes.some(t => t.name === savedTheme)) {
      this.currentTheme = savedTheme;
      this.applyTheme(savedTheme);
    }
    
    // Add initial theme class to body
    document.body.classList.add(`theme-${this.currentTheme}`);
  },
  beforeUnload() {
    // Clean up
    document.body.classList.remove(`theme-${this.currentTheme}`);
  }
}
</script>

<style scoped>
.theme-switcher {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.theme-switcher-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--c-text);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.theme-switcher-button:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.theme-switcher-button.dark {
  border-color: var(--c-text);
  color: var(--c-text);
}

.theme-switcher-button.light {
  border-color: var(--c-text);
  color: var(--c-text);
  background: rgba(255,255,255,0.1);
}

.theme-switcher-icon {
  font-size: 18px;
}

.theme-switcher-icon.mocha::before {
  content: "🌙";
}

.theme-switcher-icon.latte::before {
  content: "☀️";
}

.theme-switcher-icon.macchiato::before {
  content: "💜";
}

.theme-switcher-icon.frappe::before {
  content: "🌿";
}

.theme-dropdown {
  position: absolute;
  bottom: 50px;
  left: 0;
  background: var(--c-bg);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 180px;
  z-index: 1001;
  animation: fadeIn 0.2s ease;
}

.theme-option {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-option:hover {
  background: rgba(255,255,255,0.1);
}

.theme-option.active {
  background: var(--c-surface0);
}

.theme-color-preview {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
  border: 2px solid var(--c-text);
}

.theme-name {
  font-size: 14px;
  flex-grow: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hide dropdown when clicking outside */
body:not(.theme-switcher-active) .theme-dropdown {
  display: none;
}
</style>
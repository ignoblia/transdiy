<template>
  <!-- First-time visitor toast notification (3× Escape shortcut) -->
  <Teleport to="body">
    <div
      v-if="showToast"
      id="panic-toast"
      class="panic-toast"
    >
      <div class="panic-toast-inner">
        <span class="panic-toast-icon">🛟</span>
        <div class="panic-toast-body">
          <p class="panic-toast-title">Quick Exit Shortcut</p>
          <p class="panic-toast-desc">
            Press the <kbd class="panic-toast-kbd">Esc</kbd> key
            <strong>3 times within 1 second</strong> to immediately leave this site
            and go to a safe search page.
          </p>
          <button
            @click="dismissToast"
            class="panic-toast-btn"
          >
            Got it
          </button>
        </div>
        <button
          @click="dismissToast"
          class="panic-toast-close"
          aria-label="Dismiss"
        >
          <svg class="panic-toast-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ====== CONFIGURATION ======
const ESCAPE_TIMEOUT_MS = 1000    // 1-second window for 3 presses
const ESCAPE_PRESSES_NEEDED = 3
const REDIRECT_URL = 'https://www.google.com/search?q='

// ====== MOBILE CONFIGURATION (Triple-tap) ======
const TAP_TIMEOUT_MS = 1000       // 1-second window for 3 taps
const TAPS_NEEDED = 3
// Elements where taps should be ignored (won't trigger panic)
const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, [role="button"], [contenteditable]'

// ====== SAFE SEARCH PHRASES ======
const safePhrases = [
  'homework help algebra quadratic equations',
  'how to train a puppy at home',
  'best soccer highlights today champions league',
  'photosynthesis explained for students',
  'minecraft building ideas easy',
  'nba finals highlights 2026',
  'how to bake chocolate chip cookies from scratch',
  'world war 2 summary for school project',
  'cute cat videos compilation funny',
  'how to fix a bike chain at home',
  'study tips for final exams high school',
  'best free online courses for teenagers',
  'how to make slime without borax easy',
  'pokemon scarlet violet walkthrough',
  'solar system facts for science project',
  'easy guitar songs for beginners tabs',
  'how to edit videos on capcut pc',
  'ancient egypt facts for homework',
  'best anime series to watch 2026',
  'how to draw anime eyes step by step',
  'math word problems practice 8th grade',
  'fun science experiments at home with water',
  'how to gain muscle fast for teens',
  'fortnite chapter 6 new weapons guide',
  'how to write a book report middle school',
]

// ====== STATE ======
const showToast = ref(false)
let escapePressTimestamps = []
let tapTimestamps = []
let toastCheckDone = false

// ====== PANIC LOGIC ======
function getRandomPhrase() {
  return safePhrases[Math.floor(Math.random() * safePhrases.length)]
}

function panicExit() {
  const phrase = getRandomPhrase()
  const safeUrl = REDIRECT_URL + encodeURIComponent(phrase)

  // === Clear session history to prevent back-button exposure ===
  // Replace the current entry so this page isn't in the stack
  history.replaceState(null, '', window.location.pathname)
  // Push many dummy entries to push any real site pages out of reach
  for (let i = 0; i < 50; i++) {
    history.pushState(null, '', window.location.pathname + '?=' + Date.now() + i)
  }
  // Replace the final (top) dummy entry with the safe search URL
  window.location.replace(safeUrl)
}

function handleKeydown(e) {
  if (e.key !== 'Escape') return

  const now = Date.now()
  // Keep only presses within the timeout window
  escapePressTimestamps = escapePressTimestamps.filter(t => now - t < ESCAPE_TIMEOUT_MS)
  escapePressTimestamps.push(now)

  if (escapePressTimestamps.length >= ESCAPE_PRESSES_NEEDED) {
    escapePressTimestamps = [] // reset
    panicExit()
  }
}

// ====== MOBILE PANIC (Triple-tap) ======
function handleTouchEnd(e) {
  // Only single-finger taps
  if (e.changedTouches.length !== 1) return

  // Ignore taps on interactive elements (links, buttons, inputs, etc.)
  const target = e.target
  if (!target || target.closest(INTERACTIVE_SELECTOR)) return

  const now = Date.now()
  tapTimestamps = tapTimestamps.filter(t => now - t < TAP_TIMEOUT_MS)
  tapTimestamps.push(now)

  if (tapTimestamps.length >= TAPS_NEEDED) {
    tapTimestamps = [] // reset
    panicExit()
  }
}

// ====== TOAST LOGIC ======
function dismissToast() {
  showToast.value = false
  try {
    localStorage.setItem('panic-toast-dismissed', 'true')
  } catch (_) {}
}

function checkFirstVisit() {
  if (toastCheckDone) return
  toastCheckDone = true
  try {
    const dismissed = localStorage.getItem('panic-toast-dismissed')
    if (dismissed === 'true') return
  } catch (_) {}
  // Delay showing so user sees the page first
  setTimeout(() => {
    showToast.value = true
  }, 1500)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('touchend', handleTouchEnd, { passive: true })
  checkFirstVisit()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('touchend', handleTouchEnd)
})
</script>

<style scoped>
.panic-toast {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 9999;
  max-width: 384px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 16px;
  animation: panicSlideIn 0.3s ease-out;
}

.dark .panic-toast {
  background: #1f2937;
  border-color: #374151;
}

.panic-toast-inner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.panic-toast-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.panic-toast-body {
  flex: 1;
  min-width: 0;
}

.panic-toast-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.dark .panic-toast-title {
  color: #f3f4f6;
}

.panic-toast-desc {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 4px 0 0 0;
  line-height: 1.4;
}

.dark .panic-toast-desc {
  color: #9ca3af;
}

.panic-toast-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-family: monospace;
  background: #f3f4f6;
  color: #374151;
  border-radius: 4px;
  border: 1px solid #d1d5db;
}

.dark .panic-toast-kbd {
  background: #374151;
  color: #e5e7eb;
  border-color: #4b5563;
}

.panic-toast-btn {
  margin-top: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  background: #f3f4f6;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
}

.dark .panic-toast-btn {
  color: #e5e7eb;
  background: #374151;
}

.panic-toast-btn:hover {
  background: #e5e7eb;
}

.dark .panic-toast-btn:hover {
  background: #4b5563;
}

.panic-toast-close {
  flex-shrink: 0;
  color: #9ca3af;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
}

.panic-toast-close:hover {
  color: #6b7280;
}

.dark .panic-toast-close {
  color: #6b7280;
}

.dark .panic-toast-close:hover {
  color: #9ca3af;
}

.panic-toast-close-icon {
  width: 16px;
  height: 16px;
}

@keyframes panicSlideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

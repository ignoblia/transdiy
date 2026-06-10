<template>
  <!-- Global safety banner — warns users accessing from oppressive countries -->
  <div
    v-if="showBanner"
    class="safety-banner"
  >
    <div class="safety-banner-inner">
      <div class="safety-banner-content">
        <span class="safety-banner-icon">🚨</span>
        <div class="safety-banner-text">
          <div class="safety-banner-title">Safety Notice</div>
          <p class="safety-banner-description">
            We noticed you're accessing this site from <strong>{{ detectedCountryName }}</strong>,
            which has severe legal restrictions for LGBTQ+ people. Possessing or importing HRT
            medications without a prescription may carry extreme legal risks there.
            If you're in danger or concerned about your safety, please visit the
            <a href="/transdiy/safety-resources" class="safety-banner-link" @click="dismiss">Safety Resources page</a>
            or the <a href="https://ignoblia.github.io/transit/emergency/" class="safety-banner-link" @click="dismiss" target="_blank" rel="noopener">TransIT Emergency Guide →</a>.
          </p>
          <p class="safety-banner-footer">
            Press <kbd class="safety-banner-kbd">Esc</kbd> 3× for an immediate safe exit
          </p>
        </div>
      </div>
      <button
        @click="dismiss"
        class="safety-banner-close"
        aria-label="Dismiss safety notice"
        title="Dismiss"
      >
        <svg class="safety-banner-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const STORAGE_KEY = 'transdiy-safety-banner-dismissed'

const showBanner = ref(false)
const detectedCountryName = ref('')

// Countries with severe anti-LGBTQ+ laws where DIY HRT poses extreme risk
// Based on ILGA World maps and Equaldex data (countries scoring lowest on LGBTQ+ equality)
const DANGEROUS_COUNTRIES = {
  AF: { name: 'Afghanistan' },
  DZ: { name: 'Algeria' },
  AO: { name: 'Angola' },
  BD: { name: 'Bangladesh' },
  BN: { name: 'Brunei' },
  BI: { name: 'Burundi' },
  CM: { name: 'Cameroon' },
  TD: { name: 'Chad' },
  KM: { name: 'Comoros' },
  DJ: { name: 'Djibouti' },
  EG: { name: 'Egypt' },
  ER: { name: 'Eritrea' },
  SZ: { name: 'Eswatini' },
  ET: { name: 'Ethiopia' },
  GA: { name: 'Gabon' },
  GM: { name: 'Gambia' },
  GH: { name: 'Ghana' },
  GN: { name: 'Guinea' },
  GW: { name: 'Guinea-Bissau' },
  GY: { name: 'Guyana' },
  IR: { name: 'Iran' },
  IQ: { name: 'Iraq' },
  JM: { name: 'Jamaica' },
  JO: { name: 'Jordan' },
  KE: { name: 'Kenya' },
  KW: { name: 'Kuwait' },
  LB: { name: 'Lebanon' },
  LY: { name: 'Libya' },
  MW: { name: 'Malawi' },
  MY: { name: 'Malaysia' },
  MV: { name: 'Maldives' },
  ML: { name: 'Mali' },
  MR: { name: 'Mauritania' },
  MU: { name: 'Mauritius' },
  YT: { name: 'Mayotte' },
  MN: { name: 'Mongolia' },
  MA: { name: 'Morocco' },
  MZ: { name: 'Mozambique' },
  MM: { name: 'Myanmar' },
  NA: { name: 'Namibia' },
  NE: { name: 'Niger' },
  NG: { name: 'Nigeria' },
  OM: { name: 'Oman' },
  PK: { name: 'Pakistan' },
  PS: { name: 'Palestine' },
  QA: { name: 'Qatar' },
  RU: { name: 'Russia' },
  RW: { name: 'Rwanda' },
  SA: { name: 'Saudi Arabia' },
  SN: { name: 'Senegal' },
  SL: { name: 'Sierra Leone' },
  SO: { name: 'Somalia' },
  SS: { name: 'South Sudan' },
  SD: { name: 'Sudan' },
  SY: { name: 'Syria' },
  TZ: { name: 'Tanzania' },
  TG: { name: 'Togo' },
  TN: { name: 'Tunisia' },
  TM: { name: 'Turkmenistan' },
  UG: { name: 'Uganda' },
  AE: { name: 'United Arab Emirates' },
  UZ: { name: 'Uzbekistan' },
  YE: { name: 'Yemen' },
  ZM: { name: 'Zambia' },
  ZW: { name: 'Zimbabwe' },
}

function dismiss() {
  showBanner.value = false
  if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('testBanner') === '1') return
  try {
    localStorage.setItem(STORAGE_KEY, 'true')
  } catch (_) {}
}

async function checkLocation() {
  // Check if previously dismissed
  try {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed === 'true') return
  } catch (_) {}

  let countryCode = null

  // Try multiple geo-IP services (ordered by reliability)
  const geoProviders = [
    { url: 'https://ipinfo.io/json', codeField: 'country', timeout: 4000 },
    { url: 'https://ipapi.co/json/', codeField: 'country_code', timeout: 4000 },
    { url: 'https://api.country.is/', codeField: 'country', timeout: 4000 },
  ]

  for (const provider of geoProviders) {
    try {
      const res = await fetch(provider.url, { signal: AbortSignal.timeout(provider.timeout) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (data[provider.codeField]) {
        countryCode = data[provider.codeField]
        break
      }
    } catch (e) {
      console.info('[SafetyBanner]', provider.url, 'failed:', e.message)
    }
  }

  // Expose debug info
  window.__safetyDebug = { countryCode, timestamp: Date.now() }

  if (!countryCode) {
    console.warn('[SafetyBanner] All geo-IP providers failed — banner will not show')
    return
  }

  const match = DANGEROUS_COUNTRIES[countryCode]
  window.__safetyDebug.match = match ? { name: match.name } : null

  if (match) {
    console.log(`[SafetyBanner] Dangerous country detected: ${match.name} — showing banner`)
    detectedCountryName.value = match.name
    showBanner.value = true
  } else {
    console.log(`[SafetyBanner] Country ${countryCode} not in high-risk list — hiding banner`)
  }
}

const route = useRoute()

function checkTestMode() {
  if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('testBanner') === '1') {
    detectedCountryName.value = 'Nigeria'
    showBanner.value = true
    return true
  }
  return false
}

onMounted(async () => {
  // Allow clearing the dismissed flag via URL param
  if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('resetBanner') === '1') {
    try { localStorage.removeItem(STORAGE_KEY) } catch (_) {}
  }
  if (checkTestMode()) return
  await checkLocation()
})

// Re-check on every SPA navigation (in case user's IP changes, e.g. via VPN)
watch(() => route.path, async () => {
  if (checkTestMode() || showBanner.value) return
  await checkLocation()
})
</script>

<style>
.safety-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  background: #fef2f2;
  border-bottom: 2px solid #f87171;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.dark .safety-banner {
  background: #450a0a;
  border-bottom-color: #dc2626;
}

.safety-banner-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.safety-banner-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.safety-banner-icon {
  font-size: 2.25rem;
  flex-shrink: 0;
  line-height: 1;
}

.safety-banner-text {
  flex: 1;
  min-width: 0;
}

.safety-banner-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #991b1b;
  margin: 0;
  line-height: 1.3;
}

.dark .safety-banner-title {
  color: #fecaca;
}

.safety-banner-description {
  font-size: 0.875rem;
  color: #b91c1c;
  margin: 4px 0 0 0;
  line-height: 1.5;
  font-weight: 500;
}

.dark .safety-banner-description {
  color: #fca5a5;
}

.safety-banner-link {
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1.5px;
  color: #991b1b;
}

.dark .safety-banner-link {
  color: #fecaca;
}

.safety-banner-link:hover {
  color: #7f1d1d;
}

.dark .safety-banner-link:hover {
  color: #fef2f2;
}

.safety-banner-footer {
  font-size: 0.75rem;
  color: #dc2626;
  margin: 6px 0 0 0;
}

.dark .safety-banner-footer {
  color: #f87171;
}

.safety-banner-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1px 6px;
  font-size: 0.75rem;
  font-family: monospace;
  background: #fca5a5;
  color: #7f1d1d;
  border-radius: 4px;
  border: 1px solid #ef4444;
}

.dark .safety-banner-kbd {
  background: #7f1d1d;
  color: #fecaca;
  border-color: #ef4444;
}

.safety-banner-close {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid rgba(185, 28, 28, 0.25);
  background: transparent;
  color: #991b1b;
  cursor: pointer;
  transition: background 0.15s;
  margin-top: 2px;
}

.safety-banner-close:hover {
  background: rgba(185, 28, 28, 0.1);
}

.dark .safety-banner-close {
  color: #fecaca;
  border-color: rgba(252, 165, 165, 0.25);
}

.dark .safety-banner-close:hover {
  background: rgba(252, 165, 165, 0.1);
}

.safety-banner-close-icon {
  width: 16px;
  height: 16px;
}
</style>

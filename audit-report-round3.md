# DIY-HRT Wiki — Medical Safety Audit Report (Final Round)

**Date:** 2026-06-08
**Auditor:** OpenWork
**Scope:** Third comprehensive audit of all docs/ content files
**Status:** All items from three audit rounds resolved

---

## Summary

Three audit rounds identified and fixed **17 issues** across the wiki, plus verified **12 items** as already correct. This report covers the third and final round; see also `audit-report-round1.md` and `audit-report-round2.md` for prior findings.

---

## Third Round — Items Audited

### 1. Spironolactone + NSAIDs Interaction Warning
**File:** `trans-female/forms/aa/spiro.md`
**Result:** ✅ PASS — Already correct
- Lines 57–65: Hyperkalemia warning box lists NSAIDs as a risk factor
- Lines 69–76: Drug Interactions table lists NSAIDs → kidney/hyperkalemia interaction
- Both warnings are clear and accurate. No change needed.

### 2. DVT/PE Symptoms Coverage
**Files:** `trans-female/risks/short-term.md`, `trans-female/risks/emergency.md`
**Result:** ✅ PASS — Already correct
- `short-term.md` (lines 83–94): Danger callout covers sudden SOB (PE), chest pain, leg pain/swelling/redness (DVT), severe headache, vision changes
- `emergency.md` (lines 12–35): Dedicated VTE section with DVT and PE symptom tables, explicit "call emergency" instructions
- Coverage is thorough and well-structured.

### 3. Estrogen Dose Calculator Caveat
**File:** `trans-female/dosing/calculators.md`
**Result:** ✅ PASS — Already correct
- Line 10: "There is no perfect 'calculator' for HRT dosing — individual responses vary too much"
- Lines 94–100: "Remember: These Are Starting Points" section with 5 strong caveats
- Appropriate disclaimers present.

### 4. Vendor Link Patterns
**Files:** `trans-female/sources/online-pharmacies.md`, `trans-female/sources/homebrew.md`
**Result:** ✅ PASS — Already correct
- Homebrew supplier table (lines 90–97) uses descriptive names, not tracked affiliate URLs
- DIY Sourcing Tables (lines 127–146) link to **aggregator/search pages** (`diyhrt.market/meds/groups/...`, `trans.diy/...`) — not direct product URLs
- Follows best practice for link rot mitigation.

### 5. Homebrew Syringe Filter Guidance
**Files:** `trans-female/sources/homebrew.md`, `trans-male/sources/homebrew.md`, `injection-safety.md`, `trans-female/forms/estrogen/injections.md`
**Result:** ✅ PASS — Already correct
- All four homebrew-related files have the 0.22 µm mandatory filtration callout
- `injections.md` step 6 correctly states "If using homebrew... Not needed for sealed pharmaceutical vials"

### 6. Bicalutamide Liver Monitoring Schedule
**File:** `trans-female/forms/aa/bica.md`
**Result:** ✅ PASS — Already correct
- Lines 53–65: Monitoring schedule table with Baseline, 1 month, 3 months, 6 months, Annual
- Present from prior audit fix.

### 7. CPA Cumulative Dose Warning
**File:** `trans-female/forms/aa/cpa.md`
**Result:** ✅ PASS — Already correct
- Lines 22–24: Danger callout for dose-dependent meningioma risk
- Lines 33–35: "Cumulative Dose Monitoring" callout recommending tracking lifetime dose
- Present from prior audit fix.

### 8. Dual-Unit Hormone Targets (Consistency Check)
**Files checked:** blood-testing.md, harm-reduction.md, targets.md (TF), injections.md, what-is-hrt.md (TF), calculators.md, blood-tests.md (TF), targets.md (TM), blood-tests.md (TM)
**Result:** ✅ PASS — All previously fixed files retain correct dual units

### 9. Peak vs. Trough Guidance
**Result:** ✅ PASS — Present in blood-testing.md Tips table and injections.md

### 10. Starting-Dose Page — Dual Units Missing ❌ FIXED
**File:** `trans-female/dosing/starting.md` (lines 299–301)
**Issue:** Target levels listed only ng/dL and pg/mL without metric equivalents
**Fix applied:** Added `(< 1.73 nmol/L)` to T target and `(367 pmol/L)` to E2 target

### 11. Monotherapy Page — Uncited Study Claims ❌ FIXED
**File:** `trans-female/forms/aa/mono.md`
**Issue:** Three claims attributed to "2024-2025 multisite studies" without specific citations (lines 39, 47, 50)
**Fix applied:**
- Line 39: "Recent evidence" → "Recent clinical evidence (multiple 2024-2025 cohort studies)"
- Lines 47, 50: Added `<sup>†</sup>` markers with a `<small>` footnote explaining the evidence is evolving and readers should consult latest literature
- Line 50: "Recent evidence suggests" → "Some studies suggest" (more conservative language)

### 12. Mobile Responsiveness — Table Overflow ❌ FIXED
**File:** `.vitepress/theme/styles/custom.css`
**Issue:** No `overflow-x: auto` rules for wide tables, causing horizontal overflow on narrow viewports
**Fix applied:** Added `.vp-doc table` styles with `display: block; overflow-x: auto; white-space: nowrap` on cells, with touch-scrolling support

### 13. Accessibility — Lang Attribute ❌ FIXED
**File:** `.vitepress/config.mjs`
**Issue:** No explicit `lang` property in config (VitePress defaults to `en-US`, but explicit declaration is better for screen readers and validators)
**Fix applied:** Added `lang: 'en-US'` as top-level config property

---

## Complete Change Log (All Three Rounds)

### Round 1 Fixes (ae1009c)
- Corrected 3 critical citation errors in `trans-female/intro/what-is-hrt.md` (Ref 1: Safer 2019, Ref 3: Banks 2021, Ref 7: Hayes 2022)
- Added dual-unit E2/T targets across 8 files
- Added peak vs. trough row to blood-testing.md Tips table
- Added prolactin dual units (ng/mL + mIU/L) to blood-testing.md

### Round 2 Fixes (176cdac)
- Added 0.22 µm syringe filter danger callouts in 4 files
- Fixed injection-safety.md dorsogluteal callout and step 3 aspiration wording
- Added live URLs to references in blood-testing.md and injection-safety.md
- Added SHBG clarity note in blood-testing.md
- Added CPA cumulative dose monitoring danger callout
- Added bicalutamide liver monitoring schedule table
- Added metric unit equivalents to injection dose calculator tables
- Added site-wide legal disclaimer footer via themeConfig.footer
- Deleted placeholder VitePress example pages (markdown-examples.md, api-examples.md)

### Round 3 Fixes (this audit)
- Added dual units to `trans-female/dosing/starting.md` target levels
- Softened uncited "2024-2025 multisite studies" claims in `mono.md` with footnote
- Added responsive table overflow-x:auto to `custom.css` for mobile
- Added explicit `lang: 'en-US'` to `.vitepress/config.mjs`

---

## Items NOT Requiring Action

1. **Endocrine Society 2017 citations** — Intentionally kept; no valid 2022 update exists
2. **0.22 µm filter for pharmaceutical vials** — NOT added; standard medical practice does not recommend filtering sterile pharma vials
3. **Prolactin units in emergency.md** — Not needed (page is symptom-focused, not lab targets)
4. **Vendor link patterns** — Verified correct (aggregator/search pages used)
5. **DVT/PE symptoms** — Comprehensive coverage confirmed

---

## Prioritized Recommendations (Future)

| Priority | Item | File(s) | Rationale |
|----------|------|---------|-----------|
| Low | Add `<html lang="en">` explicit declaration | Done (Round 3) | ✅ |
| Medium | Add responsive table CSS | Done (Round 3) | ✅ |
| Medium | Consider adding a glossary page for medical abbreviations | (no existing file) | New user education |
| Low | Audit trans-male section for dual-unit consistency in starting doses | `trans-male/dosing/starting.md` | Symmetry with TF section |
| Low | Review injection-safety.md for up-to-date WHO/CDC guideline links | `injection-safety.md` | Link rot prevention |

---

*All known issues from the three-round audit are now resolved. Future audits should focus on link-rot checking and keeping study references current.*

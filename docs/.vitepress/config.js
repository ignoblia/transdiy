export default {
  title: 'DIY-HRT Wiki',
  description: 'Comprehensive, evidence-based DIY HRT guides for the trans community — dosing, blood tests, injection safety, and more.',
  head: [
    ['meta', { property: 'og:title', content: 'DIY-HRT Wiki' }],
    ['meta', { property: 'og:description', content: 'Comprehensive, evidence-based DIY HRT guides for the trans community — dosing, blood tests, injection safety, and more.' }],
    ['meta', { property: 'og:image', content: '/og-image.png' }],
    ['meta', { property: 'og:url', content: 'https://transdiy.github.io/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    sidebar: [
      // ========== TRANS FEMALE GUIDE ==========
      {
        text: '🏳️‍⚧️ Trans Female Guide',
        collapsed: false,
        items: [
          {
            text: '1. Intro to HRT',
            collapsed: false,
            items: [
              { text: 'What is HRT?', link: '/trans-female/intro/what-is-hrt' },
              { text: 'Hormones 101 (Estrogen & Anti‑androgens)', link: '/trans-female/intro/hormones-101' },
              { text: 'Expected Changes (timeline)', link: '/trans-female/intro/expected-changes' },
              { text: 'Myths vs Facts', link: '/trans-female/intro/myths' }
            ]
          },
          {
            text: '2. Prescribed vs DIY',
            collapsed: true,
            items: [
              { text: 'Prescribed HRT (Pros & Cons)', link: '/trans-female/prescribed-vs-diy/prescribed' },
              { text: 'DIY HRT (Pros & Cons)', link: '/trans-female/prescribed-vs-diy/diy' },
              { text: 'Legal Risks by Country', link: '/trans-female/prescribed-vs-diy/legal' },
              { text: 'How to Switch from DIY to Prescribed', link: '/trans-female/prescribed-vs-diy/switch' }
            ]
          },
          {
            text: '3. Forms of HRT',
            collapsed: true,
            items: [
              {
                text: 'Estrogen',
                items: [
                  { text: 'Oral (pills)', link: '/trans-female/forms/estrogen/oral' },
                  { text: 'Sublingual', link: '/trans-female/forms/estrogen/sublingual' },
                  { text: 'Transdermal (patches/gel)', link: '/trans-female/forms/estrogen/transdermal' },
                  { text: 'Injections (EV, EC, EEn)', link: '/trans-female/forms/estrogen/injections' },
                  { text: 'Implants (pellets)', link: '/trans-female/forms/estrogen/implants' }
                ]
              },
              {
                text: 'Anti‑androgens',
                items: [
                  { text: 'Spironolactone', link: '/trans-female/forms/aa/spiro' },
                  { text: 'Bicalutamide', link: '/trans-female/forms/aa/bica' },
                  { text: 'Cyproterone Acetate (CPA)', link: '/trans-female/forms/aa/cpa' },
                  { text: 'GnRH Agonists', link: '/trans-female/forms/aa/gnrh' },
                  { text: 'Monotherapy (E alone)', link: '/trans-female/forms/aa/mono' }
                ]
              },
              { text: 'Progesterone', link: '/trans-female/forms/progesterone' }
            ]
          },
          {
            text: '4. Side Effects & Risks',
            collapsed: true,
            items: [
              { text: 'Short‑term Side Effects', link: '/trans-female/risks/short-term' },
              { text: 'Long‑term Risks (DVT, prolactinoma, etc.)', link: '/trans-female/risks/long-term' },
              { text: 'Risk Mitigation Strategies', link: '/trans-female/risks/mitigation' },
              { text: 'When to Stop / Seek Help', link: '/trans-female/risks/emergency' }
            ]
          },
          {
            text: '5. Dosing + Bloods',
            collapsed: true,
            items: [
              { text: 'Starting Doses (Beginner)', link: '/trans-female/dosing/starting' },
              { text: 'Adjusting Doses (based on levels)', link: '/trans-female/dosing/adjusting' },
              { text: 'Blood Tests – What & When', link: '/trans-female/dosing/blood-tests' },
              { text: 'Target Ranges (E2, T, E1, SHBG)', link: '/trans-female/dosing/targets' },
              { text: 'Dosage Calculators', link: '/trans-female/dosing/calculators' },
              { text: 'Interpreting Your Results', link: '/trans-female/dosing/interpreting' }
            ]
          },
          {
            text: '6. HRT Sources',
            collapsed: true,
            items: [
              { text: 'Online Pharmacies', link: '/trans-female/sources/online-pharmacies' },
              { text: 'Homebrew Suppliers', link: '/trans-female/sources/homebrew' },
              { text: 'Verifying Product Quality', link: '/trans-female/sources/verification' },
              { text: 'Payment & Shipping Safely', link: '/trans-female/sources/shipping' },
              { text: 'Community Vendor Reviews', link: '/trans-female/sources/reviews' }
            ]
          },
          {
            text: '7. FAQ',
            collapsed: true,
            items: [
              { text: 'Common Beginner Questions', link: '/trans-female/faq/beginner' },
              { text: 'Fertility & Preservation', link: '/trans-female/faq/fertility' },
              { text: 'Interactions with Other Meds', link: '/trans-female/faq/interactions' },
              { text: 'Traveling with HRT', link: '/trans-female/faq/travel' }
            ]
          }
        ]
      },
      
      // ========== TRANS MALE GUIDE ==========
      {
        text: '🏳️‍⚧️ Trans Male Guide',
        collapsed: true,
        items: [
          {
            text: '1. Intro to HRT',
            collapsed: false,
            items: [
              { text: 'What is HRT?', link: '/trans-male/intro/what-is-hrt' },
              { text: 'Hormones 101 (Testosterone)', link: '/trans-male/intro/hormones-101' },
              { text: 'Expected Changes (timeline)', link: '/trans-male/intro/expected-changes' },
              { text: 'Myths vs Facts', link: '/trans-male/intro/myths' }
            ]
          },
          {
            text: '2. Prescribed vs DIY',
            collapsed: true,
            items: [
              { text: 'Prescribed HRT (Pros & Cons)', link: '/trans-male/prescribed-vs-diy/prescribed' },
              { text: 'DIY HRT (Pros & Cons)', link: '/trans-male/prescribed-vs-diy/diy' },
              { text: 'Legal Risks by Country', link: '/trans-male/prescribed-vs-diy/legal' }
            ]
          },
          {
            text: '3. Forms of HRT',
            collapsed: true,
            items: [
              {
                text: 'Testosterone',
                items: [
                  { text: 'Injections (Cypionate, Enanthate)', link: '/trans-male/forms/t/injections' },
                  { text: 'Gel (Androgel, generic)', link: '/trans-male/forms/t/gel' },
                  { text: 'Patches', link: '/trans-male/forms/t/patches' },
                  { text: 'Pellets (Testopel)', link: '/trans-male/forms/t/pellets' },
                  { text: 'Buccal/Tablets', link: '/trans-male/forms/t/buccal' }
                ]
              },
              { text: 'Estrogen Blockers (not usually needed)', link: '/trans-male/forms/e-blockers' },
              { text: 'Progestins (for bleeding control)', link: '/trans-male/forms/progestins' }
            ]
          },
          {
            text: '4. Side Effects & Risks',
            collapsed: true,
            items: [
              { text: 'Short‑term Side Effects', link: '/trans-male/risks/short-term' },
              { text: 'Long‑term Risks (polycythemia, atrophy)', link: '/trans-male/risks/long-term' },
              { text: 'Risk Mitigation (donate blood, etc.)', link: '/trans-male/risks/mitigation' },
              { text: 'When to Stop / Seek Help', link: '/trans-male/risks/emergency' }
            ]
          },
          {
            text: '5. Dosing + Bloods',
            collapsed: true,
            items: [
              { text: 'Starting Doses (Beginner)', link: '/trans-male/dosing/starting' },
              { text: 'Adjusting Doses', link: '/trans-male/dosing/adjusting' },
              { text: 'Blood Tests – What & When', link: '/trans-male/dosing/blood-tests' },
              { text: 'Target Ranges (total T, free T, E2, HCT)', link: '/trans-male/dosing/targets' },
              { text: 'Dosage Calculators', link: '/trans-male/dosing/calculators' }
            ]
          },
          {
            text: '6. HRT Sources',
            collapsed: true,
            items: [
              { text: 'Online Pharmacies', link: '/trans-male/sources/online-pharmacies' },
              { text: 'Homebrew Suppliers', link: '/trans-male/sources/homebrew' },
              { text: 'Verifying Product Quality', link: '/trans-male/sources/verification' },
              { text: 'Community Vendor Reviews', link: '/trans-male/sources/reviews' }
            ]
          },
          {
            text: '7. FAQ',
            collapsed: true,
            items: [
              { text: 'Common Beginner Questions', link: '/trans-male/faq/beginner' },
              { text: 'Fertility & Pregnancy', link: '/trans-male/faq/fertility' },
              { text: 'Interactions with Other Meds', link: '/trans-male/faq/interactions' },
              { text: 'Traveling with HRT', link: '/trans-male/faq/travel' }
            ]
          }
        ]
      },
      
      // ========== GENERAL / CROSS-CUTTING ==========
      {
        text: '🩸 Medical & Safety',
        collapsed: true,
        items: [
          { text: 'Blood Testing (Comprehensive)', link: '/blood-testing' },
          { text: 'Harm Reduction Overview', link: '/harm-reduction' },
          { text: 'Injection Techniques & Safety', link: '/injection-safety' },
          { text: 'Needle & Syringe Sourcing', link: '/needles' }
        ]
      },
      {
        text: '📦 Sourcing & Suppliers',
        collapsed: true,
        items: [
          { text: 'Trusted Vendor List (Trans Female)', link: '/sources/trans-female-vendors' },
          { text: 'Trusted Vendor List (Trans Male)', link: '/sources/trans-male-vendors' },
          { text: 'Payment Methods (Crypto, WISE)', link: '/sources/payment' },
          { text: 'Shipping & Customs', link: '/sources/shipping' },
          { text: 'Spotting Counterfeits', link: '/sources/counterfeit' }
        ]
      },
{
  text: '🧠 Community & Support',
  collapsed: true,
  items: [
    { text: 'Discord / Forums', link: '/community/discord' },
    { text: 'Mental Health Resources', link: '/community/mental-health' },
    { text: 'Harm Reduction Groups', link: '/community/harm-reduction-groups' },
    { text: 'Contributing to this Wiki', link: '/community/contributing' }
  ]
},
{
  text: '📚 References & Science',
  collapsed: true,
  items: [
    { text: 'Peer‑Reviewed Studies', link: '/references/studies' },
    { text: 'Clinical Guidelines (WPATH, Endocrine Society)', link: '/references/guidelines' },
    { text: 'Glossary of Terms', link: '/glossary' }
  ]
}
    ]
  }
}
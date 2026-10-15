# SEC-01 + NEW-WEB-02 review

Historical NEW-WEB-02 record. Current hero selection and R1 QA: [NEW-WEB-02R1 review](NEW-WEB-02R1-review.md).

Date: 2026-10-13. Review scope: VISUAL PROTOTYPE ONLY / NOT FOR PRODUCTION MERGE.

## Security release

- Initial main: `033e65eed0d6e0aa41850ee4d6d45c319d51fde2`.
- Live npm audit classified two locked transitive packages as High; omit-dev audit included source-map-js. No source change caused the blocker.

| Package | Before -> after | Affected range in live audit | Accepted registry release | Dependency paths | Omit-dev |
| --- | --- | --- | --- | --- | --- |
| source-map-js | 1.2.1 -> 1.2.2 | >=1.0.0 <1.2.2 | 1.2.2 | @tailwindcss/vite -> @tailwindcss/node; @tailwindcss/vite -> vite -> postcss; astro -> magicast; astro -> svgo -> css-tree / csso -> css-tree | Yes |
| http-cache-semantics | 4.2.0 -> 4.3.0 | <=4.2.0 | 4.3.0, outside npm affected range | astro -> http-cache-semantics | No |

Advisories: [source-map-js GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q), [http-cache-semantics GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp). Existing parent ranges ^1.2.1 / ^1.0.1 / ^4.2.0 accept the updates. Only package-lock.json changed (6 additions, 6 removals). No source, direct dependency, config, override or business change.

- Fresh npm ci: PASS. Audit full / omit-dev: 0 / 0.
- Baseline and post-fix regression: build; SEO (9 URLs); redirects (13/13); tracking; projects; Tem (11/11); Hoa Don (31/31); diff-check: PASS.
- Security [PR #5](https://github.com/truonghuyck5-ops/ist-web/pull/5), created Draft, then marked Ready and merged with normal merge commit; branch retained.
- Security commit: `349320d563b0a8abd89aef90cdc5a993ede640a8`.
- Merge / new main: `4756a2dd5f67889a63c384bd2b7e7be53e5da6e2`.
- Security preview: https://deploy-preview-5--insangtao.netlify.app/ ; Netlify successful deploy `6acdea030cfb944f13580ada`.
- Production: https://insangtao.net/ ; Netlify confirmed Published at merge SHA, deploy `6acdeabb90beaf8392beb273`.
- Preview and production: all 9 routes HTTP 200; sitemap identical; unknown URL 404; GA4 present; browser console has no errors. Tem 50x50mm / 1000 paper labels: 312.800 VND; quote popup/reset PASS. Hoa Don A6 / 2-ply / 40: 600.000 VND; quantity popup PASS on preview. Live production calculator results match. No rollback required.

## Prototype baseline and tokens

Clean existing branch fast-forwarded with --ff-only to `4756a2d`; fresh npm ci, 0/0 audit and existing baseline regression PASS before source implementation. Worktree: `I:\ist-web-v3`; branch: `codex/ist-portal-v3-prototype`.

| Token | Value |
| --- | --- |
| Background / soft | #FFFFFF / #F6F6F2 |
| Ink / muted / line | #111111 / #696966 / #DEDED8 |
| Accent | #EA580C, existing literal in src/style.css; sparing CTAs/markers |
| Small accent text | #C2410C, existing IST orange-700 family for readable links |
| Dark section | #111111 |
| Font | System sans: Apple system, BlinkMacSystemFont, Segoe UI, Arial, Noto Sans fallback, sans-serif; no font downloads |
| Type | Heavy compact headings; tracking -0.02 to -0.04em; relaxed Vietnamese body copy |
| Grid | 1280px max; 16–64px fluid gutters |
| Section spacing | 64px mobile; up to 104px desktop |
| Media radius | 22px major; 18px small mobile media |

## Images and flow

See [image audit](NEW-WEB-02-image-audit.md) for paths, dimensions, prior usage and selection reasons. One new 68,046-byte WebP derived from authorized Drive printed tags; original untouched. Hero uses approved daylight storefront fallback. Four approved project images/copy retained. Production uses 1910x1076 machine photo. No AI or stock imagery, no private records.

Flow: Navbar -> Hero -> Quick Portal -> Product Explorer -> Selected Projects -> Production Proof -> Process -> Final CTA -> Footer. Single contextual floating contact control: hidden while hero/final contact/footer already supplies actions; otherwise opens desktop panel/mobile sheet.

## Component / file inventory

All additions, under prototype paths:

- src/layouts/PortalV3Layout.astro: isolated font/CSS/meta/skip link.
- src/pages/__portal-v3/index.astro: section composition.
- src/pages/[portalV3].astro: getStaticPaths emits only __portal-v3 because Astro excludes underscore-prefixed directories.
- src/components/portal-v3/: Navbar, Hero, QuickPortal, ProductExplorer, SelectedProjects, ProductionProof, Process, ContactCta, Footer, FloatingContact, Media, content.js.
- src/styles/portal-v3.css: design tokens, responsive system, reduced-motion rules.
- public/images/portal-v3/ist-printed-tags.webp: authorized optimized library copy.
- docs/NEW-WEB-02-image-audit.md and this review.

Git diff/stat: 19 new files, 635 text insertions, no deletions, plus one 68,046-byte WebP. No existing production file changes.

## Local QA

| Width | Portal columns | Overflow / heading clipping | Contact layout |
| --- | --- | --- | --- |
| 1440 | 3 | None | Desktop panel |
| 1024 | 2 | None | Desktop panel |
| 768 | 2 | None | Desktop panel |
| 430 | 2 | None | Bottom sheet |
| 390 | 2 | None | Bottom sheet |
| 375 | 2 | None | Bottom sheet |
| 320 | 2 | None | Bottom sheet |

Section screenshots inspected on desktop, tablet, 390 and 320. Hero, portal, editorial list, project tiles, machine crop, process and CTA are legible; all in-view images loaded. Same-page anchors resolve and avoid sticky navbar. Native mobile menu toggles; anchor selection closes it; Escape returns focus to summary.

Accessibility: one H1; logical H2/H3; semantic header/nav/main/footer; useful alt and intrinsic dimensions on all 13 image instances. Menu and dialog close targets 44x44; contact/CTA buttons >=44px. Focus indicators are present. Modal initial focus is close button; Tab and Shift+Tab cycle inside; Escape and backdrop click close; focus returns to the trigger; scroll lock is removed. Mobile dialog fits all tested viewports; safe-area insets included in CSS. Reduced-motion CSS disables every transition/animation and anchors are immediate by default.

Computed color contrast: muted on white 5.51:1, muted on soft 5.08:1, ink on orange 5.30:1, orange-700 on white 5.18:1 / soft 4.78:1, soft text on dark 11.0:1.

Performance: Astro static; no new dependency/framework/font/icon/animation package. Hero eager/high priority; all 12 below-fold image instances lazy with dimensions; no image preload list/video/carousel/continuous animation. Approx. 1.9KB inline JS and 17.6KB CSS (4.1KB gzip). No tracking added to prototype.

SEO: noindex,nofollow; no canonical, JSON-LD, sitemap entry, redirects, production navbar/footer link. Build has 10 pages; sitemap and SEO gate retain exactly 9 public production URLs. All original HTML, CSS, JS, sitemap and redirects byte-identical to pre-prototype/security baseline. Existing image binaries untouched.

## Delivery policy and debt

Prototype PR must remain Draft; never merge or publish production. Security release alone was authorized for production. Final Netlify preview checks and direct URL are recorded in the PR and consolidated delivery report.

Prototype-only limitations: contact quote action uses verified email (mailto), no new form backend; product links scroll within this page; project links use current /du-an/; no future portal/solution/detail routes. Real iOS safe-area behavior and OS reduced-motion emulation were not device-tested; CSS rules and browser geometry inspected. No Lighthouse score is claimed. Library image context/title remains generic and does not assert a named customer relationship. Hero fallback retained for CEO review.

Preview host: CSS reserves an extra bottom gap when the Netlify review iframe is present, avoiding toolbar/consultation overlap. Prototype still does not alter Netlify settings or production UI.

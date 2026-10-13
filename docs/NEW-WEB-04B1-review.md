# NEW-WEB-04B1 — Tem Nhãn V3 review

STACKED V3 DEVELOPMENT PR
DO NOT MERGE TO MAIN

## A. Stack / Git

PR #8 was verified OPEN/DRAFT/MERGEABLE, base `codex/ist-homepage-v3-candidate`, head `codex/ist-product-portal-foundation`, exact head `abf39a6ee0d70ba9d538ad636f3acf8e23b7e6ce`, with successful Netlify Preview. It was marked Ready and merged using a normal two-parent merge commit into the approved parent only: `250ac1702494ba3c4e0f3048f3830577fd1fca86`. The child branch was retained. PR #7 remains OPEN/DRAFT/unmerged.

New worktree: `I:\ist-web-v3-tem-nhan`; branch `codex/ist-tem-nhan-v3`; base `250ac1702494ba3c4e0f3048f3830577fd1fca86`. Previous worktrees were not edited. Production main remains `4756a2dd5f67889a63c384bd2b7e7be53e5da6e2`.

## B. Hero

One H1: IN TEM NHÃN. Shared ProductHero uses an existing real IST finished-label photograph. Primary “Tính giá ngay” targets #calculator; secondary “Nhận tư vấn” targets #contact. Locked V3 typography, orange accent, light background and spacing remain shared.

## C. Calculator preservation

Pricing config, engine, original calculator client, original parity test and tracking bridge are byte identical to the parent. Original field IDs, empty numeric defaults, bounds, paper/no-film defaults, option keys/order, popup content, reset, export routines and categorical tracking are preserved. No business logic was changed.

Browser vector: 50 × 50 mm / decal giấy / không cán màng / 1,000 => **312.800 ₫**, unit **313 ₫**. Popup opens, closes and resets to original defaults. Additional browser vector 45 × 30 / plastic / glossy / 750 => 239.909 ₫. Official pricing parity remains 11/11.

## D. Calculator visual integration

Calculator follows hero immediately. Desktop uses form + result panel; mobile uses one vertical flow. Labeled fieldsets provide dimensions, material, quantity and finishing; result shows unit and total separately. Numeric inputs support numeric keyboard; minimum control height is 56px. Result is not sticky.

A UI-only helper observes the existing popup state to make the background inert, wrap Tab/Shift+Tab and restore focus after close. The shared FloatingContact observer now handles all contact-area markers; the Tem calculator marker hides the floating button while any calculator area is visible. This fixes a real mobile overlap without touching pricing or other page visuals.

Original image-export handler completed with success status and no console error; browser automation did not receive a download event, so a physical saved PNG was not independently verified. Original export logic and capture styles remain unchanged.

## E. Gallery / content

Flow: hero → calculator → verified uses → 3 curated real samples → verified materials/finishing → compact 4-step process → 6 original FAQs → V3 contact → footer. No carousel. FAQ text is shared with the existing FAQ component through a data file. No new durability, waterproofing or certification claims.

## F. Images / provenance

All selected images already exist in the repository; no new download, AI, stock asset or Drive write.

| Purpose | Existing repository asset | Intrinsic size | Bytes | Crop |
|---|---|---|---:|---|
| Hero | public/images/sp-tem-nhan/tem-nhan-003.webp | 1211 × 911 | 118454 | ProductHero cover |
| Custom shape sample | public/images/sp-tem-nhan/tem-nhan-002.webp | 1211 × 911 | 34604 | 43% 50% |
| Transparent round sample | public/images/sp-tem-nhan/tem-nhan-004.webp | 1215 × 911 | 39272 | 42% 48% |
| Label sheet sample | public/images/sp-tem-nhan/tem-nhan-001.webp | 683 × 911 | 60648 | 65% 45% |

Original repository WebP files are unchanged. One priority hero; all three gallery images lazy with dimensions and meaningful alt text. Desktop staggered grid, mobile vertical layout. Similar unused samples were omitted.

## G. Product / Hub integration

Home Quick Portal and /san-pham/ retain /tem-nhan/. Existing destinations remain unchanged. ProductLayout, ProductHero, Media, V3 navbar/footer/FloatingContact and ContactCta are reused. Optional layout class and hero caption retain their existing defaults for Signs.

## H. SEO

Existing title, description, canonical /tem-nhan/ and OG image retained. Sitemap stays at 10 URLs, byte identical to parent. No new route or prototype. Legacy six HTML outputs, robots and redirects are byte identical. Existing Home/Hub/Signs markup and CSS are unchanged apart from equivalent generated CSS filename aliases and the contact observer extension.

## I. Tracking / privacy

Original calculator bridge emits only categorical events. No dimensions, quantity, calculated prices, customer information or free text added. Semantic tests exercise production and preview environments, including the actual shared bridge. Preview has zero GA4 loader. Shared CTA runtime tests cover all four V3 pages.

## J. Responsive / accessibility

Local 4 V3 routes checked at 1440/1024/768/430/390/375/320: no horizontal overflow, clipped controls/media or undersized V3 touch controls. Full scroll screenshots and image-load checks recorded. Calculator vector, popup fit, close and reset verified at all seven widths. Contact suppression rechecked at all widths after the overlap fix; consultation opens below calculator. Keyboard popup wrap, Escape, focus return, FAQ Enter and mobile menu Escape verified. No browser console errors/warnings.

## K. Pricing / regression / performance

Build: 10 pages. Required SEO, redirects (13/13), tracking, projects, homepage, product portal, new Tem semantic test, Tem pricing (11/11), Hoa Don pricing (31/31) pass. Audit full/runtime: 0/0. No dependencies or lockfile changes.

Local legacy smoke: /hoa-don/, /combo-mo-quan/, /du-an/, /blog/ and both articles. Hoa Don A6 / 2 liên / 40 cuốn remains 600.000 ₫ with working price table. Legacy smaller link/menu targets are inherited and outside this Tem redesign.

Tem route script bundle: 14,125 → 12,811 bytes, gzip 5,271 → 4,938 (1,314 bytes smaller). Removed obsolete lightbox integration; added small UI-only modal helper. html2canvas library unchanged except its generated importing-bundle hash alias; original export behavior preserved. Shared legacy, Home and Product CSS contents unchanged. One hero priority, gallery lazy, no framework/video/carousel added.

## L. Files

Tem page, calculator UI and scoped CSS; new modal UI helper and shared FAQ data; optional ProductLayout class and ProductHero caption; FloatingContact marker handling; tracking test expanded to Tem; new test:tem-page command/script; this review document. Pricing config/engine/client and package lock remain untouched.

## M. Draft PR

Title/commit: `feat(web): rebuild tem nhan product page`. Base `codex/ist-homepage-v3-candidate`; head `codex/ist-tem-nhan-v3`. Keep Draft for CEO review. Do not merge child or parent to main.

## N. Preview verification

Preview URL and final deployment evidence will be recorded in the PR after the exact commit deploys. Required checks: four V3 routes, six legacy routes, 10 sitemap URLs, unknown/prototype 404, no GA4, 1440/390/320 browser QA and remote 312.800 ₫ popup/reset. Production remains unchanged.

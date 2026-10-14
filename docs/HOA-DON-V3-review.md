# Hóa đơn & biểu mẫu V3 — review

STACKED V3 DEVELOPMENT PR
DO NOT MERGE TO MAIN

## Scope and stack

Implements the supplied flow on existing `/hoa-don/`: Product Hero → pricing calculator → uses → real samples → production notes → FAQ → contact CTA. Based on Tem V3 commit `01a70f7aacba421a575d76e9c8294d558c6a54f9`, branch `codex/ist-hoa-don-v3`, worktree `I:\ist-web-v3-hoa-don`. Tem PR #9 is not merged or modified. Parent PR #7 and production main remain unchanged. No new routes, backend, dependencies or framework.

## Product and calculator

H1: IN HÓA ĐƠN & BIỂU MẪU. Primary “Tính giá ngay” goes to #calculator; secondary “Nhận tư vấn” goes to #contact. Uses existing shared ProductLayout, ProductHero, Media, navbar/footer/FloatingContact and ContactCta.

Calculator immediately follows hero. Desktop has three selectors in one row and one result panel below; mobile stacks selectors and result. Unit price and total have separate rows, followed by original production note and “Nhắn Zalo” / “Bảng giá số lượng”. FloatingContact is suppressed throughout calculator using the existing shared marker.

Original pricing config, engine and calculator client are byte unchanged. Select IDs, keys, order, defaults and dependent quantity resets are preserved: A5 / 1 liên / 5 cuốn by default, 150.000 ₫. Existing config supports A4/A5/A6 and **1/2 liên**; no invented 3 liên option or custom quantity input. Zalo quote text and categorical tracking stay in the original client.

Original quantity-table markup targets and event handlers remain. Its UI is restyled light V3; generated original Tailwind rows are restyled with scoped CSS. A small UI-only helper observes existing aria-hidden state for focus, inert background, Tab wrap, Escape via the existing close button, scroll lock and focus return. No price calculation is added to the helper.

Browser vectors: A6 / 2 liên / 40 cuốn = 15.000 ₫ per cuốn, **600.000 ₫** total. Table highlights ▶ 40 cuốn. A4 / 1 liên / 100 cuốn = **2.800.000 ₫**, no clipping at 320px. Switching to 2 liên resets quantity to 5 and yields **350.000 ₫**, preserving original behavior.

## Verified content and media

Uses, production notes and four FAQs come from existing hero/benefits/FAQ and pricing config. Original FAQ wording preserved in a shared data file. Production notes retain fixed quantity milestones, one-color blue/red/black printing, perforated tear line and book finishing. No carousel or legacy gallery/lightbox script attached.

All photos are existing repository WebP assets showing blank sample forms, not completed transaction records. Originals are unchanged.

| Purpose | Repository path | Intrinsic dimensions | Bytes | Presentation |
|---|---|---|---:|---|
| Hero | public/images/hoa-don/hoa-don-a5-xanh-03.webp | 2560 × 1920 | 277872 | Cover, position 50% 60%, priority |
| A4 sample | public/images/hoa-don/hoa-don-a4-do-01.webp | 960 × 1280 | 76490 | Portrait 3:4, lazy |
| A5 sample | public/images/hoa-don/hoa-don-a5-xanh-04.webp | 960 × 1280 | 83218 | Portrait 3:4, lazy |
| A6 sample | public/images/hoa-don/hoa-don-a6-xanh-02.webp | 960 × 1280 | 68588 | Portrait 3:4, lazy |

Desktop uses three sample columns; mobile uses a vertical gallery. Alt text and intrinsic dimensions supplied; one priority hero, all three samples lazy. No stock, AI or new image download.

## SEO, privacy and integration

Original title, meta description, /hoa-don/ canonical and OG image retained. Sitemap stays 10 URLs and byte matches parent. Home/Hub continue to link /hoa-don/ without source changes. Shared CTA runtime tests extended to the fifth V3 page. No dimensions, customer information, prices or free text added to analytics. Original categorical calculator bridge preserved; no GA4 loader on local/Preview hosts.

Other nine route outputs have unchanged markup/scripts after normalizing the generated shared Tailwind stylesheet hash. The shared CSS changes only through regeneration after removing obsolete invoice utility classes; no shared source stylesheet was edited. Browser regression confirms the other routes. Sitemap/robots/redirects are byte unchanged.

## Verification

Build 10 pages; SEO, redirects 13/13, tracking, projects, homepage, product portal, Tem page, new invoice page test PASS. Official Hoa Don pricing 31/31 and Tem pricing 11/11 PASS. Full/runtime npm audit 0/0. Package lock unchanged.

`test:hoa-don-page` verifies one H1, V3 shell, unique calculator/popup IDs, original options/defaults, requested section order, discovery links, original SEO, sitemap10 and image loading attributes. It exercises the actual original browser client with dependent select transitions, 600.000 ₫ output, table opening/active row/closing and categorical payloads. Locked normalized config/engine/client hashes guard against business logic edits.

Local invoice QA at 1440/1024/768/430/390/375/320: no horizontal overflow, clipped price/controls, or undersized V3 controls. Quantity-table open/close and 600.000 ₫ vector at all seven widths. Tab/Shift+Tab, Escape/focus return, maximum value at 320 and native FAQ Enter checked. All images load; no console errors/warnings. Four existing V3 routes checked at 1440/390; five legacy routes/articles smoke checked at 390. Tem representative result remains 312.800 ₫. Unknown/prototype routes return 404.

Invoice route JS bundle: **9,128 → 7,438 bytes**, gzip **3,101 → 2,678**. Legacy carousel/lightbox detached; UI helper added. No dependency increase.

Full-page CDP screenshot timed out once; viewport screenshots of hero, calculator, table and page scroll were used for visual QA instead.

## Review delivery

New stacked Draft PR base: `codex/ist-tem-nhan-v3`; head: `codex/ist-hoa-don-v3`. Exact Preview deployment and final remote QA, when available, are recorded in the PR. Keep Draft for review; do not merge child, Tem PR #9 or parent PR #7 into main.

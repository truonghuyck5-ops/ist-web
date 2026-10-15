# NEW-WEB-02R1 visual refinement review

Date: 2026-10-13. VISUAL PROTOTYPE ONLY / NOT FOR PRODUCTION MERGE.

Baseline prototype head: `109485fdc486aee3a133017e6c412ef7d452d2b2`. Same branch `codex/ist-portal-v3-prototype`, same worktree `I:\ist-web-v3`, existing Draft PR #6. Production baseline: `4756a2dd5f67889a63c384bd2b7e7be53e5da6e2`.

## A. Hero curation

CEO-authorized source: [CEO_DROP / Sản phẩm IST](https://drive.google.com/drive/folders/14cGmmHDhUWpnLAjiLah8_1jGCSpUcdrM), advertising folder. Inspected signage, raised letters, lightboxes and combo project folders, including Quyên Coffee, Đen Đá Coffee, Mia Wedding and nbeauty. Originals inspected as contact sheets, finalists at full image size and desktop/tablet crops. Installation scenes with identifiable people, vehicles/plates, chat screenshots and clutter were excluded. No AI or stock image.

Top three, in order:

| Rank | Original / context | Resolution | Assessment |
| --- | --- | --- | --- |
| 1, selected | [Round illuminated lightbox](https://drive.google.com/file/d/1XrPlAzjr87zG5_x5EyTMXXLtbjHmyVg7/view), Quyên Coffee source folder; `z2536528442572_ae0db30534815a7fd2a4e7697c89a8ee.jpg` | 2560 × 1650 | Strong single physical product, clear light and silhouette, no people or private records. Crop at 25% 50% keeps the full sign across desktop, tablet and mobile. Workshop shelves remain as authentic context, with less competing detail than installation shots. |
| 2 | [Installed illuminated wall sign](https://drive.google.com/file/d/1ZpEnjH82JzEYNPMJ4AijFcAwpZAGcwIk/view); `z3962054567656_b6930114d5bcd488835c561f0beeb6f4.jpg` | 1920 × 2560 | Finished, clean, no people; much empty wall/furniture makes the product smaller in the desktop frame. Weaker focal scale than candidate 1. No clinical/customer claims are used. |
| 3 | [Signage/lightbox group at workshop](https://drive.google.com/file/d/1vgs9JcpB8HRBN0kaig3wNI1kBA8G92YK/view); `z2433230069525_08f5debccdf68115c9d9a7dbbddb534c.jpg` | 2048 × 1536 | Real advertising execution and warm lighting, no people; multiple subjects and long lettering compete, square crop cuts parts of the products. |

Old storefront remains the fallback source, unchanged at `/images/home/home-hero-001.webp`. The round product is preferred because it is substantially more dominant in the hero than the original storefront and the other finalists.

## B. Selected asset and provenance

- Source chain: CEO_DROP / Sản phẩm IST / @- Quảng Cáo / @khách làm combo / 13- Quyên Coffee (10-06-2021).
- Source folder: `161AP06MU9UXeTGFZ1jbpiPM95Xmmo8eJ`; file ID `1XrPlAzjr87zG5_x5EyTMXXLtbjHmyVg7`.
- Original: 2560 × 1650 JPEG, 1,242,960 bytes; untouched in Drive and local QA storage. Folder/date are provenance, not an asserted project completion date.
- Web copy: `/images/portal-v3/ist-round-lightbox.webp`, 1600 × 1031, 169,400 bytes (165.4 KiB), WebP quality 82. Resize/encode only; no retouching or generated detail. Approx. 86.4% smaller than source.
- CSS: `object-fit: cover`, `object-position: 25% 50%`. Retained frame ratios: desktop 1/1.05; tablet 1.65; mobile 1.25. No breakpoint-specific replacement image.
- Alt: `Hộp đèn tròn phát sáng đặt tại xưởng IST`. No invented customer/place/completion claim.
- Original SHA-256: a571f49597d047d3bbe1b785ffbf80511aaddbea4f18222e5761e2a58c8aeca8.
- Web copy SHA-256: 750a6de624a93622f66514ab83e13383c51866cdb72cf58dfd406a73bc2f1430.

## C. Copy and caption

H1 unchanged: `THIẾT KẾ.` / `IN ẤN.` / `QUẢNG CÁO.`. Support unchanged: `Từ ý tưởng đến sản phẩm hoàn thiện.`

Description: `In ấn, bảng hiệu và giải pháp quảng cáo.` / `IST tư vấn, thiết kế, sản xuất và thi công.`

Left caption: `HỘP ĐÈN QUẢNG CÁO IST`, matching the product photograph. Right: `SẢN XUẤT TRỰC TIẾP ↗`; removes the location lock.

## D. Header

No micro adjustment. Existing logo scale, header height, navigation alignment and orange CTA proportion remain balanced. No CSS, token, IA or section changes.

## E. Responsive and interaction QA

Browser widths: 1440 / 1024 / 768 / 430 / 390 / 375 / 320. Local screenshots and DOM geometry recorded per width.

- Hero product/copy/captions: intact, no clipped sign or heading; captions stay on one line each, including 320px.
- Hero: two columns at 1440/1024, stacked at 768 and below; original architecture and typography retained.
- Portal: 3 columns at 1440, 2 at every smaller tested width. Explorer, projects, production proof, process, final CTA and footer inspected.
- No horizontal overflow or heading clipping; all 13 images load after visiting the sections. Sticky header stays at top 0. Anchor targets clear it by 112px desktop/tablet or 90px mobile.
- Contact: 380px desktop panel at 1440/1024/768; full-width bottom sheet at 430/390/375/320. Sheet fits 850px height. Open, initial close-button focus, reverse/forward focus cycle, Escape, close and focus return PASS; scroll lock removed on close.
- Mobile menu and same-page links retain existing behavior. No external contact message/form was submitted.

## F. Accessibility and performance

One H1 and existing H2/H3 hierarchy. Focus outline and native dialog behavior preserved; modal close 44px, contact links 58px, primary CTA/menu targets at least 44px. Existing reduced-motion rules unchanged. No JS, dependency, framework, animation, font or carousel added.

Hero has intrinsic 1600 × 1031 dimensions, eager loading and high fetch priority; all 12 below-fold images remain lazy with dimensions. Old storefront and every production image remain unchanged. This is browser QA, not physical iOS or OS reduced-motion testing; no Lighthouse score is claimed.

## G. Regression and isolation

PASS: `npm run build` (10 static pages), `test:seo` (9 public URLs), `test:redirects` (13/13), `test:tracking`, `test:projects`, `test:tem-pricing` (11/11), `test:hoa-don-pricing` (31/31), `npm audit` (0), `npm audit --omit=dev` (0), `git diff --check`.

All 11 original output records (HTML/sitemap/redirects) and all 5 original built CSS/JS assets match the verified security baseline byte for byte. Production source/config/navigation/SEO and lockfile are untouched. Prototype remains noindex,nofollow, has no canonical, is excluded from the 9-entry sitemap and is not linked from production nav.

## H. Commit policy

Commit message: `fix(web): refine portal v3 hero visual`. Push only the existing prototype branch. Delivery SHA and Netlify deployment identity are recorded in the PR and final report after push. PR #6 stays Draft; no Ready, merge or production deployment.

## I. Review URL

[PR #6](https://github.com/truonghuyck5-ops/ist-web/pull/6) / [Deploy Preview](https://deploy-preview-6--insangtao.netlify.app/__portal-v3/).

Stop after NEW-WEB-02R1; no NEW-WEB-03 implementation.

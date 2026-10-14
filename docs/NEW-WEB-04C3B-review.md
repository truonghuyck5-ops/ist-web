# NEW-WEB-04C3B — In Nhanh V3 review

STACKED V3 DEVELOPMENT PR
DO NOT MERGE TO MAIN

## A. Git

Fresh worktree `I:\ist-web-v3-in-nhanh`, branch `codex/ist-in-nhanh-v3`. Exact fetched parent HEAD/base/merge-base `9d151b8687dde0d41f884d2fda4c99b021dea119`; clean initial state. PR7 remains OPEN/DRAFT/unmerged. Production main `4756a2dd5f67889a63c384bd2b7e7be53e5da6e2` stays unchanged. Previous worktrees/sources retained.

## B. Taxonomy

Only `/in-nhanh/`, exactly five paper product groups: Danh thiếp; Tag giấy; Voucher / Thẻ tích điểm; Tờ rơi / Tờ gấp; Menu giấy. No Catalogue đóng cuốn, Thiệp, Tài liệu, Letterhead, Envelope group. No nested route, calculator, price table, FAQ or turnaround promise.

## C. Hero

One H1 IN NHANH. Approved support: “Ấn phẩm giấy cho kinh doanh, in kỹ thuật số tại IST.” Preferred real business-card image curated at full size; both faces remain visible in a contained V3 frame. Nhận tư vấn / Báo giá→#contact; Xem sản phẩm→#products. ProductLayout/ProductHero/Media and existing shell reused.

## D. Product groups

Five numbered editorial ProductIndex rows, H3 under a clear H2, short verified descriptions, real images with contain. All group CTAs go to #contact. Tag is paper hangtag; promotional/loyalty products are paper; flyers/folded sheets are unbound; paper menu may be bound. No invented gsm, finish, material range, machine performance or plastic membership claim.

## E. Gallery

Five diverse physical examples with generic captions: business card, paper tag, loyalty card, promotional leaflet, spiral-bound paper menu. Asymmetric two-column desktop gallery, one-column mobile, native image ratios. Same selected files reused from groups/Hero; no duplicate exports, carousel or lightbox.

## F. Production proof

Existing Konica photo810×1080. Short in-kỹ-thuật-số copy with verified Konica C2060L name from homeProfile. No speed/rate/resolution/paper size/gsm/certification/capacity/SLA claim. Simple customer-intent uses and four-step consultation/file/print/handover process; shared verified contact facts.

## G. Related products

Tem nhãn→/tem-nhan/ for adhesive labels/stickers; Hóa đơn & biểu mẫu→/hoa-don/; In khổ lớn→/in-kho-lon/ for display/PP/standee menu; Combo mở quán→/combo-mo-quan/. Related links keep the other product groups separate from In Nhanh.

## H. Images / provenance

Four selected new WebPs plus approved tag and existing machine. Full originals inspected and retained outside repository; original Drive files unchanged. No AI/stock/retouch/upscaling. EXIF/RGB/WebP83, longest edge1400; useful alt/intrinsic dimensions. Full IDs/folders/source/output dimensions/crops/bytes/SHA256 and rejected-source rationale in [image provenance](NEW-WEB-04C3B-images.md).

## I. Home / Hub

Quick Portal: In nhanh / Danh thiếp · tag · voucher. Explorer and Hub: In nhanh / Danh thiếp · tag · voucher · tờ rơi. All link /in-nhanh/ with view_service; Hub CTA Khám phá sản phẩm. Existing in_nhanh token retained. Six-entry discovery layout, media, primary navigation, Footer, global CSS/scripts unchanged.

Legacy discovery audit: homeServices has no quick-print item and its old Services component is detached from current Home; products has no quick-print item/current page consumer. productMenu remains the legacy six-service dropdown used on legacy pages; no stale In Nhanh entry exists to fix. Current discovery is handled by Home/Hub, so no extra legacy item is added solely for completeness. All three datasets remain byte unchanged; no unrelated cleanup.

## J. SEO / sitemap

Unique In nhanh — Danh thiếp, Tag & Ấn phẩm giấy | IST title/description and production canonical /in-nhanh/. OG/Twitter via existing SEO. Sitemap exactly13 URLs, adds only /in-nhanh/. Redirects/robots unchanged. No Product/review/rating schema, .html redirect or nested route. Unknown/prototype/nested local URLs404.

## K. Tracking / privacy

Existing categorical service_cta_click/zalo_click/phone_click contract. New group/Hero/production events use in_nhanh; related uses destination-service tokens. Runtime tests exercise all eight V3 pages, confirm production payload allow-list and Preview gating. No printed brand, customer/artwork text, quantity/price/input/contact PII. Original tracking and both calculator engines/configs/clients byte unchanged.

## L. Responsive / accessibility

Full Home/Hub/In Nhanh viewport scroll QA1440/1024/768/430/390/375/320 PASS: no horizontal overflow, clipped headings/content, broken media or console warning/error. One H1, one priority Hero; all remaining images lazy. Paper recognition/edges retained with contain/native ratios; desktop/mobile screenshot walks reviewed.

Visible controls≥44px both dimensions (closed menu descendants excluded); open mobile menu54px tall. Real Quick Portal/Explorer/Hub mobile navigation verified. #products/#contact land about90px below viewport top. Keyboard consultation: Enter opens with close focus, ShiftTab wraps to last link, Escape closes and restores trigger focus; focus-visible checked. Shared reduced-motion rules unchanged; new scoped CSS introduces no animation.

## M. Security / regression

Fresh npm ci; build13. Full semantic gate set plus test:in-nhanh-page PASS. Tem pricing11/11; Hóa Đơn31/31; browser totals312.800₫ and600.000₫, Tem reset and invoice Escape verified. npm audit0; npm audit --omit=dev0. No dependency/lock change.

All five prior V3 products and all five legacy routes, including two articles, inspected desktop/mobile; one H1/no overflow/no GA4/no console warnings/errors. Ten existing page HTML files byte unchanged against baseline. Home/Hub byte equivalent after replacing only the three intended In Nhanh discovery rows; existing CSS/scripts byte unchanged. Existing redirects/robots unchanged. Local13URLs200 and seven unknown/prototype/nested URLs404. git diff --check PASS before staging; staged check is required before commit.

## N. Draft PR / exact-head Preview

Create Draft PR `feat(web): add quick print product page` into `codex/ist-homepage-v3-candidate`, never main. Automatic Netlify Preview must match pushed HEAD; final deploy ID/SHA/URL and Preview QA are recorded in the PR body and local QA evidence after deployment. Verify eight V3 plus five legacy routes, sitemap13, no GA4, Home/Hub/In Nhanh full1440/390/320, representative calculators and404 boundaries. Stop for CEO review after Preview PASS; no merge or follow-on redesign.

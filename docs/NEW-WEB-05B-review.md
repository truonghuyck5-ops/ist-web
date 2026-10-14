# NEW-WEB-05B — Projects V3 review

STACKED V3 DEVELOPMENT PR
DO NOT MERGE TO MAIN

## A. Stack integration

PR14 verified OPEN/DRAFT/MERGEABLE/CLEAN, expected head 03d65ea70fba53fe4dbbff424a714eaf5c2ef832/base codex/ist-homepage-v3-candidate. Fresh 15 gates, pricing11/11 and31/31, audits0/0, exact Preview deploy6acefe856222969891ad8322 metadata and HTTP14/sitemap14 revalidated; existing browser proof remains tied to unchanged approved SHA. Marked Ready, normal merge into parent at **a54fd1a6da3df6911f4b8a125233d20723c2aa4c**, 2026-10-14T04:36:42Z. Parents5692de6dc12a59add194e20b3688ee120af2574e and03d65ea; merged tree e9b6298a3b810c719d6b72565501249f3dedf2f2 equals approved head. Branch retained. All ten approved V3 routes present. PR7 OPEN/DRAFT/unmerged; main and production remain **4756a2dd5f67889a63c384bd2b7e7be53e5da6e2**.

## B. Git

Fresh worktree **I:\ist-web-v3-projects**, branch **codex/ist-projects-v3**, exact initial HEAD/merge-base a54fd1a6da3df6911f4b8a125233d20723c2aa4c; initial worktree clean. Fresh npm ci and baseline build14. Previous worktrees untouched. Commit/PR title: feat(web): rebuild projects portfolio page. Stacked Draft PR base parent, never main.

## C. Projects Hero

Existing /du-an/ rebuilt with ProductLayout, ProductHero and the shared V3 shell. H1 **CÔNG TRÌNH / THỰC TẾ** chosen for a concise balanced two-line heading; eyebrow CÔNG TRÌNH / THỰC TẾ. Approved support only: Một số hình ảnh và phần việc trong các hạng mục IST đã triển khai. Xem công trình→#projects-list; Nhận tư vấn→#contact. No new ProjectLayout needed for one page.

## D. Editorial listing

Four semantic article/figure rows, desktop image60%/copy40% with alternating alignment; mobile image-first single column. Metadata, existing H2 title, summary, IST thực hiện/service and destination link. Large photos preserve the complete signage through native ratio/contain; generous space and small image-enlargement action. No dark card grid, filter/search, statistics, testimonial/logo wall or customer case narrative.

## E. Project data preservation

src/data/featuredProjects.js byte unchanged. Exact titles/order: Bảng hiệu cửa hàng / hộ kinh doanh; Bảng hiệu Mỹ Phẩm Nbeauty; Hệ thống bảng hiệu Tongwei; Bảng hiệu Viettel Warehouse. Four listingVisible=true; every detailEnabled=false. Bảng hiệu cơ quan and Trang trí hội trường, sự kiện remain hidden. Internal kind/visibility/detail fields never displayed. No invented date, location, material, scale, value, relationship or result. Four approved assets byte unchanged; [hashes/provenance](NEW-WEB-05B-images.md).

## F. Lightbox

Reused actual project-lightbox.client.js behavior; only added a CSS class for scoped V3 restyling. Real asset href remains without JavaScript/native dialog support or if showModal fails. Modifier clicks preserve normal browser behavior. Native modal has one image, close control, Escape, Tab/ShiftTab containment, scroll lock and focus return; no cross-project navigation/carousel/dependency. Dedicated gate executes actual script with VM fixtures for unsupported/failed/modified-click/success/close paths. Real browser: four images × seven local widths PASS, full image ratio/containment, keyboard and focus restoration. Control-click fallback opened the actual1215×911 file successfully.

## G. Related service

Small BẢNG HIỆU QUẢNG CÁO bridge→/bang-hieu/ describes only these current signage examples. Each of four service links reads serviceHref from source; compatible destination token resolved from existing productGroups. Shared ContactCta: CẦN HẠNG MỤC / TƯƠNG TỰ? with approved support and verified Zalo/phone/email. No backend.

## H. Navbar / Home / Footer

Desktop/mobile Công trình→/du-an/ across all eleven V3 routes. Existing normal navigation remains untracked. Home featured-project component/data/media/output remains equivalent with four selected projects and Xem tất cả công trình→/du-an/. Footer already correct and byte unchanged. Actual desktop/mobile navigation, Home CTA, hero anchor and service-link clicks verified. Shared FloatingContact keyboard/focus/Escape verified.

## I. SEO / sitemap

Existing title Công trình đã thực hiện | In Sáng Tạo, full description, canonical https://insangtao.net/du-an/ and default social image preserved. Exactly one H1; project titles H2. Sitemap remains14, route already existed. No detail routes, new redirects, Local SEO or invented Project/client/review/rating schema. Unknown/prototype and all nested project routes return HTTP404 locally. Local Astro returns an empty404 response and Chrome displays ERR_BLOCKED_BY_CLIENT; this is recorded separately from valid-route browser QA, with response status verified by HTTP.

## J. Tracking / privacy

Existing service_cta_click/zalo_click/phone_click plus compatible view_projects/view_service/quote_request actions. Existing project_card/home_featured_projects locations retained; projects_hero/projects_related categorical locations added. No title, customer, caption, image filename, free text or PII in event payload. Real delegated tracking VM now covers eleven V3 routes, production/Preview gating and allow-list. Actual client/config untouched. Preview/local no GA4 loader.

## K. Responsive / accessibility

Full Home and Projects walk at1440/1024/768/430/390/375/320: all images loaded, no horizontal overflow/clipped headings, one H1, one priority photo/page, visible controls≥44px, no valid-route console warnings/errors. Native lightbox all4 at eachwidth contains full image and returns focus. Shared visible focus, menu/contact accessibility and reduced-motion rules retained. Scoped Projects CSS adds no animation; OS preference emulation not claimed. Contact line break scoped only to Projects.

## L. Performance / security

No dependency/framework/carousel/video or new page behavior. Only the existing minimal native-lightbox script runs. Intrinsic source dimensions, one eager/high photo and three lazy. package-lock, dependency versions, analytics/calculator clients/configs unchanged. Fresh npm audit and npm audit --omit=dev both0 total vulnerabilities, including0 High/Critical.

## M. Regression / files

Build14 + all sixteen gates PASS: existing fifteen plus test:projects-page (semantic data/order/hidden/navigation/SEO/routes and actual lightbox behavior). Tem11/11, Hóa Đơn31/31; actual browser312.800₫/600.000₫, Tem reset and Hóa Đơn Escape verified. Representative nine other V3 routes plus Blog/two articles at1440/390 PASS, completing eleven V3 and three legacy routes with full Home/Projects. Thirteen prior page HTML outputs differ only in authorized Navbar destinations and the global Tailwind stylesheet filename: six removed legacy spacing selectors are proven unused by those pages; remaining CSS rules exactly equal. Home/Product/Solution/global source CSS, Footer, data/assets, calculator engines/configs/clients, tracking, redirects/robots unchanged. Old ProjectCard and legacy sources retained.

Changed: route, new ProjectFeature/projects-v3.css, Navbar twohrefs, existing lightbox class, package script, tracking/solution test coverage, new projects-page gate, two review/provenance documents. git diff --check PASS; standalone staged check required before commit.

## N. Draft PR / Preview

Push codex/ist-projects-v3 and create Draft PR against codex/ist-homepage-v3-candidate. Automatic exact-head deploy required; no manual production deployment or settings change. Final PR URL, SHA, deploy ID and Preview validation are recorded in the PR body and local QA evidence after deployment: all14routes, sitemap14, nested404, no GA4/errors/warnings, full Home/Projects1440/390/320, native lightbox/fallback and calculators. STOP for CEO review after Preview PASS. PR7 stays OPEN/DRAFT/unmerged; main/production unchanged.

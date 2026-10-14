# NEW-WEB-05A — Solution foundation review

STACKED V3 DEVELOPMENT PR
DO NOT MERGE TO MAIN

## A. Stack integration

PR13 verified OPEN/DRAFT/MERGEABLE/CLEAN, exact head b9024b20b3b3bb122ee874408ac8e00a1799e783 and correct parent base. Full existing gates/Tem11/11/Hóa Đơn31/31/audit0/0 rechecked; unchanged exact-head Preview13 metadata/sitemap13/all13HTTP routes revalidated, prior full browser evidence tied to that SHA retained. Marked Ready, normal merge into codex/ist-homepage-v3-candidate at **5692de6dc12a59add194e20b3688ee120af2574e** (2026-10-14T03:35:20Z). Merge parents are9d151b8 andb9024b2; merged tree exactly equals approved head tree a591668c41c3bbc76a8067cddb35b7338f7dc0df. Branch retained. Parent now contains all eight locked V3 routes. PR7 remains OPEN/DRAFT/unmerged; main/production stay4756a2dd5f67889a63c384bd2b7e7be53e5da6e2.

## B. Git

Fresh worktree I:\ist-web-v3-solutions, branch codex/ist-solution-foundation, exact HEAD/merge-base5692de6dc12a59add194e20b3688ee120af2574e; clean initial state. Fresh npm ci/build13 before edits. Previous worktrees/components retained.

## C. Solution Hub

New /giai-phap/, H1 GIẢI PHÁP, approved need-based support. One active solution “Tôi chuẩn bị mở quán”→/combo-mo-quan/. Two consultation entries “Tôi cần làm mới cửa hàng” and “Tôi chuẩn bị khai trương / sự kiện”→#contact, supported by existing store decoration/signage and banner/standee/event copy. No thin/future routes. Editorial scenario/featured-photo presentation distinct from Product Hub. Consultation avoids suggesting unbuilt dedicated solution pages.

## D. Combo Hero

Existing /combo-mo-quan/ rebuilt as V3 Solution; H1 BỘ NHẬN DIỆN CHO QUÁN MỚI, eyebrow GIẢI PHÁP / MỞ QUÁN. Source-supported business-goal introduction. Existing approved completed bakery signage/frontage photo replaces generic workshop photograph. Primary Nhận tư vấn→#contact; secondary Xem hạng mục→#solution-items. Source captions describe individual physical evidence, not an invented full Combo customer case.

## E. Solution items

Six numbered preparation items: Bảng hiệu mặt tiền; Menu giấy / bảng giá giấy; Tem nhãn; Voucher / thẻ tích điểm; Decal kính / trang trí; Standee / banner khai trương. Short descriptions explain purpose within opening a business, not product technical specifications. Selection is tailored to model/budget/need, not a mandatory fixed kit. Old Menu/Voucher invoice illustrations are detached; individual real-item photos provide appropriate proof.

## F. Implementation levels

KHỞI ĐỘNG / ĐỒNG BỘ / TOÀN DIỆN are suggested implementation scopes based on existing conceptual tiers; no fixed inclusions or quantity package. Legacy comboPackages prices1.990K/4.990K are unverified current business pricing and not imported/rendered. No invented prices, “Phù hợp nhất”/best/popular badge or pricing disclaimer carrying old figures. Original legacy package data/components retained for reference, detached from active route.

## G. Product links

Preparation routes exactly /bang-hieu/, /in-nhanh/, /tem-nhan/, /in-nhanh/, /in-kho-lon/, /in-kho-lon/. Separate related section links the five relevant Product routes including /tui-xop/, with tùy mô hình và nhu cầu wording. Paper menu/voucher stay In Nhanh; decals/display/banner stay In Khổ Lớn. No product redesign or duplicate product catalogue.

## H. Process / FAQ

Five concise verified steps: Tư vấn nhu cầu / Chốt hạng mục / Thiết kế đồng bộ / Sản xuất / Bàn giao–Thi công. Installation conditional by item; no promise to install all items onsite or meet a fixed date. Six legacy FAQs audited: five retained/adapted, time/speed answer excluded. Logo assistance scope clarified and installation conditional. Native details keyboard Enter/Space opens/closes; no page-specific JS/lightbox/carousel. Old combo interactions source retained but detached.

## I. Images / provenance

One selected new Drive label WebP; approved storefront, paper-menu and decoration files reused byte unchanged. Originals preserved; real IST imagery only, no AI/stock/private filled records/unapproved portrait/retouch/upscaling. EXIF/RGB/WebP83, intrinsic dimensions, one priority visual/page, other images lazy. [Full provenance and rejected-source audit](NEW-WEB-05A-images.md). Samples come from separate jobs and are not presented as one completed Combo project.

## J. Navbar / Home / Footer

V3 Navbar Giải pháp→/giai-phap/ desktop/mobile across all ten V3 pages, meaningful categorical tracking. Home Quick Portal remains six entries and Mở quán→/combo-mo-quan/; Home main/layout/media unchanged. Footer Giải pháp→/giai-phap/ and Combo mở quán→/combo-mo-quan/. No dropdown or nonexistent Solution links. SolutionLayout is a small wrapper over existing ProductLayout/BaseLayout/shell, adds scoped two-page presentation; no independent site shell or unnecessary component hierarchy.

## K. SEO / sitemap

New unique Hub title/description/canonical/OG/Twitter; Combo existing title/description/canonical retained exactly, OG image updated to selected storefront. Sitemap14 adds only /giai-phap/, existing Combo already counted. No /giai-phap/mo-quan/, Offer/Product/review/rating schema, Local SEO rewrite or new redirect. Existing redirects/robots unchanged; unknown/prototype/future/nested Solution paths404 locally.

## L. Tracking / accessibility / security

Existing service_cta_click/zalo_click/phone_click and generic view_service/quote_request vocabulary, existing combo_mo_quan token for solution-specific conversion and product tokens for destination links. Runtime tests cover all ten V3 pages and reject identifying/free-text payloads; production gate preserved, Preview no GA4. Tracking/calculator engines/configs/clients/lock unchanged.

Full Home/Hub/Combo scroll/media QA at1440/1024/768/430/390/375/320 PASS: one H1, no overflow/clipping, all images loaded, priority1/page, visible controls≥44px both dimensions, no console warnings/errors. Keyboard mobile Navbar→Hub→Combo and real Quick Portal verified. Anchors clear sticky header about90px on mobile. Contact panel initial focus/trap/ShiftTab/Escape/focus return and native FAQ Enter/Space checked; shared Hero/contact suppression works. Existing reduced-motion rules unchanged; scoped CSS adds no animation, OS preference emulation not claimed. Fresh npm ci, full/runtime audits0/0; no dependency change.

## M. Regression / files

Build14 and all fifteen semantic/pricing gates PASS, including new test:solution-hub/test:combo-page. Tem11/11, Hóa Đơn31/31, browser totals312.800₫ and600.000₫, reset/Escape verified. All seven representative Product Hub/Product routes plus four legacy routes (Projects/Blog/two articles) desktop/mobile PASS.

Eight locked Home/Product pages differ only in requested shared Navbar/Footer and a bundler stylesheet filename alias with exactly equal CSS bytes. Main content/layout/styles/scripts protected. Four remaining legacy outputs equal baseline after the identical-byte CSS filename alias; no content/nav/behavior changes. Old Combo source/data/components not deleted. Existing redirects/robots/lock/engine/tracking/Home/Product CSS byte unchanged. git diff --check PASS; standalone staged check required before commit.

## N. Draft PR / Preview

Commit/PR title: feat(web): build solution portal and opening package page. Stacked Draft PR base codex/ist-homepage-v3-candidate, never main. Automatic deploy must match exact pushed HEAD. Final PR/deploy ID/SHA/URL and Preview validation will be recorded in PR body and local QA evidence: all ten V3 + four legacy, sitemap14, no GA4/warnings/errors, full Home/Hub/Combo1440/390/320, calculators and404 boundaries. STOP for CEO review after Preview PASS.

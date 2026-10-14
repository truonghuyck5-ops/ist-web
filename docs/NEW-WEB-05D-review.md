# NEW-WEB-05D — Knowledge / Blog V3 review

STACKED V3 DEVELOPMENT PR
DO NOT MERGE TO MAIN

## A. Stack integration

PR16 verified OPEN/DRAFT/MERGEABLE/CLEAN, exact head c1fc658e6039beafcaf1a98decfa86d737b24f0f/base codex/ist-homepage-v3-candidate. Fresh17 gates, existing build15/static routes, Tem11/11, Hóa Đơn31/31, full/runtime audits0/0, exact ready Preview deploy6acf1467c2f868a45ec5084a and HTTP15/sitemap15 revalidated. Prior full browser proof remains tied to unchanged approved head. Marked Ready and normally merged into parent at **b2f57c1bb64c7a90ec953000a35965935364f9ce**, 2026-10-14T06:26:36Z. Parents9da1ba8526de3d7a53fcec3547ada77f46d72f26 andc1fc658e; merged tree07b77b33b305d2fadd10e9c1b94921910e24cbb5 exactly equals approved head tree. Branch retained. Parent contains all12 approved V3 surfaces, Blog only remaining legacy UI. PR7 OPEN/DRAFT/unmerged; main/production remain **4756a2dd5f67889a63c384bd2b7e7be53e5da6e2**.

## B. Git

Fresh worktree I:\ist-web-v3-blog, branch codex/ist-blog-v3, exact initial clean HEAD/merge-base b2f57c1bb64c7a90ec953000a35965935364f9ce. Fresh npm ci/build15 baseline before implementation. Prior worktrees untouched. Commit/PR title: feat(web): rebuild knowledge and blog experience. Draft PR against parent, never main.

## C. Blog Hub

Existing /blog/ now light-first V3 ProductLayout shell, eyebrow IST / KIẾN THỨC, H1 KIẾN THỨC and concise source-supported support. Two editorial image/copy rows, alternating desktop alignment and single-column image-first mobile. Category/title/description/read action sourced from Content Collection. Stable existing slugs, no catalogue/search/filter, news dates or placeholders. Hub first photo visibly above fold at all tested widths, so eager/high; second lazy. Ordinary read links remain untracked.

## D. Article layout

BlogLayout rebuilt through ProductLayout/BaseLayout/shared Navbar/Footer/FloatingContact. Category/H1/description, optional actual metadata, one real Hero, Markdown slot in760px reading column, related service, back to Knowledge, shared ContactCta/Footer. Clear source-backed H2/list/paragraph/link typography, system sans/ink/orange/light palette. Responsive body17px desktop/16px mobile; no full-width paragraphs. Intrinsic media geometry, contain treatment. No page-specific script or duplicated Markdown in components/new JS data file. Existing content schema minimally adds imageAlt/dimensions/relatedService.

## E. Article factual audit

Read both published Markdown records, draft fixture, existing Blog/card/layout, schema, SEO helpers, images, relevant Product copy/calculator anchor and pricing/review sources before implementation. Public concepts retained, time-sensitive and unconditional claims audited, absent author/date metadata left absent. All exact edits recorded in [before/after audit](NEW-WEB-05D-content-audit.md). Original legacy JS copies remain unused for reference; no source file deleted.

## F. Alu price handling

Repository has matching legacy1.2TR+/m² in bangHieuPricing.js, but no effective date/current quotation approval. Prior visual review preserved existing values, which does not establish a current2026 quote. Chosen editorial policy removes old1.200.000đ/m² entirely; title becomes Giá bảng hiệu alu phụ thuộc vào những gì?; description removes unconditional durability comparison. Numeric-price section becomes Cách nhận báo giá phù hợp, explaining material/design/dimensions/frame/site conditions and linking real signage service for tailored consultation. No replacement number, redirect or change to locked Product pricing. Gate rejects old number/current-time wording across active Markdown/rendered Alu/Hub/metadata/schema.

## G. Tem article handling

Small quantities/testing/new variants, setup/unit-cost tradeoff and preparation concepts retained. Neutralized urgency bullet and unconditional low-total-cost sentence; preparation refers to finishing/use conditions without a waterproof guarantee. No minimum, numerical price, certification, durability guarantee or fixed turnaround. Calculator remains only /tem-nhan/#calculator; not copied into article.

## H. Internal / related links

One contextual service link per article. Alu bridge BẢNG HIỆU QUẢNG CÁO→/bang-hieu/, optional actual work→/du-an/. Tem bridge IN TEM NHÃN→/tem-nhan/, Tính giá tem nhãn→stable /tem-nhan/#calculator. Tem does not use signage Projects as proof. Related-service destination tokens reuse productGroups. Actual Hub/read/contextual/Projects/calculator/back/Footer links verified; no repetitive SEO anchors.

## I. SEO / structured data

Existing three canonicals/slugs unchanged. Hub metadata and both image URLs retained; Alu factual title/description adjustment flows consistently into title/OG/Twitter/BlogPosting. Existing helper unchanged, valid BlogPosting with verified publisher/image/mainEntityOfPage, no fabricated author/date fields. Conditional UI time/author only when source provides it, currently absent. No FAQ/review/rating schema or Local SEO rewrite. Sitemap byte unchanged15; no kien-thuc/bai-viet/new article/draft route. Collection remains source of truth, draft fixture remains unpublished.

## J. Navbar / Footer / contact

Primary Navbar still exactly Sản phẩm / Giải pháp / Công trình / Năng lực, no Blog item. Shared Footer Kiến thức→/blog/, other links unchanged. All three Blog routes use shared V3 ContactCta CẦN IST / TƯ VẤN? and verified business contacts, no new backend. Shared Contact suppresses floating trigger near Hero/Contact/Footer; native initial focus, ShiftTab containment, Escape/return verified on mobile. No shared-shell source edits.

## K. Responsive / accessibility

Full Hub and both articles at1440/1024/768/430/390/375/320 PASS: exactly one H1, logical headings, visible lists, reading width≤760px, all images loaded/contained, intrinsic dimensions, no overflow/clipping, visible controls≥44px, inline contextual links44px, no valid-route warnings/errors. Visible focus and shared reduced-motion rules retained; new Blog CSS adds no animation, OS preference emulation not claimed. Images reused byte unchanged with descriptive alt; [provenance/hashes](NEW-WEB-05D-images.md).

## L. Security / performance

Fresh full/runtime audits0/0 including High/Critical0, no dependency/framework/carousel/video/new Blog script. Hub one eager/high meaningful above-fold photo and one lazy; articles one priority Hero each. Geometry prevents layout shifts; cache reuses existing two photos. Actual analytics client unchanged, preview/local no GA4 loader. Existing event taxonomy only for categorical related-service/contact conversions; no article title/author/customer/image-name/free-text/PII payload. Runtime tracking tests extended to all15 public V3 pages.

## M. Regression / files

Build15 plus all18 gates PASS, including new test:blog-v3 for collection2/URLs/freshness policy/related links/no invented metadata/all15 V3 shell/sitemap15. Tem11/11, Hóa Đơn31/31; browser312.800₫/600.000₫, Tem reset/Hóa Đơn Escape. All12 prior V3 pages at1440/390 PASS; full three Blog pages completes all15 public HTML routes with V3 UI. Unknown/prototype/alternate/draft/new article paths HTTP404 locally.

Twelve locked HTML outputs exactly equivalent except compiled stylesheet links. PostCSS comparison proves remaining CSS rules/declarations/cascade order equal:29 unused legacy Blog utility rules removed, base/V3 stylesheets combined by bundler. Removed mandatory utility classes are absent from all12 locked pages. Home/Product/Solution/Projects/About/global source CSS/layouts/data/media, Navbar/Footer/Contact, calculator/tracking/SEO helpers, lock, sitemap/redirects/robots byte unchanged. Legacy src/blog, blogPosts.js and draft/reference components retained, no files deleted.

Changed: Hub, BlogLayout, BlogCard, two Markdown records, schema metadata, scoped Blog CSS, tracking gate coverage, package/new Blog gate and three audit/review/provenance documents. git diff --check PASS; standalone staged check required before commit.

## N. Draft PR / Preview

Push codex/ist-blog-v3; Draft PR base codex/ist-homepage-v3-candidate with required warning lines. Automatic exact-head Preview required, no manual production deploy/settings change. Final head/deploy/URL and Preview proof are recorded in PR body/local evidence after deployment: all15 routes V3, sitemap15, full Hub/articles1440/390/320, no GA4/warnings/errors, calculators/contact/links and404 boundaries. STOP for CEO review. No main merge, cutover work, new article, Local SEO or old-source/worktree deletion.

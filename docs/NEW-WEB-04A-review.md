# NEW-WEB-04A Product Portal Foundation review

STACKED V3 DEVELOPMENT PR
DO NOT MERGE TO MAIN

Date: 2026-10-13. Parent [PR #7](https://github.com/truonghuyck5-ops/ist-web/pull/7) remains Open/Draft/unmerged at 24ba5c142b4ae0ac5cf241b083ee9ae96cbd14a4.

## A. Git and stack

Fresh worktree I:\ist-web-v3-products; branch codex/ist-product-portal-foundation; base origin/codex/ist-homepage-v3-candidate. Initial HEAD and merge-base equal the approved parent SHA. Fetched origin/main remains 4756a2dd5f67889a63c384bd2b7e7be53e5da6e2. The child Draft PR targets the Homepage candidate branch. Production and other worktrees are preserved.

## B. Product Hub

New /san-pham/ presents six editorial catalogue entries: Bảng hiệu, In nhanh, Tem nhãn, In khổ lớn, Hóa đơn & biểu mẫu, Túi xốp. Desktop uses numbered rows, large type and a distinct photo per family; mobile stacks each text block and image. This is a full catalogue rather than the Homepage Quick Portal grid. Bảng hiệu/Tem nhãn/Hóa đơn use existing routes; In nhanh/In khổ lớn/Túi xốp use local #contact with Nhận tư vấn. No future product route is created.

## C. Shared product architecture

ProductLayout composes the existing V3 Navbar, Footer and single FloatingContact through BaseLayout. ProductHero and ProductIndex are reused by Hub and signage, using the same Media component and V3 tokens. Small Navbar/Footer props make product-page links resolve to Homepage anchors. SelectedProjects accepts shared project data; ContactCta accepts product copy. No new shell behavior, CMS, dependency or visual system.

## D. Bảng hiệu pilot

/bang-hieu/ keeps its URL, title, description, canonical and OG/Twitter image. New H1 BẢNG HIỆU QUẢNG CÁO; concise verified description; Nhận tư vấn and Xem công trình CTAs. Four existing bangHieuTypes entries are preserved, followed by supported audiences, four listingVisible signage entries from featuredProjects, a compact four-step process, existing bangHieuPricing values/descriptions and the six original FAQs. FAQ copy moved to shared bangHieuFaqs.js; native details requires no new script. The old lightbox script is detached. No invented material, price, project fact, Product schema or review schema.

## E. Images and provenance

See NEW-WEB-04A-images.md. Two optimized WebP copies from the CEO-authorized IST library total 107,838 bytes: signage hero 39,704 bytes; printed bag 68,134 bytes. All other images are existing real IST assets. Each catalogue family has a distinct image. Originals and Drive sharing are unchanged. No AI or stock image.

## F. Homepage integration

Desktop/mobile Sản phẩm navigation, Khám phá sản phẩm hero CTA and Xem tất cả sản phẩm Explorer CTA now resolve to /san-pham/. Quick Portal direct destinations and Giải pháp/Công trình/Năng lực anchors remain. Approved Home typography, media, spacing and layout remain; its V3 CSS bytes match the parent, with a build-generated filename change from index.B1REVNGN.css to content.B1REVNGN.css.

## G. SEO and sitemap

/san-pham/ has its own title/description, production canonical and matching OG/Twitter. Candidate sitemap has exactly 10 URLs. Existing Bảng hiệu metadata is preserved. Homepage Organization architecture, robots and redirects are retained. Prototype and future nested routes are absent.

## H. Tracking

Existing service_cta_click/zalo_click/phone_click contract covers product navigation, catalogue CTAs, project-list CTA, final contact and shared consultation panel. Only generic location/service/action/destination and page_path are dispatched. The real delegated client is exercised on Home, Hub and signage in a Node VM: production initializes one async loader; Preview sends zero GA4 calls. No customer/project title or PII payload. Calculator tracking is unchanged.

## I. Responsive and accessibility

Local Chrome review on all three V3 routes at 1440/1024/768/430/390/375/320: full-page visual captures and scroll review; all images load, no horizontal overflow or clipped type/media. One H1, semantic main/nav/footer, heading hierarchy, first skip link, intrinsic image dimensions, useful alt and >=44px interactive targets. Existing focus outline/reduced-motion behavior retained. Mobile menu opens, closes with Escape and resolves cross-page Homepage anchors. Native consultation panel autofocuses its close button, contains Tab/Shift+Tab, closes with Escape and returns focus/unlocks scrolling. FAQ opens by Enter. Browser error/warning log empty on local valid routes.

## J. Performance and security

Fresh npm ci; npm audit and npm audit --omit=dev: 0/0. No dependency or lockfile change. Each V3 route has one high-priority visual; all remaining images lazy. Product-only CSS: 6,244 bytes / 1,553 gzip. No product-specific JavaScript bundle; shared tracking and consultation total about 3.7 KB inline per product route. No carousel, video, font download or animation package.

## K. Regression

Build, test:seo, test:redirects (13/13), test:tracking, test:projects, test:homepage, test:product-portal, test:tem-pricing (11/11), test:hoa-don-pricing (31/31), audits and diff checks PASS. New semantic product test verifies six rendered families, valid routes/contact labels, V3 signage, shared project proof, sitemap and Home integration without full-page snapshots.

Seven legacy HTML pages match the parent byte-for-byte: Tem, Hóa đơn, Combo, Dự án, Blog and both articles. Shared legacy CSS, tracking/calculator/html2canvas bundles, robots and redirect bytes also match. All seven pages passed local browser smoke at 390px. Tem 50x50mm, decal giấy, no film, quantity 1,000 => 312.800 ₫; quote opens/closes and reset clears inputs. Hóa đơn A6 / 2 liên / 40 cuốn => 600.000 ₫; quantity price table opens/closes. No pricing or calculator code changed.

## L. Changed files

New: ProductLayout; product-v3/ProductHero, ProductIndex, content.js; product-v3.css; pages/san-pham/index.astro; data/bangHieuFaqs.js; scripts/test-product-portal.mjs; two product-v3 images; these review/provenance docs.

Updated: pages/bang-hieu/index.astro; pages/sitemap.xml.js; home-v3/Navbar, Footer, Hero, ProductExplorer, SelectedProjects, ContactCta, FloatingContact; home-v3.css comment; original signage Faq import; SEO/Home/tracking tests; package.json adds test:product-portal only.

## M–N. Child Draft PR and Preview

The child PR title/commit is feat(web): build product portal foundation, with base codex/ist-homepage-v3-candidate. PR remains Draft and unmerged. Deployed Preview verification and its final URL are recorded in the PR and CEO handoff: root V3 Home, V3 /san-pham/, V3 /bang-hieu/, seven legacy routes/calculators, sitemap 10, prototype/unknown 404, responsive smoke 1440/390/320 and console checks. Stop after Preview PASS for CEO review.

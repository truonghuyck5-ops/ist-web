# NEW-WEB-03 Homepage production candidate review

HOMEPAGE PRODUCTION CANDIDATE / NOT APPROVED FOR PRODUCTION MERGE.

Date: 2026-10-13. Approved NEW-WEB-02/R1 Design System V1 retained.

## A. Git/baseline

Production base: `4756a2dd5f67889a63c384bd2b7e7be53e5da6e2`, verified from fetched origin/main. Approved reference: `bf37b97edb52bebe813861953b5ee1041327b9ac`, branch codex/ist-portal-v3-prototype, [PR #6](https://github.com/truonghuyck5-ops/ist-web/pull/6), Open/Draft/unmerged. New clean worktree `I:\ist-web-v3-home`, branch `codex/ist-homepage-v3-candidate`, based on origin/main. No wholesale merge/cherry-pick; other worktrees and legacy .astro/ untouched.

## B–D. Architecture and Homepage

Selective production port: src/components/home-v3/{Navbar,Hero,QuickPortal,ProductExplorer,SelectedProjects,ProductionProof,Process,ContactCta,FloatingContact,Footer,Media}.astro and content.js; src/styles/home-v3.css. Locked flow, approved colors, system sans, 1280px width, spacing, typography and media radii retained.

Homepage index alone adopts the new render. Old component sources remain for reference/rollback, detached from index. Optional BaseLayout shell slots and body/viewport options allow Home-specific Navbar/Footer/contact with original defaults on the other routes. Existing title, description, OG/Twitter, production canonical, Organization JSON-LD and shared GA4 architecture are retained. Skip link is first keyboard destination; viewport-fit supports safe areas.

No prototype page/wrapper/layout or dynamic workaround. No /__portal-v3/ route, preview-toolbar/Netlify iframe CSS, prototype-status footer or portal-v3 runtime/image naming. PR #6 is preserved separately.

## E. Navigation

Navbar Sản phẩm -> #products; Giải pháp -> #quick-portal; Công trình -> #projects; Năng lực -> #production, desktop and mobile. Hero CTAs -> #products and #contact. Hero SẢN XUẤT TRỰC TIẾP ↗ is a real #production anchor with 44px target.

Portal: Làm bảng hiệu -> /bang-hieu/; Tem nhãn -> /tem-nhan/; Mở quán -> /combo-mo-quan/; Hóa đơn & biểu mẫu -> /hoa-don/; In nhanh and In khổ lớn -> #contact. Explorer uses the real matching routes for Bảng hiệu/Tem nhãn/Hóa đơn, with contact fallback for In ấn/In khổ lớn/Túi xốp. No false detail action or future route. Footer uses existing routes/current anchors, with /blog/ outside primary nav. Xem tất cả công trình and all four project tiles -> /du-an/; approved featuredProjects.js remains the sole data source.

## F. Image provenance

Both web copies match approved prototype bytes exactly. Originals remain in Drive/QA storage and prototype; every existing repository image remains untouched. No AI, retouching, private records or invented customer/place facts.

| Production copy | Dimensions / size | Provenance |
| --- | --- | --- |
| /images/home-v3/ist-round-lightbox.webp | 1600 × 1031; 169,400 bytes | CEO_DROP / Sản phẩm IST / @- Quảng Cáo / @khách làm combo / 13- Quyên Coffee (10-06-2021); [file 1XrPlAzjr87zG5_x5EyTMXXLtbjHmyVg7](https://drive.google.com/file/d/1XrPlAzjr87zG5_x5EyTMXXLtbjHmyVg7/view); original z2536528442572_ae0db30534815a7fd2a4e7697c89a8ee.jpg, 2560 × 1650. Crop 25% 50%. |
| /images/home-v3/ist-printed-tags.webp | 1200 × 1114; 68,046 bytes | CEO_DROP / Sản phẩm IST / 03-Danh Thiếp - Hóa Đơn - Thiệp Cưới / 08-tag; [file 1bmhzgKdPeTGrdzrCffFRhJQIaUBI7lW-](https://drive.google.com/file/d/1bmhzgKdPeTGrdzrCffFRhJQIaUBI7lW-/view); original z1754306126085_c0435fd0f917f49122c5f27a44ccf741.jpg, 2222 × 2062. |

SHA-256: lightbox `750a6de624a93622f66514ab83e13383c51866cdb72cf58dfd406a73bc2f1430`; tags `dc8d8bf9ff87f91bf242eca03253afca705dc7df8e8c1a300e0e2eec778d1dcd`.

## G. Tracking

Shared tracking.client.js unchanged: production-host gate, async GA4/duplicate guard, delegated clicks, calculator bridge and page_path. New UI attributes use existing service_cta_click, zalo_click, phone_click and existing location/action/service vocabulary. Hero, nav quote variants, six Portal CTAs, Explorer, project-listing CTA, consultation trigger/panel, final CTA and footer contact fallback are mapped.

Runtime test executes the real client against rendered CTA attributes. Preview generates no GA4 calls/loader; production loads once; parameters are limited to categorical location/service/action/destination/page_path. No project/customer/title/caption/free text/contact strings. No real analytics request or customer message sent by tests.

## H. SEO and other routes

Same nine public URLs. Canonical https://insangtao.net/ and verified Organization JSON-LD/metadata retained. Sitemap and redirects match baseline bytes. Prototype and unknown path return HTTP 404 locally.

Eight non-Homepage HTML outputs match baseline after substituting the bundler stylesheet filename alias ContactCta.Mpmv43UK.css -> BaseLayout.Mpmv43UK.css. Shared CSS bytes and calculator/tracking bundles are identical. Home CSS is absent on all eight routes. Content, SEO, navigation and business behavior are preserved; no Local SEO rewrite.

## I. Responsive/accessibility

PASS at 1440/1024/768/430/390/375/320: no overflow/heading clipping; Hero and image crops intact; Portal 3 columns at 1440, 2 at all smaller widths. All 13 images load. Sticky header top 0; anchor clearance 112px desktop/tablet, 90px mobile. Caption anchor reaches production; mobile menu Escape/focus return and anchor close behavior work.

One H1, logical H2/H3, landmarks/alt, first-focus skip link, focus outline and all rendered controls >=44px height. Modal close 44×44, links 58px. Caption target enlarged while figure rhythm is retained; desktop footer links become 44px and footer labels remain compact at 320px. Native desktop panel/mobile sheet: initial focus, Tab/Shift+Tab containment, Escape, backdrop, focus return and scroll lock PASS. Reduced-motion and safe-area CSS retained. Physical iOS/OS preference emulation is not claimed.

Screenshots at 1440/768/390/320 inspected against R1. Desktop/tablet full layouts and 320px section/continuation/footer/sheet screenshots checked. No substantial visual drift. Eight legacy routes and both Blog articles retain one H1, canonical and original shell. Console errors absent.

## J–K. Performance/security/regression

No dependency/framework/icon/font/video/carousel added. Hero alone eager/high priority; 12 below-fold images lazy with dimensions; no bulk preloads. About 3.7KB Home JS includes GA4 and contact/menu behavior. Shared CSS 51,488 bytes (9,184 gzip), Home CSS about 17.8KB (4.1KB gzip), absent from other pages. Former Homepage reveal/lightbox initializer is detached.

Fresh npm ci PASS; full/omit-dev audit 0/0; lockfile/dependency versions unchanged. Final gates: build, test:seo, test:redirects, test:tracking, test:projects, test:tem-pricing (11/11), test:hoa-don-pricing (31/31), test:homepage, audit full/omit-dev, diff-check. All must pass before commit.

Local browser calculator QA: Tem 50×50mm / 1000 paper labels = 312.800 VND, quote popup/reset PASS; Hóa Đơn A6 / 2-ply / 40 = 600.000 VND, quantity popup PASS. No real customer PII entered and no contact submission/export.

## L–N. Scope and delivery

Changed scope: Homepage index; optional BaseLayout shell integration; Home component/data/styles; two image copies; package.json adds test:homepage only; new semantic Homepage test and tracking runtime assertions; this report. Old source components are preserved. No other production page/data/calculator/config/lockfile edits.

Commit: feat(web): build IST portal v3 homepage candidate. Push only codex/ist-homepage-v3-candidate. Create a new Draft PR with that title and candidate warning. Final SHA/PR/successful Preview are recorded in the PR and final delivery report after creation. Preview / must show candidate, /__portal-v3/ and unknown routes 404, all nine URLs and calculators PASS. Netlify review toolbar is external review-host UI; no preview-specific rule is shipped.

Both PRs remain Draft/unmerged. No production deployment, Ready transition, worktree deletion or next-stage routes.

Final local gates (2026-10-13): all required commands PASS, including test:homepage and tracking runtime/privacy. Full/omit-dev audits 0/0; Tem 11/11; Hóa Đơn 31/31; sitemap 9 URLs; diff-check clean.

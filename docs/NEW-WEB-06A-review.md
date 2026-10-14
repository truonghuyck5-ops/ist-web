# NEW-WEB-06A release candidate review

FINAL V3 RELEASE READINESS
DO NOT MERGE TO MAIN

## Integration and scope

Approved Blog PR17 head07d6cbf3d61cf7e1bda9a618a698a3f47ec5f1e2 passed18 gates, exact-head Preview15 and audits0/0 before Ready/normal merge into codex/ist-homepage-v3-candidate. Merge23aeb87b8f84d2273ea2ac07c01c7d603f1d7930 has two parents and the approved Blog treefb49367665782358fabeaf39ab0302f5c6c06c7b. Fresh I:\ist-web-v3-release / codex/ist-v3-release-candidate began clean at that merge. PR7 remains Open/Draft/unmerged; origin/main4756a2dd5f67889a63c384bd2b7e7be53e5da6e2 is untouched.

Three minimal UI fixes: Footer In ấn now uses /in-nhanh/; quotation logo gains its existing image’s1206×1328 dimensions; shared FloatingContact observer suppresses over native FAQ/main-content link regions to prevent demonstrated covered actions. No prices/calculator engine/dependency/assets/business copy changed. Added semantic test:v3-release and release audit documentation. All CSS/JS/image output bytes remain identical to the integrated approved baseline; only these three HTML deltas are allowed and verified over129 built files.

## Routes, facts and SEO

Exactly15 canonical public routes: /, /san-pham/, /giai-phap/, /ve-ist/, /bang-hieu/, /in-nhanh/, /tem-nhan/, /hoa-don/, /in-kho-lon/, /tui-xop/, /combo-mo-quan/, /du-an/, /blog/, /blog/gia-bang-hieu-alu/, /blog/in-tem-nhan-so-luong-it/. All have one H1, V3 shell/skip/main/shared Navbar/Footer/contact, unique title/description, production canonical, OG/Twitter and Vietnamese lang. Full inventory: NEW-WEB-06A-seo-inventory.md. All593 hrefs resolve to an approved route/valid hash or real full-image fallback; no internal.html, Preview/localhost/private/future link. Fifty-five active assets have exact-case files, verified nonzero intrinsic dimensions and meaningful alt; lazy/priority behavior retained.

Full facts/NAP classification in NEW-WEB-06A-facts.md.73 active matches and11 legacy source matches; no unresolved factual conflict. Trà Vinh refers to service/customer geography, supported by approved Homepage wording including both Trà Vinh and Vĩnh Long; factory address consistently comes from siteConfig.2016/2022 retain approved About history. Unverified About metrics, old Combo prices and stale Alu current-price framing do not render. No author/date/SLA or business assertion invented. Legacy unused sources remain for rollback/reference.

Blog two published articles/draft exclusion/available-field BlogPosting and related service/calculator links preserved. Projects only four approved visible records; hidden remain hidden, detailEnabled:false and no detail output. Browser lightbox and real image fallback1215×911, Escape/focus/scroll restore PASS; existing VM fallback/error/modified-click gates retained.

## Automated and local browser evidence

Fresh npm ci PASS. Build15 pages. All19 test scripts PASS, including Tem11/11, Hóa Đơn31/31, SEO15, redirects13/13, actual tracking runtime production/Preview allow-list, all locked V3 page/collection/data contracts and new release gate. npm audit and npm audit --omit=dev both0 vulnerabilities. git diff --check and staged standalone whitespace check are required before commit.

Local final matrix: eight core pages at1440/1024/768/430/390/375/320, plus seven remaining routes at390. Full-page viewport captures/geometry/images/console evidence saved outside public build. No horizontal overflow, clipped headings, controls smaller than44px, floating collisions or console warnings/errors after final fixes. Browser keyboard menu on nine page types, FAQ Enter/Space on four products, contact initial focus/Shift+Tab/Escape/return and native Project lightbox PASS. Reduced-motion/safe-area contract retained; no physical iOS or full WCAG certification claimed.

Tem50×50mm/paper/no film/1000=312.800₫; quote close/reset PASS. Actual Lưu ảnh download exists in Downloads,302,440 bytes, PNG2240×1400; independently decoded/opened and visually checked with full quote and correct total. The browser download-event observer timed out, but actual UI download and file evidence confirm successful export. No customer PII entered. Hóa ĐơnA6/2liên/40=600.000₫; price table Escape/click close/focus return and80-cuốn change960.000₫ PASS.

Practical output: shared CSS67,082 bytes, Product CSS6,244, Solution CSS4,271, Tem CSS5,481/JS12,811, Hóa Đơn CSS5,783/JS7,438. Calculator entry scripts appear only on their routes; html2canvas remains lazy at Tem export. One priority image each route, others lazy. No new framework/font/video/dependency or bundle growth; shared legacy-compatible base utilities remain byte-identical and no legacy public shell renders.

## Exact-head Preview and stop point

Push this branch and create a Draft stacked release PR targeting codex/ist-homepage-v3-candidate. Final Preview/deploy/SHA, all15×3 browser results, sitemap/robots/redirect/404/byte-exact asset checks, remote calculators/PNG and final manifest are recorded in the release PR after deployment. Do not infer final Preview PASS from local evidence. PR7 description is updated only after final06Astate is known.

Production rollback identity captured read-only: deploy6acdeabb90beaf8392beb273, main4756a2dd5f67889a63c384bd2b7e7be53e5da6e2. No production deploy, rollback, PR7 Ready/merge or source/branch/worktree cleanup. Stop for CEO cutover review. Nonblocking debt: physical iOS not tested, unused legacy source retained, future content outside scope. Any P0 blocks cutover.

Recommended later procedure only: CEO approves exact candidate SHA; normal merge release PR into parent, verify resulting tree and refreshed PR7 Preview; after explicit production authorization mark PR7 Ready and normal merge to main, verify production deploy’s commit and15-route/sitemap/redirect/404/calculator/tracking smoke; retain recorded rollback deploy until V3 is stable. No part of that production procedure is executed in06A.

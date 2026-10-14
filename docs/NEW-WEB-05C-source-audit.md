# NEW-WEB-05C — Source audit and fact boundaries

Read before implementation: src/data/homeProfile.js; src/components/sections/home/About.astro; src/sections/AboutIST.js; src/components/sections/home/ProductionCapacity.astro; src/components/home-v3/ProductionProof.astro; src/components/home-v3/Process.astro; src/data/site.js; public team/workshop/machine imagery; ProductLayout/ProductHero, shared ContactCta/Navbar/Footer/Media and existing Solution/Projects patterns.

## A. Existing public facts

Legacy About explicitly states IST began in 2016 with small printing services and Công ty TNHH MTV Quảng Cáo In Sáng Tạo was officially established in 2022. Retain only those two dated milestones. “Hiện tại” summarizes the existing combination of design, printing, advertising production and installation; no new date, company-history milestone, years-in-business calculation or leadership claim. Legal name and public business contacts come from siteConfig. Shared schema is unchanged; no additional organizational claims.

## B. Production capability wording

homeProfile.capabilities supplies six descriptions: Thiết kế & tư vấn; In ấn kỹ thuật số; In khổ lớn; CNC, laser & gia công; Sản xuất bảng hiệu; Thi công thực tế. Descriptions reused exactly, including “thiết kế cơ bản”; fourth label normalized to the requested “CNC / Laser & gia công”. Links only to existing In Nhanh, Tem Nhãn, In Khổ Lớn and Bảng Hiệu. CNC/Laser, design and installation remain informational where no dedicated route exists. homeProfile.workingProcess supplies the six exact process steps, including conditional scope established by existing production/installation context; no turnaround promise.

## C. Equipment names

Existing homeProfile.productionMachines and ProductionCapacity support Konica C2060L, Saga, large-format printing, decal printing/lamination, CNC/Laser, invoice printing, screen printing and delivery/installation truck. The page curates Konica C2060L and generic CNC/Laser/production capability names. It does not reproduce all ten machines or exact dimensions. No counts, DPI, speed, daily throughput, uptime, certification or maximum-volume claim.

## D. Unverified trust metrics excluded

homeProfile.stats retains legacy 500m²+, 15+ and 1000+ in its original source; the new About route never imports/renders that stats array. Those figures are absent from visible copy and SEO metadata. No customers-served count, factory-size claim, employee count, branches, awards, certification, market share or testimonial/client-logo wall. Existing images do not provide evidence for additional assertions.

No source deletion, Local SEO rewrite, new private people imagery or fresh library selection. The original legacy About and equipment sources remain available for reference.

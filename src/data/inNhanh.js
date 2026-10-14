// Selected real IST paper samples. Source IDs, crops and hashes: docs/NEW-WEB-04C3B-images.md.
export const inNhanhHero = { src: '/images/in-nhanh/danh-thiep.webp', alt: 'Hai mặt danh thiếp giấy được cầm trước khu vực trưng bày tại IST', width: 1260, height: 1400 }
const tag = { src: '/images/home-v3/ist-printed-tags.webp', alt: 'Hai mẫu tag giấy có lỗ treo được in tại IST', width: 1200, height: 1114 }
const loyalty = { src: '/images/in-nhanh/the-tich-diem.webp', alt: 'Hai mặt thẻ tích điểm giấy với các ô đóng dấu còn trống', width: 1210, height: 1090 }
const flyer = { src: '/images/in-nhanh/to-roi.webp', alt: 'Các tờ rơi quảng cáo in màu trên giấy được cầm trên nền sáng', width: 1400, height: 1050 }
const menu = { src: '/images/in-nhanh/menu-giay.webp', alt: 'Hai cuốn menu giấy đóng lò xo đặt trên bàn tại xưởng IST', width: 1400, height: 1053 }
export const inNhanhGroups = [
  { title: 'Danh thiếp', detail: 'Danh thiếp in trên giấy để giới thiệu thông tin kinh doanh và liên hệ.', media: inNhanhHero },
  { title: 'Tag giấy', detail: 'Tag giấy treo hoặc gắn kèm sản phẩm, mang thông tin của cửa hàng.', media: tag },
  { title: 'Voucher / Thẻ tích điểm', detail: 'Ấn phẩm giấy cho chương trình khuyến mãi và chăm sóc khách hàng.', media: loyalty },
  { title: 'Tờ rơi / Tờ gấp', detail: 'Bản in giấy để giới thiệu sản phẩm, dịch vụ và nội dung quảng bá.', media: flyer },
  { title: 'Menu giấy', detail: 'Menu in trên giấy để cầm tay hoặc đóng cuốn, giới thiệu món ăn và đồ uống.', media: menu },
].map(item => ({ ...item, href: '#contact', service: 'in_nhanh', action: 'quote_request', media: { ...item.media, fit: 'contain' } }))
export const inNhanhGallery = [
  { ...inNhanhHero, title: 'Danh thiếp hai mặt' },
  { ...tag, title: 'Tag giấy có lỗ treo' },
  { ...loyalty, title: 'Thẻ tích điểm giấy' },
  { ...flyer, title: 'Tờ rơi in màu' },
  { ...menu, title: 'Menu giấy đóng lò xo' },
]
export const inNhanhProduction = { src: '/images/home/may-in-nhanh-konica.webp', alt: 'Máy in kỹ thuật số Konica C2060L tại xưởng IST', width: 810, height: 1080 }
export const inNhanhRelated = [
  { title: 'Tem nhãn', detail: 'Cần nhãn dán hoặc sticker? Xem nhóm tem decal dành cho sản phẩm.', href: '/tem-nhan/', service: 'tem_nhan' },
  { title: 'Hóa đơn & biểu mẫu', detail: 'Phiếu thu, phiếu chi và biểu mẫu phục vụ công việc kinh doanh.', href: '/hoa-don/', service: 'hoa_don' },
  { title: 'In khổ lớn', detail: 'Menu dạng bảng, PP trưng bày, standee và các bản in quảng cáo khổ lớn.', href: '/in-kho-lon/', service: 'in_kho_lon' },
  { title: 'Combo mở quán', detail: 'Kết hợp ấn phẩm với các hạng mục nhận diện khi mở cửa hàng.', href: '/combo-mo-quan/', service: 'combo_mo_quan' },
].map(item => ({ ...item, action: 'view_service' }))
export const inNhanhCopy = {
  introduction: 'Ấn phẩm giấy cho kinh doanh, in kỹ thuật số tại IST.',
  uses: [
    ['Cửa hàng / shop', 'Danh thiếp, tag giấy và thẻ tích điểm cho hoạt động bán hàng.'],
    ['Quán ăn / café', 'Menu giấy và voucher để giới thiệu món, chương trình của quán.'],
    ['Doanh nghiệp / hộ kinh doanh', 'Danh thiếp và tờ giới thiệu để trao đổi thông tin kinh doanh.'],
    ['Khai trương / khuyến mãi', 'Tờ rơi và voucher giấy mang nội dung chương trình của bạn.'],
  ],
  steps: [
    ['Tư vấn nhu cầu', 'Trao đổi loại ấn phẩm và cách bạn sử dụng.'],
    ['Chuẩn bị file / nội dung', 'Thống nhất nội dung và file trước khi in.'],
    ['In & hoàn thiện', 'Thực hiện bản in và hoàn thiện ấn phẩm.'],
    ['Bàn giao', 'Kiểm tra thành phẩm và trao đổi cách nhận hàng.'],
  ],
}

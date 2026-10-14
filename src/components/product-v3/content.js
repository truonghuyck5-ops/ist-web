import { portalItems, productGroups } from '../home-v3/content.js'
import { bangHieuTypes } from '../../data/bangHieuTypes.js'

const mediaFromPortal = (index) => {
  const item = portalItems[index]
  return { src: item.image, alt: item.alt, width: item.width, height: item.height, position: item.position }
}

// Existing verified families and IST photos; dedicated routes remain unchanged.
export const productFamilies = productGroups.map((group, index) => ({
  ...group,
  media: [mediaFromPortal(0), mediaFromPortal(1), mediaFromPortal(2), mediaFromPortal(4), mediaFromPortal(5), {
    src: '/images/product-v3/ist-printed-bag.webp', alt: 'Túi xốp trắng in logo tại IST', width: 1050, height: 1400, fit: 'contain', position: '50% 47%',
  }][index],
}))

const typeMedia = [
  { src: '/images/home/projects-Cty-Nbeauty.webp', alt: 'Bảng hiệu hoàn thiện tại mặt tiền cửa hàng Nbeauty', width: 1215, height: 911, position: '50% 37%' },
  { src: '/images/home-v3/ist-round-lightbox.webp', alt: 'Hộp đèn tròn phát sáng tại xưởng IST', width: 1600, height: 1031, position: '25% 50%' },
  { src: '/images/projects/thi-cong-001.JPG', alt: 'Lắp đặt chữ nổi lên vách tại công trình', width: 683, height: 911, position: '50% 30%' },
  { src: '/images/home/service-in-bat-decal.webp', alt: 'In bạt quảng cáo khổ lớn tại xưởng IST', width: 1215, height: 911, position: '50% 50%' },
]

export const signageOptions = bangHieuTypes.map((type, index) => ({
  title: type.title, detail: type.description, href: '#contact', service: 'bang_hieu', action: 'quote_request', media: typeMedia[index],
}))

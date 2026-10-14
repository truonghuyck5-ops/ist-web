import { homeProfile } from './homeProfile.js'
import { siteConfig } from './site.js'

// Only public story/capability facts; homeProfile.stats is deliberately not rendered.
export const aboutTimeline = [
  { label: '2016', text: 'IST bắt đầu với các dịch vụ in ấn nhỏ lẻ.' },
  { label: '2022', text: `${siteConfig.legalName} chính thức được thành lập.` },
  { label: 'HIỆN TẠI', text: 'IST kết nối thiết kế, in ấn, sản xuất quảng cáo và thi công.' },
]
const capabilityLinks = [[], ['/in-nhanh/', '/tem-nhan/'], ['/in-kho-lon/'], [], ['/bang-hieu/'], []]
export const aboutCapabilities = homeProfile.capabilities.map((item, index) => ({
  ...item,
  title: index === 3 ? 'CNC / Laser & gia công' : item.title,
  links: capabilityLinks[index],
}))
export const aboutHero = { src: '/images/home/may-in-bat-kho-lon.webp', alt: 'Các máy in bạt khổ lớn tại xưởng IST', width: 1910, height: 1076 }
export const aboutWorkshop = [
  { src: '/images/home/may-in-nhanh-konica.webp', alt: 'Máy in nhanh Konica tại IST', width: 810, height: 1080, title: 'In kỹ thuật số', caption: 'Máy in nhanh Konica C2060L tại xưởng IST.' },
  { src: '/images/home/may-cnc-laser-ist.webp', alt: 'Máy CNC và laser tại IST', width: 1215, height: 911, title: 'CNC / Laser & gia công', caption: 'Hệ thống CNC và laser phục vụ gia công bảng hiệu, mica, alu, fomex.' },
  { src: '/images/home/khu-san-xuat-thi-cong-ist.webp', alt: 'Khu sản xuất và thi công bảng hiệu IST', width: 1215, height: 911, title: 'Sản xuất tại xưởng', caption: 'Khu sản xuất, gia công và thi công bảng hiệu tại IST.' },
]
export const aboutPeople = [
  { src: '/images/home/home-teamist-002.webp', alt: 'Đội ngũ nhân sự IST', width: 1405, height: 911, caption: 'Đội ngũ IST.' },
  { src: '/images/home/home-thi-cong-001.webp', alt: 'Đội ngũ IST thi công bảng hiệu', width: 683, height: 911, caption: 'Thi công bảng hiệu thực tế.' },
]
export const aboutProcess = homeProfile.workingProcess

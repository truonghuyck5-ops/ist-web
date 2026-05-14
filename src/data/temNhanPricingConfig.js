export const temNhanPricingConfig = {
  // Giới hạn kích thước khách được nhập
  minSize: 20,
  maxSize: 300,

  // RIRO có tràn lề mặc định cho tem tròn / đặc biệt.
  // IST ẩn lựa chọn hình dạng, mặc định có thể bế theo hình bất kỳ,
  // nên cộng biên an toàn 2mm.
  bleedForCutting: 2,

  // Giá tối thiểu cho 1 đơn tem nhãn
  minimumOrder: 80000,

  // Phương pháp tính giá
  // linear = nội suy tuyến tính giữa các mốc giá
  pricingMethod: 'linear',

  // Làm tròn giá/tờ sau nội suy
  sheetPriceRoundStep: 100,

  // Làm tròn đơn giá/tem
  unitPriceRoundStep: 1,

  // Vật liệu IST đang cho khách lẻ chọn
  // RIRO có nhiều vật liệu hơn, nhưng landing page IST chỉ giữ 3 loại cho dễ dùng.
  materials: {
    paper: {
      label: 'Decal giấy',
      sheetWidth: 310,
      sheetHeight: 340,
      extraFeePerSheet: 0,
    },

    plastic: {
      label: 'Decal nhựa',
      sheetWidth: 310,
      sheetHeight: 340,
      extraFeePerSheet: 1000,
    },

    'clear-plastic': {
      label: 'Decal nhựa trong',
      sheetWidth: 310,
      sheetHeight: 340,
      extraFeePerSheet: 3000,
    },
  },

  // Bảng giá gốc/tờ theo logic RIRO cho decal giấy thường.
  // Các vật liệu khác = giá giấy thường + phụ phí vật liệu.
  // RIRO có các mốc: 1, 5, 10, 50, 100, 200, 300, 500, 700,
  // 1.000, 2.000, 3.000, 5.000, 10.000, 20.000 tờ.
  // IST giữ đến 10.000 tờ là đủ cho khách lẻ.
  baseSheetPriceTable: [
    { sheets: 1, price: 30000 },
    { sheets: 5, price: 20000 },
    { sheets: 10, price: 15000 },
    { sheets: 20, price: 12000 },
    { sheets: 30, price: 10000 },
    { sheets: 40, price: 8000 },
    { sheets: 50, price: 7000 },
    { sheets: 100, price: 6000 },
    { sheets: 200, price: 5000 },
    { sheets: 300, price: 4800 },
    { sheets: 500, price: 4500 },
    { sheets: 700, price: 4200 },
    { sheets: 1000, price: 4000 },
    { sheets: 2000, price: 3800 },
    { sheets: 3000, price: 3700 },
    { sheets: 5000, price: 3600 },
    { sheets: 10000, price: 3500 },
  ],

  // Cán màng: giữ logic hiện tại của IST
  // 700đ/tờ, tối thiểu 20.000đ
  laminationFees: {
    none: {
      label: 'Không cán màng',
      feePerSheet: 0,
      minFee: 0,
      maxFee: null,
    },

    glossy: {
      label: 'Màng bóng',
      feePerSheet: 700,
      minFee: 20000,
      maxFee: null,
    },

    matte: {
      label: 'Màng mờ',
      feePerSheet: 700,
      minFee: 20000,
      maxFee: null,
    },
  },

  // Landing page IST không thể hiện VAT
  vat: {
    enabled: false,
    rate: 0,
  },

  // Landing page IST hướng khách lẻ, không áp dụng đại lý
  customerDiscount: {
    enabled: false,
    defaultCustomerType: 'regular',
  },

  // Tạm bỏ các loại gia công phức tạp của RIRO
  finishingFees: {
    enabled: false,
  },

  // Mốc hiển thị trong popup "Xem giá theo số lượng"
  referenceQuantities: [
    100,
    200,
    500,
    1000,
    2000,
    3000,
    5000,
    10000,
  ],
}
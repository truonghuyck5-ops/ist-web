export const hoaDonPricingConfig = {
  productName: 'Hóa đơn - Phiếu thu - Biểu mẫu',

  sizes: {
    A5: {
      label: 'A5 - phổ biến nhất',
      description: 'Phù hợp shop, cửa hàng, ghi thông tin cơ bản',
      finishedSize: '14 x 20cm',
      plies: {
        '1': {
          label: '1 liên',
          note: 'Nội dung in 1 màu xanh hoặc đỏ hoặc đen. Khổ thành phẩm 14x20cm. Cấn răng cưa đường xé, đóng cuốn 100 tờ.',
          quantities: [
            { qty: 5, unitPrice: 30000 },
            { qty: 10, unitPrice: 20000 },
            { qty: 20, unitPrice: 17000 },
            { qty: 50, unitPrice: 15000 },
            { qty: 100, unitPrice: 14000 },
          ],
        },
        '2': {
          label: '2 liên',
          note: 'Nội dung in 1 màu xanh hoặc đỏ hoặc đen. Khổ thành phẩm 14x20cm. Cấn răng cưa đường xé, đóng cuốn 100 tờ / 50 bộ.',
          quantities: [
            { qty: 10, unitPrice: 35000 },
            { qty: 20, unitPrice: 22000 },
            { qty: 50, unitPrice: 20000 },
            { qty: 100, unitPrice: 18000 },
          ],
        },
      },
    },

    A6: {
      label: 'A6 - nhỏ gọn',
      description: 'Phù hợp quán ăn, quán nước, ghi nhanh',
      finishedSize: '10 x 14cm',
      plies: {
        '1': {
          label: '1 liên',
          note: 'Nội dung in 1 màu xanh hoặc đỏ hoặc đen. Khổ thành phẩm 10x14cm. Cấn răng cưa đường xé, đóng cuốn 100 tờ.',
          quantities: [
            { qty: 10, unitPrice: 17000 },
            { qty: 20, unitPrice: 12000 },
            { qty: 40, unitPrice: 10000 },
            { qty: 80, unitPrice: 9000 },
            { qty: 120, unitPrice: 8000 },
          ],
        },
        '2': {
          label: '2 liên',
          note: 'Nội dung in 1 màu xanh hoặc đỏ hoặc đen. Khổ thành phẩm 10x14cm. Cấn răng cưa đường xé, đóng cuốn 100 tờ / 50 bộ.',
          quantities: [
            { qty: 20, unitPrice: 20000 },
            { qty: 40, unitPrice: 15000 },
            { qty: 80, unitPrice: 12000 },
            { qty: 120, unitPrice: 11000 },
          ],
        },
      },
    },

    A4: {
      label: 'A4 - nhiều thông tin',
      description: 'Phù hợp doanh nghiệp, biểu mẫu nhiều dòng/cột',
      finishedSize: '20 x 29cm',
      plies: {
        '1': {
          label: '1 liên',
          note: 'Nội dung in 1 màu xanh hoặc đỏ hoặc đen. Khổ thành phẩm 20x29cm. Cấn răng cưa đường xé, đóng cuốn 100 tờ.',
          quantities: [
            { qty: 5, unitPrice: 40000 },
            { qty: 10, unitPrice: 34000 },
            { qty: 20, unitPrice: 32000 },
            { qty: 50, unitPrice: 30000 },
            { qty: 100, unitPrice: 28000 },
          ],
        },
        '2': {
          label: '2 liên',
          note: 'Nội dung in 1 màu xanh hoặc đỏ hoặc đen. Khổ thành phẩm 20x29cm. Cấn răng cưa đường xé, đóng cuốn 100 tờ / 50 bộ.',
          quantities: [
            { qty: 5, unitPrice: 70000 },
            { qty: 10, unitPrice: 45000 },
            { qty: 30, unitPrice: 40000 },
            { qty: 50, unitPrice: 36000 },
          ],
        },
      },
    },
  },

  plyOptions: [
    {
      value: '1',
      label: '1 liên',
    },
    {
      value: '2',
      label: '2 liên',
    },
  ],

  default: {
    size: 'A5',
    ply: '1',
  },
}
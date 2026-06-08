export const salesGroups = [
  {
    id: 'all',
    label: 'Tất cả',
  },
  {
    id: 'in-an',
    label: 'In ấn',
  },
  {
    id: 'quang-cao',
    label: 'Bảng hiệu',
  },
  {
    id: 'combo',
    label: 'Combo',
  },
]

export const salesProducts = [
  {
  id: 'tem-nhan',
  group: 'in-an',
  name: 'In tem nhãn',
  shortDesc: 'Decal giấy, decal nhựa, decal trong, sticker sản phẩm.',
  calculatorType: 'tem-nhan',

  driveLinks: {
    main: 'https://drive.google.com/drive/folders/1LlUO9i7_4Sj0krD-jdhr8wr7SAB_mc_6?usp=sharing',
    bestImages: '',
    priceImages: '',
  },

  tags: [
    'tem nhãn',
    'sticker',
    'decal',
    'decal giấy',
    'decal nhựa',
    'decal trong',
    'tem sản phẩm',
    'tem mỹ phẩm',
    'tem thực phẩm',
    'tem trà sữa',
    'tem logo',
    'bế tem',
  ],

  notes: [
    'Tem nhãn là sản phẩm dễ bán, phù hợp nhiều nhóm khách như shop, mỹ phẩm, thực phẩm, trà sữa, đặc sản, sản phẩm đóng gói.',
    'Cần hỏi rõ kích thước, số lượng, chất liệu decal và có cán màng hay không trước khi báo giá.',
    'Số lượng càng nhiều thì đơn giá càng tốt.',
    'Tem nhỏ dưới 5x5cm sản xuất cực hơn, cần tính phụ phí theo logic calculator.',
    'IST có thể bế theo hình bất kỳ: tròn, vuông, oval, bo góc hoặc theo mẫu thiết kế.',
    'Nếu khách chưa có file, IST có thể hỗ trợ thiết kế/bố cục tem cơ bản.',
  ],

  questions: [
    'Anh/chị cần tem kích thước ngang x cao bao nhiêu mm?',
    'Số lượng tem cần in khoảng bao nhiêu?',
    'Tem dùng để dán lên sản phẩm gì?',
    'Mình muốn decal giấy, decal nhựa hay decal nhựa trong?',
    'Có cần cán màng để bảo vệ bề mặt tem không?',
    'Tem cần bế theo hình tròn, vuông, bo góc hay theo hình riêng?',
    'Anh/chị đã có file thiết kế/logo/nội dung tem chưa?',
    'Tem dùng trong nhà, ngoài trời hay dán lên sản phẩm ướt/lạnh?',
  ],

  pricingRules: [
    'Giá tem nhãn được tính theo kích thước, chất liệu, cán màng và số lượng.',
    'Calculator trong Sales Portal dùng để báo giá nhanh nội bộ, giá thực tế có thể điều chỉnh theo file thiết kế và độ khó sản xuất.',
    'Kích thước tem tối thiểu nên từ 20mm trở lên, tối đa theo giới hạn calculator hiện tại.',
    'Tem càng nhỏ thì càng khó gia công, calculator đã có phụ phí tem nhỏ theo diện tích.',
    'Nếu khách cần tem số lượng rất ít, cần kiểm tra giá tối thiểu trước khi báo.',
    'Nếu khách yêu cầu vật liệu đặc biệt, cán màng đặc biệt, bế quá phức tạp hoặc tiến độ gấp, cần hỏi lại người phụ trách.',
    'Không báo giá chỉ dựa trên hình mẫu nếu chưa rõ kích thước và số lượng.',
  ],

  scripts: [
    {
      title: 'Mẫu hỏi thông tin ban đầu',
      content: 'Dạ tem nhãn bên em có thể in decal giấy, decal nhựa hoặc decal trong, bế theo hình bất kỳ. Anh/chị gửi giúp em kích thước tem, số lượng cần in và mẫu/logo/nội dung để em báo giá sát hơn nhé.',
    },
    {
      title: 'Mẫu tư vấn chất liệu',
      content: 'Dạ nếu tem dùng dán sản phẩm khô, chi phí tiết kiệm thì mình có thể dùng decal giấy. Nếu cần bền hơn, chống nước tốt hơn thì nên dùng decal nhựa. Nếu muốn nền trong suốt để dán lên chai/lọ/hộp thì dùng decal nhựa trong ạ.',
    },
    {
      title: 'Mẫu gửi báo giá',
      content: 'Dạ em gửi mình giá tham khảo theo kích thước, chất liệu và số lượng mình chọn. Giá có thể thay đổi nhẹ nếu file thiết kế cần xử lý thêm, tem bế quá phức tạp hoặc cần cán màng/gia công đặc biệt ạ.',
    },
    {
      title: 'Mẫu chốt đơn / xin file',
      content: 'Dạ nếu mình chốt làm tem, anh/chị gửi giúp em file thiết kế/logo/nội dung cần in. Nếu chưa có file, bên em có thể hỗ trợ bố cục mẫu cơ bản để mình duyệt trước khi sản xuất ạ.',
    },
  ],
},

{
  id: 'hoa-don',
  group: 'in-an',
  name: 'In hóa đơn - biểu mẫu',
  shortDesc: 'Hóa đơn bán hàng, phiếu thu, phiếu chi, biên nhận, biểu mẫu.',
  calculatorType: 'hoa-don',

  driveLinks: {
    main: 'https://drive.google.com/drive/folders/1FFKqVSPourcp4l8vsK7ez2cH348M500l?usp=drive_link',
    bestImages: '',
    priceImages: '',
  },

  tags: [
    'hóa đơn',
    'phiếu thu',
    'phiếu chi',
    'biên nhận',
    'biểu mẫu',
    'A4',
    'A5',
    'A6',
    '1 liên',
    '2 liên',
  ],

  notes: [
    'A5 là khổ phổ biến nhất cho shop, cửa hàng, cơ sở kinh doanh.',
    'A6 nhỏ gọn, phù hợp quán ăn, quán nước, khách cần ghi nhanh.',
    'A4 phù hợp biểu mẫu nhiều thông tin, doanh nghiệp, phiếu giao nhận, hợp đồng mẫu.',
    '1 liên phù hợp khi khách chỉ cần ghi và lưu nội bộ.',
    '2 liên phù hợp khi khách cần giao 1 liên cho khách hàng và giữ lại 1 liên để đối soát.',
  ],

  questions: [
    'Anh/chị cần in khổ A4, A5 hay A6?',
    'Mình cần 1 liên hay 2 liên?',
    'Số lượng khoảng bao nhiêu cuốn?',
    'Mình muốn in mực đỏ, xanh hay đen?',
    'Anh/chị có mẫu cũ hoặc nội dung cần in chưa?',
    'Có cần IST hỗ trợ thiết kế/bố cục lại mẫu không?',
  ],

  pricingRules: [
    'Chỉ báo giá nhanh theo các mốc số lượng có sẵn trong Sales Portal.',
    'Nếu khách cần số lượng lẻ ngoài bảng, cần hỏi lại người phụ trách trước khi báo.',
    'Giá mặc định áp dụng cho in 1 màu: đỏ, xanh hoặc đen.',
    'Nếu khách yêu cầu in màu, giấy đặc biệt, thiết kế phức tạp hoặc quy cách khác, phải báo giá riêng.',
    'Giá trên Sales Portal là giá tham khảo nội bộ để tư vấn nhanh, có thể điều chỉnh theo tình huống thực tế.',
  ],

  scripts: [
    {
      title: 'Mẫu hỏi thông tin ban đầu',
      content: 'Dạ hóa đơn bên em có các khổ thông dụng A4, A5, A6; in 1 liên hoặc 2 liên. Anh/chị gửi giúp em mẫu cũ hoặc nội dung cần in, số lượng dự kiến và màu mực muốn in để em tư vấn khổ phù hợp và báo giá nhanh cho mình ạ.',
    },
    {
      title: 'Mẫu gửi báo giá',
      content: 'Dạ em gửi mình giá tham khảo in hóa đơn theo quy cách mình chọn. Giá đã tính theo số lượng cuốn, in 1 màu, có cấn răng cưa đường xé và đóng cuốn hoàn thiện. Nếu mình chốt mẫu/nội dung, bên em sẽ kiểm tra file và xác nhận lại thời gian hoàn thành ạ.',
    },
    {
      title: 'Mẫu chốt đơn / xin file',
      content: 'Dạ nếu mình làm theo quy cách này, anh/chị gửi giúp em logo, tên cửa hàng/công ty, số điện thoại, địa chỉ và các nội dung cần thể hiện trên hóa đơn. Nếu có mẫu cũ thì gửi mẫu cũ sẽ nhanh và chính xác hơn ạ.',
    },
  ],
},

{
  id: 'tui-xop',
  group: 'in-an',
  name: 'In túi xốp',
  shortDesc: 'In logo, tên thương hiệu, thông tin liên hệ lên túi xốp, túi nylon.',
  calculatorType: 'tui-xop',

  driveLinks: {
    main: 'https://drive.google.com/drive/folders/1oWPxAEYQ6Ws6V_-19UoFp7CyXjOn4Aft?usp=sharing',
    bestImages: '',
    priceImages: '',
  },

  tags: [
    'túi xốp',
    'túi nylon',
    'in túi xốp',
    'in logo túi',
    'shop quần áo',
    'shop mỹ phẩm',
    'ăn uống',
    'SME',
    'in lụa',
  ],

  notes: [
    'Phù hợp shop quần áo, mỹ phẩm, ăn uống, cửa hàng bán lẻ và SME cần túi đựng đồ chuyên nghiệp.',
    'Túi xốp thường báo giá theo kg, tùy size túi, màu túi, số màu in và số lượng đặt.',
    'Khách shop có khả năng quay lại thường xuyên có thể tính giá mềm hơn để giữ khách.',
    'Khách lớn đặt số lượng nhiều hoặc tái sử dụng thường xuyên có thể deal giá tốt hơn, nhưng không nên dưới mức tối thiểu.',
    'Đơn số lượng ít vẫn nhận được nhưng cần cộng phụ phí vì setup in và công chuẩn bị vẫn tốn thời gian.',
    'Nếu khách đem túi đến in gia công, cần xem túi thực tế và số lượng túi/kg trước khi báo giá.',
  ],

  questions: [
    'Anh/chị dùng túi để đựng sản phẩm gì?',
    'Mình cần túi màu gì?',
    'Túi size to hay nhỏ? Có size cụ thể không?',
    'Thường mình làm khoảng bao nhiêu kg?',
    'In 1 mặt hay 2 mặt?',
    'Anh/chị đã có logo/file in chưa?',
    'Mình cần IST cung cấp túi luôn hay khách đem túi tới in gia công?',
  ],

  pricingRules: [
    'Mặc định sản phẩm là túi PE hột xoài, loại túi khác hãy trao đổi lại với người phụ trách',
    'Giá thông thường: 75.000đ/kg, áp dụng cho in 1 màu, 1 mặt, số lượng 10kg trở lên.',
    'Khách shop tiềm năng, có khả năng quay lại thường xuyên: có thể tính 70.000đ/kg.',
    'Khách lớn, đặt số lượng nhiều hoặc tái sử dụng thường xuyên: có thể deal 65.000đ/kg, đây là mức tối thiểu.',
    'Đơn 5kg: tính 75.000đ/kg và cộng phụ phí 50.000đ.',
    'Đơn 1–4kg: tính 75.000đ/kg và cộng phụ phí 100.000đ.',
    'In 2 mặt: cộng thêm công in theo kg. Mặc định cộng 15.000đ/kg, trường hợp khó có thể cân nhắc 20.000đ/kg.',
    'In gia công khi khách đem túi lại: tham khảo 15.000–30.000đ/kg, tùy số lượng túi trên 1kg và độ khó khi in.',
    'Nếu khách yêu cầu gấp, in nhiều màu, túi khó bám mực, logo quá chi tiết hoặc số lượng quá ít, cần hỏi lại người phụ trách trước khi báo.',
  ],

  scripts: [
    {
      title: 'Mẫu hỏi thông tin ban đầu',
      content: 'Dạ túi xốp bên em nhận in logo, tên shop và thông tin liên hệ lên túi. Anh/chị cho em hỏi mình dùng túi để đựng sản phẩm gì, cần túi màu gì, size to hay nhỏ và dự kiến làm khoảng bao nhiêu kg để em báo giá sát hơn nhé.',
    },
    {
      title: 'Mẫu tư vấn giá theo kg',
      content: 'Dạ túi xốp thường bên em báo theo kg. Giá sẽ tùy số lượng, màu túi, in 1 màu hay 2 màu và mình cần in 1 mặt hay 2 mặt. Nếu mình làm từ khoảng 10kg thì giá sẽ tốt hơn so với làm số lượng ít ạ.',
    },
    {
      title: 'Mẫu gửi báo giá',
      content: 'Dạ em gửi mình giá tham khảo in túi xốp theo số kg và quy cách mình chọn. Giá đã tính theo in 1 mặt/1 màu nếu không có yêu cầu khác. Nếu in 2 màu, in 2 mặt hoặc túi/logo khó in thì bên em sẽ kiểm tra lại trước khi chốt giá chính xác ạ.',
    },
    {
      title: 'Mẫu chốt đơn / xin file',
      content: 'Dạ nếu mình chốt in túi, anh/chị gửi giúp em logo hoặc nội dung cần in. Nếu có mẫu túi cũ hoặc hình tham khảo thì gửi thêm để bên em kiểm tra size, màu túi và lên mẫu in cho mình duyệt trước khi sản xuất ạ.',
    },
  ],
},

{
  id: 'in-bat-decal-pp',
  group: 'in-an',
  name: 'In ấn Decal - PP - Hiflex',
  shortDesc: 'In bạt hiflex, decal, PP, băng rôn, backdrop, poster, hình dán quảng cáo.',
  calculatorType: 'large-format',

  driveLinks: {
    main: 'https://drive.google.com/drive/folders/1iscwCwhrPEH9T5nGB-QwIrUHLnNF5NHP?usp=sharing',
    bestImages: '',
    priceImages: '',
  },

  tags: [
    'in bạt',
    'hiflex',
    'bạt xám',
    'bạt xuyên đèn',
    'decal',
    'decal sữa',
    'decal trong',
    'decal đế đen',
    'pp',
    'pp có keo',
    'pp không keo',
    'standee',
    'banner',
    'backdrop',
    'băng rôn',
    'nhà rạp',
    'sự kiện',
  ],

  notes: [
    'Sản phẩm phù hợp khách lẻ, khách vãng lai, khách có file thiết kế sẵn, nhà rạp và đơn vị trang trí sự kiện.',
    'Giá phụ thuộc rất nhiều vào kích thước, số lượng, chất liệu, mức độ hỗ trợ thiết kế và có thi công hay không.',
    'Khách có file sẵn và tự thi công thường có giá tốt hơn khách cần IST thiết kế/tư vấn nhiều.',
    'Đối với khách lẻ số lượng ít hoặc thiết kế khó, đơn giá/m² phải cao hơn để bù thời gian xử lý file và tư vấn.',
    'Cần hỏi rõ mục đích sử dụng để tư vấn đúng chất liệu: bạt thường, bạt xám, bạt xuyên đèn, decal, PP...',
    'Nếu khách không có kỹ thuật thi công, nên tư vấn IST hỗ trợ thi công để tránh hư hỏng, lệch, bong, phải làm lại.',
  ],

  questions: [
    'Anh/chị cần in kích thước ngang x cao bao nhiêu?',
    'Số lượng cần in là bao nhiêu tấm?',
    'Mình cần in chất liệu gì: bạt, decal, PP hay chưa rõ cần tư vấn?',
    'Khách đã có file thiết kế sẵn chưa hay cần IST hỗ trợ thiết kế?',
    'File thiết kế đơn giản hay nội dung phức tạp?',
    'Khách lấy về tự thi công hay cần IST thi công?',
    'Nếu có thi công: địa điểm xa hay gần, vị trí dễ hay khó?',
    'Có cần gia công khoen, cán màng, bồi formex, căn khung hoặc treo băng rôn không?',
    'Sản phẩm dùng trong nhà hay ngoài trời?',
  ],

  pricingRules: [
    'Không báo giá nếu chưa rõ kích thước, số lượng và chất liệu.',
    'Cần hỏi rõ khách có file sẵn hay cần thiết kế. Thiết kế càng khó, đơn giá cần cao hơn.',
    'Khách nhà rạp/sự kiện hoặc khách có file sẵn tự thi công có thể áp dụng giá tốt hơn.',
    'Khách lẻ cần hỗ trợ thiết kế, tư vấn nhiều hoặc số lượng ít phải báo giá cao hơn.',
    'Bạt xám 2 da thường cao hơn bạt hiflex thường khoảng 15.000–30.000đ/m².',
    'Decal, PP có keo, PP không keo và decal đế đen có thể xem là nhóm giá tương đương khi báo nhanh.',
    'Cán màng cộng thêm khoảng 20.000–50.000đ/m² tùy số lượng và nhóm khách.',
    'Thi công phải hỏi ảnh hiện trạng, địa điểm, độ khó và khối lượng trước khi chốt giá.',
    'Các đơn đi xa, thi công khó, yêu cầu gấp hoặc file thiết kế phức tạp cần hỏi lại người phụ trách.',
  ],

  scripts: [
    {
      title: 'Mẫu hỏi thông tin ban đầu',
      content: 'Dạ anh/chị gửi giúp em kích thước ngang x cao, số lượng cần in và mình muốn in chất liệu gì như bạt, decal hay PP. Nếu chưa rõ chất liệu, mình cho em biết mục đích sử dụng để em tư vấn loại phù hợp nhé.',
    },
    {
      title: 'Mẫu hỏi file thiết kế / thi công',
      content: 'Dạ mẫu này mình đã có file thiết kế sẵn chưa, hay cần bên em hỗ trợ thiết kế lại? Ngoài ra mình lấy về tự thi công hay cần IST hỗ trợ treo/dán/căn bạt tại vị trí thực tế ạ?',
    },
    {
      title: 'Mẫu gửi báo giá',
      content: 'Dạ em gửi mình giá tham khảo theo kích thước, chất liệu và số lượng mình cung cấp. Giá có thể thay đổi nếu file cần thiết kế lại nhiều, cần cán màng, gia công khoen, bồi formex hoặc có thi công tại công trình ạ.',
    },
    {
      title: 'Mẫu tư vấn thi công',
      content: 'Dạ nếu mình không có kỹ thuật thi công thì em khuyên nên để IST hỗ trợ phần treo/dán/căn bạt. Vì nếu tự làm bị lệch, bong hoặc hư vật liệu thì làm lại sẽ tốn chi phí và thời gian hơn ạ.',
    },
    {
      title: 'Mẫu chốt đơn',
      content: 'Dạ nếu mình chốt in, anh/chị gửi giúp em file thiết kế hoặc nội dung cần làm, kích thước chính xác và thời gian cần lấy. Nếu có vị trí thi công thì gửi thêm ảnh hiện trạng để bên em kiểm tra và báo phần thi công phù hợp ạ.',
    },
  ],
},

// {
//   id: 'nha-rap',
//   group: 'in-an',
//   name: 'Nhà rạp',
//   shortDesc: 'Tính giá nhanh cho nhà rạp: in bạt, decal/PP, bán vật tư, cắt CNC/laser, bảng mica tên dâu rể.',
//   calculatorType: 'nha-rap',

//   driveLinks: {
//     main: 'https://drive.google.com/',
//     bestImages: '',
//     priceImages: '',
//   },

//   tags: [
//     'nhà rạp',
//     'rạp cưới',
//     'in bạt nhà rạp',
//     'bạt hiflex',
//     'bạt xám',
//     'decal pp',
//     'fomex',
//     'alu',
//     'mica',
//     'cắt cnc',
//     'cắt laser',
//     'bảng tên dâu rể',
//   ],

//   notes: [
//     'Nhà rạp là nhóm khách làm thường xuyên, mỗi lần có thể làm số lượng không quá lớn nhưng có tính lặp lại.',
//     'Không phân loại rạp VIP/rạp thường trong calculator; thay vào đó dùng mức thiết kế/file để cộng thêm giá.',
//     'Nếu khách có file sẵn thì không cộng phí thiết kế.',
//     'Nếu cần hỗ trợ thiết kế đơn giản hoặc thiết kế khó thì cộng thêm theo m².',
//     'Nhóm này gồm 3 kiểu báo giá chính: in ấn, bán vật tư, cắt/gia công.',
//     'Các đơn cắt CNC/laser hoặc bảng mica tên dâu rể cần xem file/mẫu trước khi chốt giá cuối.',
//   ],

//   questions: [
//     'Anh/chị cần báo giá nhóm nào: in ấn, bán vật tư hay cắt/gia công?',
//     'Kích thước ngang x cao bao nhiêu cm?',
//     'Số lượng cần làm bao nhiêu?',
//     'Mình đã có file thiết kế sẵn chưa hay cần IST hỗ trợ thiết kế?',
//     'Nếu cắt/gia công: chi tiết dễ, trung bình hay khó?',
//     'Có cần cán màng, dán decal, căn bạt hoặc gia công thêm không?',
//     'Thời gian cần lấy khi nào?',
//   ],

//   pricingRules: [
//     'Giá nhà rạp được tính theo m² hoặc theo nguyên tấm tùy hạng mục.',
//     'Có file sẵn thì không cộng phí thiết kế.',
//     'Thiết kế đơn giản cộng thêm 40.000đ/m².',
//     'Thiết kế khó cộng thêm 80.000đ/m².',
//     'Các giá theo diện tích sử dụng nội suy tuyến tính để giá mượt hơn.',
//     'Bán vật tư nguyên tấm thì tính theo số tấm, không theo m².',
//     'Bảng mica tên dâu rể dùng giá cố định theo m² đã gồm vật tư và gia công.',
//   ],

//   scripts: [
//     {
//       title: 'Mẫu hỏi thông tin ban đầu',
//       content: 'Dạ anh/chị gửi giúp em hạng mục cần làm, kích thước ngang x cao, số lượng và mình đã có file thiết kế sẵn chưa. Nếu là cắt CNC/laser hoặc bảng mica tên dâu rể thì gửi thêm mẫu/file để em kiểm tra và báo giá sát hơn nhé.',
//     },
//     {
//       title: 'Mẫu gửi báo giá',
//       content: 'Dạ em gửi mình giá tham khảo theo kích thước, số lượng và quy cách đã chọn. Giá có thể thay đổi nếu file cần xử lý nhiều, chi tiết cắt khó, gia công gấp hoặc phát sinh vật tư khác ạ.',
//     },
//     {
//       title: 'Mẫu chốt đơn',
//       content: 'Dạ nếu mình chốt làm, anh/chị gửi giúp em file thiết kế hoặc nội dung cần làm, kích thước chính xác và thời gian cần lấy. Bên em sẽ kiểm tra lại file trước khi sản xuất ạ.',
//     },
//   ],
// },

  // {
  //   id: 'bang-hieu',
  //   group: 'quang-cao',
  //   name: 'Bảng hiệu quảng cáo',
  //   shortDesc: 'Bảng hiệu shop, công ty, cơ quan, hộ kinh doanh.',
  //   calculatorType: 'manual',
  //   driveFolder: 'https://drive.google.com/',
  //   tags: ['bảng hiệu', 'hộp đèn', 'chữ nổi', 'thi công', 'shop'],
  //   notes: [
  //     'Không báo giá nếu chưa có kích thước và hiện trạng.',
  //     'Cần xin ảnh mặt bằng để tư vấn đúng vật liệu.',
  //     'Sản phẩm giá trị cao, nên tư vấn kỹ và chuyên nghiệp.',
  //   ],
  //   questions: [
  //     'Kích thước ngang x cao bao nhiêu?',
  //     'Lắp trong nhà hay ngoài trời?',
  //     'Có ảnh hiện trạng không?',
  //     'Muốn bảng bạt, tol decal, alu, chữ nổi hay hộp đèn?',
  //   ],
  //   scripts: [
  //     'Dạ bảng hiệu cần báo giá theo kích thước, chất liệu và vị trí lắp đặt. Anh/chị gửi giúp em hình hiện trạng mặt tiền và kích thước dự kiến, em tư vấn phương án phù hợp cho mình nhé.',
  //   ],
  // },

  // {
  //   id: 'combo-mo-quan',
  //   group: 'combo',
  //   name: 'Combo mở quán',
  //   shortDesc: 'Bảng hiệu, menu, tem nhãn, decal, standee, voucher.',
  //   calculatorType: 'manual',
  //   driveFolder: 'https://drive.google.com/',
  //   tags: ['combo', 'mở quán', 'cafe', 'trà sữa', 'shop', 'spa'],
  //   notes: [
  //     'Combo mở quán nên tư vấn theo ngân sách.',
  //     'Ưu tiên bảng hiệu, menu, decal, tem nhãn.',
  //     'Cần hỏi deadline khai trương.',
  //   ],
  //   questions: [
  //     'Khách mở loại hình gì?',
  //     'Cần những hạng mục nào?',
  //     'Ngân sách dự kiến bao nhiêu?',
  //     'Ngày khai trương khi nào?',
  //     'Đã có logo/bộ nhận diện chưa?',
  //   ],
  //   scripts: [
  //     'Dạ nếu mình đang chuẩn bị mở quán, IST có thể tư vấn trọn gói bảng hiệu, menu, tem nhãn, decal kính, standee khai trương. Anh/chị cho em biết mô hình quán và ngân sách dự kiến để em gợi ý combo phù hợp nhé.',
  //   ],
  // },
]
export const STATIC_COLORS = {
  menuBg: "#f9f9f9", // màu nền thanh menu
  mainBg: "#ffffff", // Màu nền giao diện, nền ô ngày trong tháng, màu chữ
  btnHeader: "#e9e9e9", // màu nút thanh Header, viền border nhạt
  calendarOutMonth: "#f5f5f5", // màu nền ô ngày ngoài tháng của lịch, màu nền giao diện phụ
  sectionBg: "#d9d9d9", // màu nền ô lựa chọn
  decorBar: "#d2d2d2", // màu nền thanh trang trí
  calendarTHBg: "#e1e1e1", // màu nền ô thứ của lịch
  alertSuccess: "#09b640", // màu nền bảng thông báo
  textGray: "#c0c0c0", // màu chữ xám
  borderColor: "#7c7c7c", // màu viền nút màu
  borderDark: "#b2b2b2", // màu viền border xám đậm
  iconGray: "#acacac", // màu icon xám
  borderDarkness: "#2e2e2e", // màu viền border đen
  darkBlue: "#2f8dc3", // Xanh đậm
  darkRed: "#fe0000", // Đỏ đậm
};

export const DEFAULT_DYNAMIC_COLORS = {
  primary: "#fd7f04", // màu chữ, nút, icon (Chủ đạo)
  secondary: "#febe7e", // màu phụ
  inputBG: "#fff6e5", // màu nền ô nhập liệu
};

export const COLORS = {
  ...STATIC_COLORS,
  ...DEFAULT_DYNAMIC_COLORS,
};

export type AppColors = typeof COLORS; // kiểu dữ liệu hệ thống màu

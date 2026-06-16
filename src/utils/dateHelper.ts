/* 1. Định dạng ngày/tháng/năm để hiển thị lên giao diện */
export const DAYS_IN_WEEK = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export const formatFullDate = (dateInput: Date | string): string => {
  const date = new Date(dateInput);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const dayOfWeek = DAYS_IN_WEEK[date.getDay()];

  return `${day}/${month}/${year} (${dayOfWeek})`; // theo dạng 02/06/2026
};

export const formatMonthYear = (dateInput: Date | string): string => {
  const date = new Date(dateInput);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${year}`; // theo dạng 06/2026
};

/* 2. Hỗ trợ Screen lịch */
export const generateCalendarDays = (month: number, year: number) => {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  // Lấy số ngày của tháng TRƯỚC đó
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

  let startDayOfWeek = firstDayOfMonth.getDay();
  startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  const calendarDays = [];

  // Chèn ngày của THÁNG TRƯỚC
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false, // Không phải tháng hiện tại
    });
  }

  // Chèn ngày của THÁNG HIỆN TẠI
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true, // Đúng là tháng hiện tại
    });
  }

  // Chèn ngày của THÁNG TIẾP THEO
  const currentLength = calendarDays.length;
  // Tính xem tuần cuối đang khuyết bao nhiêu ô (nếu chia hết cho 7 thì khuyết 0)
  const remainingCells = currentLength % 7 === 0 ? 0 : 7 - (currentLength % 7);

  for (let i = 1; i <= remainingCells; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
    });
  }

  return calendarDays;
};

/* 3. Hỗ trợ lọc dữ liệu từ AsyncStorage */
// Kiểm tra giao dịch có trong Tháng mình chọn không -> Screen Báo cáo & Ngân sách
export const isTransactionMonth = (
  transactionDate: string | Date,
  targetMonth: number,
  targetYear: number
): boolean => {
  const date = new Date(transactionDate);
  return (
    date.getMonth() + 1 === targetMonth && date.getFullYear() === targetYear
  );
};

export const isTransactionDay = (
  transactionDate: string | Date,
  targetDay: number,
  targetMonth: number,
  targetYear: number
): boolean => {
  const date = new Date(transactionDate);
  return (
    date.getDate() === targetDay &&
    date.getMonth() + 1 === targetMonth &&
    date.getFullYear() === targetYear
  );
};

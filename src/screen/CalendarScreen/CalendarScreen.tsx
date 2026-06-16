import DateMonthSelector from "@/src/components/common/DateMonthSelector";
import { useContext, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { generateCalendarDays, DAYS_IN_WEEK } from "../../utils/dateHelper";
import CalendarGrid from "@/src/components/calendar/CalendarGrid";
import SummaryCard from "@/src/components/common/SummaryCard";
import TransactionRow from "@/src/components/calendar/TransactionRow";
import { TransactionContext } from "../../context/TransactionContext";
import { useNavigation } from "@react-navigation/native";

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { transactions } = useContext(TransactionContext); // Lấy danh sách giao dịch
  const navigation = useNavigation<any>();

  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const calendarDays = generateCalendarDays(month, year);
  const weekDays = [...DAYS_IN_WEEK.slice(1), DAYS_IN_WEEK[0]];

  // 1. Lọc lấy TẤT CẢ giao dịch trong THÁNG/NĂM đang hiển thị trên lịch
  const monthlyTransactions = transactions.filter((t: any) => {
    const transDate = new Date(t.date);
    return (
      transDate.getMonth() === currentDate.getMonth() &&
      transDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // 2. Gom nhóm các giao dịch theo từng ngày (VD: gom tất cả giao dịch ngày 09/06 vào 1 nhóm)
  const groupedTransactions = monthlyTransactions.reduce((acc: any, t: any) => {
    const dateKey = new Date(t.date).toDateString(); // Tạo key từ ngày
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(t);
    return acc;
  }, {});

  // 3. Sắp xếp các nhóm ngày từ Mới nhất -> Cũ nhất
  const sortedDateKeys = Object.keys(groupedTransactions).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });
  return (
    <View className="flex-1">
      <View
        className="items-center justify-center px-5 bg-menuBg border-b border-borderDark"
        style={{ paddingTop: insets.top, height: insets.top + 55 }}
      >
        <Text className="text-[20px] font-medium">Lịch</Text>
      </View>

      <DateMonthSelector
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />

      {/* Lịch */}
      <CalendarGrid
        weekDays={weekDays}
        calendarDays={calendarDays}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        monthlyTransactions={monthlyTransactions}
      />

      <ScrollView>
        {/* Hiển thị Thu nhập/Chi tiêu/Tổng */}
        <SummaryCard monthlyTransactions={monthlyTransactions} />

        {sortedDateKeys.map((dateKey) => {
          const dayTransactions = groupedTransactions[dateKey];
          const transDate = new Date(dateKey);

          // Tính tổng tiền cho ngày này (Chú ý type của bạn đang là "spend")
          const dailyTotal = dayTransactions.reduce((sum: number, t: any) => {
            return t.type === "spend" ? sum - t.amount : sum + t.amount;
          }, 0);

          // Format tiêu đề ngày
          const dayStr = transDate.getDate().toString().padStart(2, "0");
          const monthStr = (transDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");
          const yearStr = transDate.getFullYear();
          const dayOfWeekStr = DAYS_IN_WEEK[transDate.getDay()];
          const displayDateStr = `${dayStr}/${monthStr}/${yearStr} (${dayOfWeekStr})`;

          return (
            <View key={dateKey}>
              {/* Thanh Header của ngày */}
              <View className="flex-row items-center justify-between px-4 py-2 bg-[#f5f5f5] border-b border-borderDark">
                <Text className="text-[14px] font-bold text-black">
                  {displayDateStr}
                </Text>
                <Text className="text-[14px] font-bold text-black">
                  {dailyTotal > 0 ? "+" : ""}
                  {dailyTotal.toLocaleString("vi-VN")}đ
                </Text>
              </View>

              {/* Các giao dịch trong ngày đó */}
              {dayTransactions.map((item: any) => (
                <TransactionRow
                  key={item.id}
                  categoryName={item.categoryName}
                  note={item.note}
                  amount={`${item.amount.toLocaleString("vi-VN")}đ`}
                  onPress={() => {
                    navigation.navigate("TransactionForm", {
                      transaction: item,
                    });
                  }}
                />
              ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

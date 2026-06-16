import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { STATIC_COLORS } from "../../constants/colors";

export default function CalendarGrid({
  weekDays,
  calendarDays,
  currentDate,
  setCurrentDate,
  monthlyTransactions = [], // Nhận dữ liệu từ Component cha
}: any) {
  return (
    <View>
      {/* Các Thứ trong tuần */}
      <View className="flex-row bg-calendarTHBg border-b border-borderDark h-[30px]">
        {weekDays.map((day: string, index: number) => {
          const Saturday = index === 5;
          const Sunday = index === 6;
          const textColor = Saturday
            ? "text-darkBlue"
            : Sunday
              ? "text-darkRed"
              : "text-black";

          return (
            <View
              key={index}
              className="justify-center items-center border-r border-borderDark"
              style={{ width: `${100 / 7}%` }}
            >
              <Text className={`font-medium ${textColor} text-[14px]`}>
                {day}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Các Ngày trong tháng */}
      <View className="flex-row flex-wrap">
        {calendarDays.map((item: any, index: number) => {
          const colIndex = index % 7;
          const Saturday = colIndex === 5;
          const Sunday = colIndex === 6;
          const textColor = Saturday
            ? "text-darkBlue"
            : Sunday
              ? "text-darkRed"
              : "text-black";

          const isSelectedDay =
            item.isCurrentMonth && item.day === currentDate.getDate();

          // TÍNH TỔNG THU & CHI CHO TỪNG Ô NGÀY
          let dailyIncome = 0;
          let dailyExpense = 0;

          if (item.isCurrentMonth) {
            monthlyTransactions.forEach((t: any) => {
              const tDate = new Date(t.date);
              // Khớp đúng ngày trong tháng
              if (tDate.getDate() === item.day) {
                if (t.type === "revenue") dailyIncome += t.amount;
                if (t.type === "spend") dailyExpense += t.amount;
              }
            });
          }

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => {
                if (item.isCurrentMonth) {
                  const newDate = new Date(currentDate);
                  newDate.setDate(item.day);
                  setCurrentDate(newDate);
                }
              }}
              className="h-[50px] justify-between border-b border-r border-borderDark p-1 items-center"
              style={{
                width: `${100 / 7}%`,
                backgroundColor: isSelectedDay
                  ? "#e0f2fe"
                  : item.isCurrentMonth
                    ? STATIC_COLORS.mainBg
                    : STATIC_COLORS.calendarOutMonth,
              }}
            >
              {/* Số ngày */}
              <Text
                className={`text-[13px] w-full text-left ${
                  isSelectedDay ? "font-bold text-blue-600" : textColor
                }`}
              >
                {item.day}
              </Text>

              {/* Chữ số Thu nhập  */}
              <View className="w-full items-start">
                {dailyIncome > 0 && (
                  <Text
                    className="text-[9px] text-darkBlue text-right w-full"
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {dailyIncome.toLocaleString("vi-VN")}
                  </Text>
                )}
                {/* Chữ số Chi tiêu */}
                {dailyExpense > 0 && (
                  <Text
                    className="text-[9px] text-darkRed text-right w-full"
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {dailyExpense.toLocaleString("vi-VN")}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

import { View, Text } from "react-native";
import React from "react";

// Khai báo kiểu dữ liệu cho props truyền vào
interface ReportSummaryProps {
  totalSpend?: number;
  totalExpense?: number;
}

export default function ReportSummary({
  totalSpend = 0,
  totalExpense = 0,
}: ReportSummaryProps) {
  // Tính toán số dư (Thu chi)
  const totalBalance = totalSpend - totalExpense;

  return (
    <View className="px-4 pb-[25px]">
      {/* Hàng 1 */}
      <View className="flex-row gap-x-2 mb-2">
        {/* Khối Chi tiêu */}
        <View className="flex-1 flex-row justify-between items-center bg-mainBg p-3 rounded-lg border border-borderDark">
          <Text className="text-[12px] text-black">Chi tiêu</Text>
          <Text className="text-[20px] font-medium text-darkRed">
            -{totalExpense.toLocaleString("vi-VN")}đ
          </Text>
        </View>

        {/* Khối Thu nhập */}
        <View className="flex-1 flex-row justify-between items-center bg-mainBg p-3 rounded-lg border border-borderDark">
          <Text className="text-[12px] text-black">Thu nhập</Text>
          <Text className="text-[20px] font-medium text-darkBlue">
            +{totalSpend.toLocaleString("vi-VN")}đ
          </Text>
        </View>
      </View>

      {/* HÀNG 2: KHỐI THU CHI TRẢI DÀI FULL MÀN HÌNH */}
      <View className="flex-row justify-between items-center bg-mainBg p-3 rounded-lg border border-borderDark">
        <Text className="text-[12px] text-black">Thu chi</Text>
        <Text className="text-[20px] font-medium text-black">
          {totalBalance >= 0 ? "+" : ""}
          {totalBalance.toLocaleString("vi-VN")}đ
        </Text>
      </View>
    </View>
  );
}

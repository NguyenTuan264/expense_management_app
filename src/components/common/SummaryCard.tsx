import { View, Text } from "react-native";
import React from "react";

interface SummaryCardProps {
  monthlyTransactions?: any[];
}
export default function SummaryCard({
  monthlyTransactions = [],
}: SummaryCardProps) {
  // 1. Tính tổng THU NHẬP (Lọc các giao dịch có type === "revenue")
  const totalIncome = monthlyTransactions
    .filter((t: any) => t.type === "revenue")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  // 2. Tính tổng CHI TIÊU (Lọc các giao dịch có type === "spend")
  const totalExpense = monthlyTransactions
    .filter((t: any) => t.type === "spend")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  // 3. Tính TỔNG (Số dư = Thu nhập - Chi tiêu)
  const totalBalance = totalIncome - totalExpense;
  return (
    <View className="flex-row bg-white py-[15px]">
      {/* Thu nhập */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-[14px] text-black font-medium mb-1">
          Thu nhập
        </Text>
        <Text className="text-[20px] font-medium text-darkBlue">
          {totalIncome.toLocaleString("vi-VN")}đ
        </Text>
      </View>

      {/* Chi tiêu */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-[14px] text-black font-medium mb-1">
          Chi tiêu
        </Text>
        <Text className="text-[20px] font-medium text-darkRed">
          {totalExpense.toLocaleString("vi-VN")}đ
        </Text>
      </View>

      {/*  Tổng */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-[14px] text-black font-medium mb-1">Tổng</Text>
        <Text
          className={`text-[20px] font-medium ${
            totalBalance < 0 ? "text-darkRed" : "text-darkBlue"
          }`}
        >
          {totalBalance > 0 ? "+" : ""}
          {totalBalance.toLocaleString("vi-VN")}đ
        </Text>
      </View>
    </View>
  );
}

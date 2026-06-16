import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS } from "@/src/constants/colors";

interface BudgetTotalProps {
  budget?: number;
  spent?: number;
  onPress?: () => void;
}

export default function BudgetTotal({
  budget = 0,
  spent = 0,
  onPress,
}: BudgetTotalProps) {
  const hasBudget = budget > 0;
  const remaining = budget - spent;

  let percent = 0;
  if (hasBudget) {
    percent = Math.min(Math.round((spent / budget) * 100), 100);
  } else if (spent > 0) {
    percent = 100;
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + "đ";
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      // Đổi thành flex-row để chia component làm 2 cột (Nội dung và Mũi tên)
      className="bg-mainBg py-4 border-b border-borderDark flex-row items-center justify-between"
    >
      {/* CỘT TRÁI: CHỨA TOÀN BỘ NỘI DUNG CHÍNH */}
      <View className="flex-1 mr-3">
        {/* HÀNG 1: TIÊU ĐỀ & TRẠNG THÁI  */}
        <View className="flex-row justify-between items-center">
          <Text className="text-[18px] font-medium text-black">
            Tổng ngân sách
          </Text>

          {!hasBudget && spent === 0 ? (
            <Text className="text-[16px] text-textGray">Chưa đặt</Text>
          ) : (
            <Text
              className={`text-[16px] font-medium ${
                remaining < 0 ? "text-red-500" : "text-black"
              }`}
            >
              Còn lại: {formatCurrency(remaining)}
            </Text>
          )}
        </View>

        {/* HÀNG 2: THANH TIẾN TRÌNH */}
        <View className="flex-row items-center mt-3">
          <View className="flex-1 h-[10px] bg-sectionBg rounded-full overflow-hidden">
            <View
              style={{ width: `${percent}%`, backgroundColor: COLORS.primary }}
              className="h-full rounded-full"
            />
          </View>
          <Text className="text-[14px] text-textGray ml-3 w-[40px] text-right">
            {spent > 0 || hasBudget ? `${percent}%` : "-"}
          </Text>
        </View>

        {/* HÀNG 3: CHÚ THÍCH */}
        {(spent > 0 || hasBudget) && (
          <View className="flex-row justify-between mt-3">
            {/* CỘT TRÁI: NGÂN SÁCH */}
            <Text>
              <Text className="text-[14px] text-textGray">Ngân sách </Text>
              <Text className="text-[16px] font-medium text-textGray">
                {hasBudget ? formatCurrency(budget) : "Chưa đặt"}
              </Text>
            </Text>

            {/* CỘT PHẢI: CHI TIÊU */}
            <Text>
              <Text className="text-[14px] text-textGray">Chi tiêu </Text>
              <Text className="text-[16px] font-medium text-textGray">
                {formatCurrency(spent)}
              </Text>
            </Text>
          </View>
        )}
      </View>

      {/* CỘT PHẢI: CHỈ CHỨA MŨI TÊN NẰM ĐỘC LẬP */}
      <AntDesign name="right" size={24} color={COLORS.iconGray} />
    </TouchableOpacity>
  );
}

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS } from "@/src/constants/colors";

interface BudgetItemProps {
  icon?: string;
  color?: string;
  name: string;
  budget?: number; // Ngân sách thiết lập (Mặc định: 0)
  spent?: number; // Tiền đã chi tiêu thực tế (Mặc định: 0)
  onPress?: () => void;
}

export default function BudgetItem({
  icon = "help-circle-outline",
  color = "#FF8C00", // Mặc định là màu cam
  name,
  budget = 0,
  spent = 0,
  onPress,
}: BudgetItemProps) {
  // 1. Logic kiểm tra trạng thái
  const hasBudget = budget > 0;
  const remaining = budget - spent;

  // 2. Tính toán % lấp đầy của thanh tiến trình
  let percent = 0;
  if (hasBudget) {
    percent = Math.min(Math.round((spent / budget) * 100), 100);
  } else if (spent > 0) {
    percent = 100;
  }

  // 3. Hàm hỗ trợ format tiền tệ
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + "đ";
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="bg-mainBg py-4 border-b border-borderDark flex-row items-center justify-between"
    >
      {/* CỘT TRÁI: CHỨA TOÀN BỘ NỘI DUNG CHÍNH */}
      <View className="flex-1 mr-3">
        {/* HÀNG 1: ICON, TIÊU ĐỀ & TRẠNG THÁI SỐ DƯ */}
        <View className="flex-row justify-between items-center">
          {/* Icon + Tên */}
          <View className="flex-row items-center">
            <Ionicons name={icon as any} size={28} color={color} />
            <Text className="text-[18px] font-medium text-black ml-3">
              {name}
            </Text>
          </View>

          {/* Trạng thái góc phải */}
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

        {/* HÀNG 2: THANH TIẾN TRÌNH (PROGRESS BAR) */}
        <View className="flex-row items-center mt-3">
          <View className="flex-1 h-[10px] bg-sectionBg rounded-full overflow-hidden">
            <View
              style={{ width: `${percent}%`, backgroundColor: color }}
              className="h-full rounded-full"
            />
          </View>
          <Text className="text-[14px] text-textGray ml-3 w-[40px] text-right">
            {spent > 0 || hasBudget ? `${percent}%` : "-"}
          </Text>
        </View>

        {/* HÀNG 3: CHÚ THÍCH DƯỚI CÙNG */}
        {(spent > 0 || hasBudget) && (
          <View className="flex-row justify-between mt-2">
            {/* Lồng thẻ Text để định dạng 14px và 16px trên cùng 1 dòng */}
            <Text>
              <Text className="text-[14px] text-textGray">Ngân sách </Text>
              <Text className="text-[16px] font-medium text-textGray">
                {hasBudget ? formatCurrency(budget) : "Chưa đặt"}
              </Text>
            </Text>

            <Text>
              <Text className="text-[14px] text-textGray">Chi tiêu </Text>
              <Text className="text-[16px] font-medium text-textGray">
                {formatCurrency(spent)}
              </Text>
            </Text>
          </View>
        )}
      </View>

      {/* CỘT PHẢI: CHỈ CHỨA MŨI TÊN */}
      <AntDesign name="right" size={24} color={COLORS.iconGray} />
    </TouchableOpacity>
  );
}

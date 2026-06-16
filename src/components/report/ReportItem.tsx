import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CategoryContext } from "../../context/CategoryContext";

interface ReportItemProps {
  icon?: string;
  color: string;
  name: string;
  amount: number;
  percent: number;
  onPress?: () => void;
  isFirst?: boolean;
}

export default function ReportItem({
  icon,
  color,
  name,
  amount,
  percent,
  onPress,
  isFirst = false,
}: ReportItemProps) {
  // Lấy icon từ kho danh mục
  const { spendCategories = [], revenueCategories = [] } =
    useContext(CategoryContext) || {};

  // Gộp Thu/Chi
  const allCategories = [...spendCategories, ...revenueCategories];

  // Tìm tên danh mục khớp
  const matchedCategory = allCategories.find((cat: any) => cat.name === name);

  // Hiển thị icon
  const displayIcon = matchedCategory?.icon || "help-circle-outline";
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`flex-row items-center justify-between px-4 py-4 border-b border-borderDark ${
        isFirst ? "border-t" : ""
      }`}
    >
      {/* Icon + Tên danh mục */}
      <View className="flex-row items-center">
        <Ionicons name={displayIcon} size={24} color={color} />
        <Text className="text-[18px] text-black ml-3">{name}</Text>
      </View>

      {/* Số tiền + Phần trăm + Mũi tên */}
      <View className="flex-row items-center">
        <Text className="text-[18px] text-black mr-3">
          {amount.toLocaleString("vi-VN")}đ
        </Text>
        <Text className="text-[12px] text-gray-500 mr-2">{percent}%</Text>
        <AntDesign name="right" size={16} color="#A0A0A0" />
      </View>
    </TouchableOpacity>
  );
}

import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import { CategoryContext } from "../../context/CategoryContext";

interface TransactionRowProps {
  categoryName: string;
  note?: string;
  amount: string;
  onPress?: () => void;
}

export default function TransactionRow({
  categoryName,
  note,
  amount,
  onPress,
}: TransactionRowProps) {
  // Lấy icon từ Context
  const { spendCategories, revenueCategories } = useContext(CategoryContext);

  // Gộp cả mảng Thu và mảng Chi lại để tìm kiếm
  const allCategories = [
    ...(spendCategories || []),
    ...(revenueCategories || []),
  ];

  // Tìm xem danh mục nào có tên khớp với biến categoryName truyền vào
  const matchedCategory = allCategories.find(
    (cat: any) => cat.name === categoryName
  );

  // Nếu tìm thấy thì dùng icon/màu của nó, nếu không thấy thì dùng icon mặc định
  const displayIcon = matchedCategory?.icon || "help-circle-outline";
  const displayColor = matchedCategory?.color || "#acacac";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row items-center justify-between px-4 py-4 bg-mainBg border-b border-borderDark"
    >
      {/* CỘT TRÁI: Icon + Tên + Ghi chú */}
      <View className="flex-row items-center flex-1 pr-2">
        <View className="mr-3">
          <Ionicons name={displayIcon} size={24} color={displayColor} />
        </View>

        {/* Tên danh mục và Ghi chú */}
        <View className="flex-row items-baseline flex-shrink">
          <Text className="text-[18px] font-medium text-black">
            {categoryName}
          </Text>
          {note && (
            <Text
              className="text-[14px] text-black ml-2 flex-shrink"
              numberOfLines={1}
            >
              ({note})
            </Text>
          )}
        </View>
      </View>

      {/* CỘT PHẢI: Số tiền + Mũi tên */}
      <View className="flex-row items-center">
        <Text className="text-[18px] font-medium text-black mr-2">
          {amount}
        </Text>
        <AntDesign name="right" size={16} color="#A0A0A0" />
      </View>
    </TouchableOpacity>
  );
}

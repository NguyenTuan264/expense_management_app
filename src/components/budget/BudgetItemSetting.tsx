import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  InputAccessoryView,
  Keyboard,
} from "react-native";
import React, { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

interface BudgetItemSettingProps {
  icon?: string;
  color?: string;
  name: string;
  budget: number;
  onPress?: () => void;
  onBudgetChange: (val: number) => void;
}

export default function BudgetItemSetting({
  icon = "help-circle-outline",
  color = "#FF8C00",
  name,
  budget = 0,
  onPress,
  onBudgetChange,
}: BudgetItemSettingProps) {
  // Hiển thị giá trị được cha truyền xuống
  const displayValue = budget > 0 ? budget.toLocaleString("vi-VN") : "";

  const inputRef = useRef<TextInput>(null);

  // TẠO ID ĐỘC NHẤT CHO TỪNG DANH MỤC TRÁNH BỊ ĐỤNG NHAU TRÊN IOS
  const localAccessID = `keyboard_${name}`;

  const handleChangeText = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    const value = numericText === "" ? 0 : parseInt(numericText);
    onBudgetChange(value); // Gọi hàm cha để cập nhật state
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          inputRef.current?.focus();
          if (onPress) onPress();
        }}
        className="flex-row items-center justify-between px-4 py-4 border-b border-borderDark bg-mainBg"
      >
        <View className="flex-row items-center">
          <Ionicons name={icon as any} size={28} color={color} />
          <Text className="text-[18px] font-medium text-black ml-3">
            {name}
          </Text>
        </View>

        <View className="flex-row items-center">
          <TextInput
            ref={inputRef}
            className={`text-right p-0 m-0 min-w-[80px] ${
              budget > 0
                ? "text-[18px] font-medium text-black"
                : "text-[18px] font-medium text-textGray"
            }`}
            placeholder="Chưa đặt"
            keyboardType="numeric"
            value={displayValue}
            onChangeText={handleChangeText}
            inputAccessoryViewID={localAccessID} // Dùng ID riêng biệt
          />

          {budget > 0 && (
            <Text className="text-[18px] font-medium text-black ml-[2px]">
              đ
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {/* THANH OK CỦA RIÊNG TỪNG DANH MỤC */}
      {Platform.OS === "ios" && (
        <InputAccessoryView nativeID={localAccessID}>
          <View className="bg-btnHeader flex-row justify-center px-4 py-2 border-t border-borderDark">
            <TouchableOpacity onPress={() => Keyboard.dismiss()}>
              {/* Nếu bạn chưa khai báo màu primary ở đây, cứ dùng mã hex tạm cho an toàn */}
              <Text className="text-primary font-bold text-[20px]">OK</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      )}
    </>
  );
}

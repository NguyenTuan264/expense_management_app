import { View, Text } from "react-native";

interface TotalBarProps {
  total: number;
}

export default function TotalBar({ total = 0 }: TotalBarProps) {
  return (
    <View className="h-[50px] mt-10 border-t border-b border-borderDark bg-mainBg">
      <View className="px-5 h-full flex-row justify-between items-center">
        <Text className="text-[18px] font-medium">Tổng</Text>
        <Text className="text-[18px] font-medium">
          {total.toLocaleString("vi-VN")}đ
        </Text>
      </View>
    </View>
  );
}

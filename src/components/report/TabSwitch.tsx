import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface TabSwitchProps {
  activeTab: "spend" | "revenue"; // Trạng thái tab đang chọn
  setActiveTab: (tab: "spend" | "revenue") => void; // Hàm chuyển tab
}

export default function TabSwitch({ activeTab, setActiveTab }: TabSwitchProps) {
  return (
    <View className="flex-row bg-mainBg pt-3 px-[25px]">
      {/* TAB CHI TIÊU */}
      <TouchableOpacity
        activeOpacity={0.7}
        className={`flex-1 items-center pb-2 border-b-[3px] ${
          activeTab === "spend" ? "border-primary" : "border-borderDark"
        }`}
        onPress={() => setActiveTab("spend")}
      >
        <Text
          className={`text-[18px] font-medium ${
            activeTab === "spend" ? "text-primary" : "text-borderDark"
          }`}
        >
          Chi tiêu
        </Text>
      </TouchableOpacity>

      {/* TAB THU NHẬP */}
      <TouchableOpacity
        activeOpacity={0.7}
        className={`flex-1 items-center pb-2 border-b-[3px] ${
          activeTab === "revenue" ? "border-primary" : "border-borderDark"
        }`}
        onPress={() => setActiveTab("revenue")}
      >
        <Text
          className={`text-[18px] font-medium ${
            activeTab === "revenue" ? "text-primary" : "text-borderDark"
          }`}
        >
          Thu nhập
        </Text>
      </TouchableOpacity>
    </View>
  );
}

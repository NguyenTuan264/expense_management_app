import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { formatMonthYear } from "../../utils/dateHelper";
import ScrollChooseTime from "./ScrollChooseTime";

export default function DateMonthSelector({
  currentDate = new Date(),
  setCurrentDate,
}: any) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const lastDay = new Date(year, currentDate.getMonth() + 1, 0).getDate();

  return (
    <View className="bg-mainBg">
      <View className="flex-row items-center justify-center gap-x-2 pt-[7px] pb-[15px]">
        <TouchableOpacity onPress={handlePrevMonth} className="p-2">
          <AntDesign name="left" size={16} color="black" />
        </TouchableOpacity>

        {/* Mở Scroll Choose Time */}
        <TouchableOpacity
          className="w-[352px] h-[36px] rounded-lg justify-center items-center bg-inputBG"
          onPress={() => setIsPickerVisible(true)}
        >
          <View className="flex-row items-center gap-x-2">
            <Text className="text-[20px] font-medium">
              {formatMonthYear(currentDate)}
            </Text>
            <Text className="text-[12px] font-normal">
              (01/{month} - {lastDay}/{month})
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNextMonth} className="p-2">
          <AntDesign name="right" size={16} color="black" />
        </TouchableOpacity>
      </View>

      {
        <ScrollChooseTime
          isVisible={isPickerVisible}
          currentDate={currentDate}
          onConfirm={(date) => {
            setCurrentDate(date);
            setIsPickerVisible(false);
          }}
          onCancel={() => {
            setIsPickerVisible(false);
          }}
        />
      }
    </View>
  );
}

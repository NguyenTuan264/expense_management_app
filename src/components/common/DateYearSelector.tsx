import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";

export default function DateYearSelector({
  currentDate = new Date(),
  setCurrentDate,
}: any) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const year = currentDate.getFullYear();

  // Giảm Năm
  const handlePrevYear = () => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year - 1);
    setCurrentDate(newDate);
  };

  // Tăng năm
  const handleNextYear = () => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year + 1);
    setCurrentDate(newDate);
  };

  // Hàm chọn năm từ Modal
  const selectYear = (selectedYear: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(selectedYear);
    setCurrentDate(newDate);
    setIsPickerVisible(false); // Ẩn modal sau khi chọn
  };

  // Tạo động danh sách các năm xung quanh năm hiện tại
  const yearsList = Array.from({ length: 4 }, (_, i) => year - 1 + i);

  return (
    <View className="bg-mainBg">
      <View className="flex-row items-center justify-center gap-x-2 pt-[7px] pb-[15px]">
        {/* Nút lùi 1 năm */}
        <TouchableOpacity onPress={handlePrevYear} className="p-2">
          <AntDesign name="left" size={16} color="black" />
        </TouchableOpacity>

        {/* Khối hiển thị Năm */}
        <TouchableOpacity
          className="w-[352px] h-[36px] rounded-lg justify-center items-center bg-inputBG"
          onPress={() => setIsPickerVisible(true)}
        >
          <View className="flex-row items-center gap-x-2">
            <Text className="text-[20px] font-medium ">{year}</Text>
            <Text className="text-[12px] font-normal ">(01/01 - 31/12)</Text>
          </View>
        </TouchableOpacity>

        {/* Nút tiến 1 năm */}
        <TouchableOpacity onPress={handleNextYear} className="p-2">
          <AntDesign name="right" size={16} color="black" />
        </TouchableOpacity>
      </View>

      {/* MODAL BẢNG CHỌN NĂM (Popup nền xám) */}
      <Modal
        transparent={true}
        visible={isPickerVisible}
        animationType="fade"
        onRequestClose={() => setIsPickerVisible(false)}
      >
        {/* Lớp phủ, nhấn ra ngoài để đóng */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.6)", // Nền đen mờ 60%
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPressOut={() => setIsPickerVisible(false)}
        >
          <TouchableWithoutFeedback>
            {/* Khối Popup xám */}
            <View className="bg-sectionBg rounded-xl w-[400px] max-h-[300px] overflow-hidden">
              <ScrollView showsVerticalScrollIndicator={false}>
                {yearsList.map((y, index) => (
                  <TouchableOpacity
                    key={y}
                    onPress={() => selectYear(y)}
                    className={`py-4 items-center ${
                      index !== yearsList.length - 1
                        ? "border-b border-gray-400"
                        : "" // Kẻ vạch ngang chia cách các dòng
                    }`}
                  >
                    <Text
                      className={`text-[20px] text-black ${
                        y === year ? "font-bold" : "font-normal"
                      }`}
                    >
                      Năm {y}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

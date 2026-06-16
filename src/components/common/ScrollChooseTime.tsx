import { View, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { COLORS } from "../../constants/colors";

interface ScrollChooseTimeProps {
  isVisible: boolean; // Ẩn hiện vòng quay
  currentDate: Date;
  onConfirm: (date: Date) => void; // Hàm chạy khi bấm nút OK
  onCancel: () => void; // Hàm chạy khi bấm nút Huỷ hoặc bấm ra ngoài
}

export default function ScrollChooseTime({
  isVisible,
  currentDate,
  onConfirm,
  onCancel,
}: ScrollChooseTimeProps) {
  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode="date"
      date={currentDate}
      display="spinner"
      locale="vi_VN"
      confirmTextIOS="OK"
      cancelTextIOS="Huỷ"
      onConfirm={onConfirm}
      onCancel={onCancel}
      buttonTextColorIOS={COLORS.primary}
      style={{ alignSelf: "center" }}
      pickerContainerStyleIOS={{
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}

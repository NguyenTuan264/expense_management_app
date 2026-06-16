import { View, Text, TouchableOpacity } from "react-native";

export default function BlockColor({
  color,
  isSelected,
  onPress,
}: {
  color: string;
  isSelected?: boolean;
  onPress?: () => void;
}) {
  const borderStyle = isSelected
    ? "border-4 border-borderDarkness"
    : "border border-borderColor";
  return (
    <TouchableOpacity
      className={`w-[75px] h-[40px] border rounded-lg ${borderStyle}]`}
      style={{ backgroundColor: color }}
      onPress={onPress}
    ></TouchableOpacity>
  );
}

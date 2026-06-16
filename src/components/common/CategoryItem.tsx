import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CategoryItem({
  img,
  nameCategory,
  colorCategory,
  isSelected,
  onPress,
}: {
  img: any;
  nameCategory: string;
  colorCategory: string;
  isSelected?: boolean;
  onPress?: () => void;
}) {
  const borderStyle = isSelected
    ? "border-4 border-borderDark"
    : "border border-btnHeader";
  return (
    <TouchableOpacity
      className={`w-[130px] h-[80px] items-center justify-center border rounded-lg ${borderStyle}`}
      onPress={onPress}
    >
      <Ionicons name={img} size={36} color={colorCategory} />
      <Text className="text-[18px] pt-[6px]">{nameCategory}</Text>
    </TouchableOpacity>
  );
}

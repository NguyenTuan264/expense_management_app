import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SymbolItem({
  img,
  colorSymbol,
  isSelected,
  onPress,
}: {
  img: any;
  colorSymbol: string;
  isSelected?: boolean;
  onPress?: () => void;
}) {
  const borderStyle = isSelected
    ? "border-4 border-borderDark"
    : "border border-btnHeader";
  return (
    <TouchableOpacity
      className={`w-[95px] h-[50px] items-center justify-center border rounded-lg ${borderStyle}`}
      onPress={onPress}
    >
      <Ionicons name={img} size={36} color={colorSymbol} />
    </TouchableOpacity>
  );
}

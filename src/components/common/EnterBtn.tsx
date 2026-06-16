import { View, Text, TouchableOpacity } from "react-native";

export default function EnterBtn({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      className="w-[400px] items-center justify-center h-[50px] rounded-3xl bg-primary"
      onPress={onPress}
    >
      <Text className="text-[20px] text-mainBg font-medium">{title}</Text>
    </TouchableOpacity>
  );
}

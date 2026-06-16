import { View, Text, TouchableOpacity, Image } from "react-native";
import bin from "../../assets/icons/bin.png";
import right_icon from "../../assets/icons/right-arrow.png";
import { Ionicons } from "@expo/vector-icons";

export default function CategoryListItem({
  iconName,
  iconColor,
  categoryName,
  isEditing = false,
  onDelete,
  onPress,
}: {
  iconName: any;
  iconColor?: string;
  categoryName: string;
  isEditing?: boolean;
  onDelete?: () => void;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center justify-between bg-mainBg px-4 py-4 border-b border-borderDark"
    >
      {/* --- KHỐI BÊN TRÁI --- */}
      <View className="flex-row items-center">
        {isEditing && (
          <TouchableOpacity
            onPress={onDelete}
            className=" items-center justify-center mr-4"
          >
            <Image
              source={bin} // Gọi biến bin ở trên
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        <Ionicons name={iconName} size={24} color={iconColor} />
        <Text className="text-[18px] ml-4">{categoryName}</Text>
      </View>

      {/* --- KHỐI BÊN PHẢI --- */}
      {/* Icon mũi tên */}
      <Image
        source={right_icon} // Gọi biến right_icon ở trên
        className="w-4 h-4 "
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

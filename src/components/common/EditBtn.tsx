import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export default function EditBtn({ tabIndex }: { tabIndex?: number }) {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      className="w-[130px] justify-center h-[80px] border border-btnHeader rounded-lg"
      onPress={() =>
        navigation.navigate("EditScreen", { initialIndex: tabIndex })
      }
    >
      <View className="flex-row items-center justify-center gap-x-1">
        <Text className="text-[18px]">Chỉnh sửa</Text>
        <AntDesign name="right" size={16} color="black" />
      </View>
    </TouchableOpacity>
  );
}

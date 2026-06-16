import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/src/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import right from "../../assets/icons/right-arrow.png";
import { useNavigation } from "@react-navigation/native";

export default function SettingScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  return (
    <View className="flex-1">
      <View
        className="items-center justify-center px-5 bg-menuBg border-b border-borderDark"
        style={{ paddingTop: insets.top, height: insets.top + 55 }}
      >
        <Text className="text-[20px] font-medium">Cài đặt</Text>
      </View>

      <TouchableOpacity
        className="px-[13px]"
        onPress={() => navigation.navigate("InfoAppScreen")}
      >
        <View className="flex-row items-center justify-between px-4 py-4 mt-[30px] rounded-lg bg-mainBg">
          <View className="flex-row items-center gap-x-5">
            <Ionicons
              name="information-circle-outline"
              size={28}
              color={COLORS.primary}
            />
            <Text className="text-[18px]">Thông tin ứng dụng</Text>
          </View>

          <View>
            <Image source={right} className="w-4 h-4" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

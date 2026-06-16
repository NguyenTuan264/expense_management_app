import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@/src/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function InfoAppScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View className="flex-1">
      {/* Header */}
      <View
        className="flex-row items-center justify-between  px-5 bg-menuBg border-b border-borderDark"
        style={{ paddingTop: insets.top, height: insets.top + 55 }}
      >
        {/* Nút Back */}
        <View className="flex-1 items-start">
          <TouchableOpacity className="p-1" onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <Text className="text-[20px] font-medium">Thông tin ứng dụng</Text>
        <View className="flex-1"></View>
      </View>

      {/* Body */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-mainBg"
      >
        <View className="px-5 py-6">
          {/* Lời mở đầu */}
          <Text className="text-[16px] leading-[26px] mb-5 text-justify">
            Chào mừng bạn đến với <Text className="font-bold">Sổ Thu Chi!</Text>{" "}
            Ứng dụng cung cấp trọn bộ công cụ giúp bạn quản lý tài chính cá nhân
            thông minh và hiệu quả:
          </Text>

          {/* Danh sách các tính năng */}
          <View className="flex-col gap-y-4">
            <Text className="text-[14px] leading-[26px] text-justify">
              <Text className="font-bold">- Ghi chép nhanh chóng: </Text>
              Nhập các khoản thu/chi theo danh mục chỉ với vài thao tác.
            </Text>

            <Text className="text-[14px] leading-[26px] text-justify">
              <Text className="font-bold">- Tùy chỉnh linh hoạt: </Text>
              Chủ động thêm, sửa hoặc xóa danh mục theo thói quen cá nhân.
            </Text>

            <Text className="text-[14px] leading-[26px] text-justify">
              <Text className="font-bold">- Theo dõi sát sao: </Text>
              Nắm bắt dòng tiền và tổng giao dịch chi tiết mỗi ngày.
            </Text>

            <Text className="text-[14px] leading-[26px] text-justify">
              <Text className="font-bold">- Báo cáo trực quan: </Text>
              Xem thống kê tài chính tổng quan theo tháng và năm.
            </Text>

            <Text className="text-[14px] leading-[26px] text-justify">
              <Text className="font-bold">- Quản lý ngân sách: </Text>
              Lập kế hoạch và kiểm soát hạn mức chi tiêu cho từng danh mục.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

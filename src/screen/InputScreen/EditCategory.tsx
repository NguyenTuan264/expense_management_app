import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../constants/colors";
import { ICONS, COLOR_ICONS } from "../../constants/categories";
import SymbolItem from "../../components/common/SymbolItem";
import { useContext, useState } from "react";
import BlockColor from "../../components/common/BlockColor";
import EnterBtn from "../../components/common/EnterBtn";
import { CategoryContext } from "../../context/CategoryContext";

export default function EditCategory() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<any>(); // Lấy callback từ màn hình trước gửi sang

  const { setSpendCategories, setRevenueCategories } =
    useContext(CategoryContext);
  const categoryToEdit = route.params?.categoryToEdit; // Lấy dữ liệu từ danh mục cũ gửi sang
  const type = route.params?.type;

  // Chọn Symbol
  const [selectedSymbol, setSelectedSymbol] = useState(
    categoryToEdit?.icon || ICONS
  );
  // Chọn Ô màu
  const [selectedColor, setSelectedColor] = useState(
    categoryToEdit?.color || COLOR_ICONS[0]
  );
  const [categoryName, setCategoryName] = useState(categoryToEdit?.name || ""); // Lưu tên danh mục người dùng nhập

  const handleSave = () => {
    if (!categoryName.trim()) {
      Alert.alert("Vui lòng nhập tên danh mục");
      return;
    }

    const categoryData = {
      id: categoryToEdit ? categoryToEdit.id : Math.random().toString(),
      name: categoryName.trim(),
      icon: selectedSymbol,
      color: selectedColor,
    };

    if (type === "spend") {
      if (categoryToEdit) {
        // Sửa Tiền chi
        setSpendCategories((prev: any) =>
          prev.map((category: any) =>
            category.id === categoryData.id ? categoryData : category
          )
        );
      } else {
        // Thêm mới
        setSpendCategories((prev: any) => [...prev, categoryData]);
      }
    } else if (type === "revenue") {
      if (categoryToEdit) {
        // Sửa Tiền thu
        setRevenueCategories((prev: any) =>
          prev.map((category: any) =>
            category.id === categoryData.id ? categoryData : category
          )
        );
      } else {
        // Thêm mới
        setRevenueCategories((prev: any) => [...prev, categoryData]);
      }
    }
    navigation.goBack();
  };
  return (
    <View className="flex-1 bg-calendarOutMonth pb-10">
      <View
        className="flex-row items-center justify-between px-3 py-3 bg-menuBg border-b border-borderDark"
        style={{ paddingTop: insets.top }}
      >
        <View className="flex-1 items-start">
          <TouchableOpacity className="p-1" onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View className="items-center justify-center">
          <Text className="text-[20px] font-medium">
            {categoryToEdit ? "Chỉnh sửa" : "Tạo mới"}
          </Text>
        </View>
        <View className="flex-1 items-end"></View>
      </View>

      <ScrollView className="flex-1 bg-mainBg mt-[25px]">
        <View className="flex-row items-center gap-x-[30px] border-t border-b border-borderDark h-[50px] px-[13px] ">
          <Text className="text-[20px]">Tên</Text>
          <TextInput
            placeholder="Vui lòng nhập tên đề mục"
            className="text-[20px] w-[340px] px-[6px] py-[6px]"
            value={categoryName}
            onChangeText={setCategoryName}
          />
        </View>

        <View className="px-[13px] py-5">
          <Text className="text-[20px] pb-[25px]">Biểu tượng</Text>
          <ScrollView contentContainerClassName="flex-row flex-wrap gap-x-[8px] gap-y-[8px]">
            {ICONS.map((item) => {
              const isSelected = selectedSymbol === item;
              return (
                <SymbolItem
                  key={item}
                  img={item}
                  colorSymbol={isSelected ? selectedColor : "#000000"}
                  isSelected={isSelected}
                  onPress={() => setSelectedSymbol(item)}
                />
              );
            })}
          </ScrollView>
        </View>

        <View className="px-[13px] py-5 border-t border-b border-borderDark">
          <Text className="text-[20px] pb-[25px]">Màu sắc</Text>
          <ScrollView contentContainerClassName="flex-row flex-wrap gap-x-[7px] gap-y-[7px]">
            {COLOR_ICONS.map((item) => {
              const isSelected = selectedColor === item;
              return (
                <BlockColor
                  key={item}
                  color={item}
                  isSelected={isSelected}
                  onPress={() => setSelectedColor(item)}
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>

      <View
        className="items-center"
        style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }}
      >
        <EnterBtn title="Lưu" onPress={handleSave} />
      </View>
    </View>
  );
}

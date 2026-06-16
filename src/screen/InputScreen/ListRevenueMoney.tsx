import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import right_icon from "../../assets/icons/right-arrow.png";
import CategoryListItem from "../../components/common/CategoryListItem";
import { DEFAULT_REVENUECATEGORIES } from "../../constants/categories";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CategoryContext } from "../../context/CategoryContext";

export default function ListRevenueMoney({ isEditing }: any) {
  // const [categories, setCategories] = useState(DEFAULT_REVENUECATEGORIES);
  const { revenueCategories, setRevenueCategories } =
    useContext(CategoryContext);

  const navigation = useNavigation<any>();

  const handleDeleteItem = (idDelete: string) => {
    const newData = revenueCategories.filter(
      (item: any) => item.id !== idDelete
    );
    setRevenueCategories(newData);
  };
  return (
    <View className="flex-1 bg-mainBg  ">
      <ScrollView className="flex-1 mb-[50px] bg-calendarOutMonth px-[13px]">
        <TouchableOpacity
          className={`flex-row items-center justify-between px-4 rounded-lg w-[404px] mt-[25px] h-[50px] ${
            isEditing ? "bg-decorBar" : "bg-mainBg"
          }`}
          disabled={isEditing}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("EditCategory", {
              type: "revenue", // Tiền thu
            })
          }
        >
          <Text className="text-[18px]">Thêm danh mục</Text>
          {!isEditing && <Image source={right_icon} className="w-4 h-4" />}
        </TouchableOpacity>

        <View className="mt-5">
          {revenueCategories.map((item: any) => {
            return (
              <CategoryListItem
                key={item.id}
                iconName={item.icon}
                iconColor={item.color}
                categoryName={item.name}
                isEditing={isEditing}
                onDelete={() => handleDeleteItem(item.id)}
                onPress={() => {
                  // Chỉ chuyển màn khi đang không Sửa
                  if (!isEditing) {
                    navigation.navigate("EditCategory", {
                      categoryToEdit: item,
                      type: "revenue",
                    });
                  }
                }}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

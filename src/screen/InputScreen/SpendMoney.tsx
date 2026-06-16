import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  InputAccessoryView,
  Keyboard,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useContext, useState } from "react";
import { formatFullDate } from "../../utils/dateHelper";
import ScrollChooseTime from "../../components/common/ScrollChooseTime";
import CategoryItem from "../../components/common/CategoryItem";
import { DEFAULT_SPENDCATEGORIES } from "../../constants/categories";
import EditBtn from "../../components/common/EditBtn";
import EnterBtn from "../../components/common/EnterBtn";
import { CategoryContext } from "../../context/CategoryContext";
import { TransactionContext } from "../../context/TransactionContext";

export default function SpendMoney({ currentDate, setCurrentDate }: any) {
  const [spendMoney, setSpendMoney] = useState(0);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedCategoryID, setSelectedCategoryID] = useState(
    DEFAULT_SPENDCATEGORIES[0].id
  );
  const { spendCategories = [] } = useContext(CategoryContext) || {};
  const inputAccessID = "DONE_ID";

  const [note, setNote] = useState("");
  const { addTransaction } = useContext(TransactionContext);

  const handleAdd = () => {
    const selectedCategory = spendCategories.find(
      (category: any) => category.id === selectedCategoryID
    );
    const newTransaction = {
      id: Date.now().toString(),
      date: currentDate,
      note,
      amount: spendMoney,
      categoryName: selectedCategory ? selectedCategory.name : "Khác", // Lấy tên danh mục đã chọn
      type: "spend",
    };
    addTransaction(newTransaction);
    // Reset Form
    setNote("");
    setSpendMoney(0);
  };

  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };
  return (
    <View>
      <View className="flex-row items-center gap-x-[6px] px-[13px] py-[7px] border-b border-borderDark">
        <Text className="text-[20px]">Ngày</Text>
        <View className="flex-row items-center gap-x-[10px]">
          <TouchableOpacity onPress={handlePrevDay}>
            <AntDesign name="left" size={16} color="black" />
          </TouchableOpacity>

          {/* Mở Scroll Choose Time */}
          <TouchableOpacity
            className="w-[300px] h-[36px] rounded-lg justify-center items-center bg-inputBG"
            onPress={() => setIsPickerVisible(true)}
          >
            <Text className="text-[20px] font-medium">
              {formatFullDate(currentDate)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNextDay}>
            <AntDesign name="right" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {
        <ScrollChooseTime
          isVisible={isPickerVisible}
          currentDate={currentDate}
          onConfirm={(date) => {
            setCurrentDate(date);
            setIsPickerVisible(false);
          }}
          onCancel={() => {
            setIsPickerVisible(false);
          }}
        />
      }

      <View className="flex-row items-center gap-x-[11px] px-[13px] py-[7px] border-b border-borderDark">
        <Text className="text-[20px]">Ghi chú</Text>
        <TextInput
          className="text-[20px] px-[6px] py-[6px] w-[300px]"
          placeholder="Chưa nhập vào"
          value={note}
          onChangeText={setNote}
        />
      </View>

      <View className="flex-row items-center gap-x-[11px] px-[13px] py-[7px] border-b border-borderDark">
        <Text className="text-[20px]">Tiền chi</Text>
        <TextInput
          className="text-[20px] font-medium px-[6px] py-[6px] w-[300px] rounded-lg bg-inputBG"
          value={String(spendMoney)}
          onChangeText={(text) => {
            const numericValue = parseInt(text) || 0;
            setSpendMoney(numericValue);
          }}
          keyboardType="numeric"
          inputAccessoryViewID={inputAccessID}
        />
        {Platform.OS === "ios" && (
          <InputAccessoryView nativeID={inputAccessID}>
            <View className="bg-btnHeader flex-row justify-center px-4 py-2 border-t border-gray-300">
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                <Text className="text-primary font-bold text-[20px]">OK</Text>
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        )}
        <Text className="text-[20px]">đ</Text>
      </View>

      {/* Danh mục */}
      <View className="px-[13px] pt-[30px]">
        <Text className="text-[20px] pb-[30px]">Danh mục</Text>
        <ScrollView contentContainerClassName="flex-row flex-wrap gap-x-[7px] gap-y-[7px]">
          {spendCategories.map((item: any) => {
            const isSelected = item.id === selectedCategoryID;
            return (
              <CategoryItem
                key={item.id}
                img={item.icon}
                nameCategory={item.name}
                colorCategory={item.color}
                isSelected={isSelected}
                onPress={() => setSelectedCategoryID(item.id)}
              />
            );
          })}
          <EditBtn tabIndex={0} />
        </ScrollView>
      </View>

      <View className="items-center pt-5">
        <EnterBtn title="Nhập khoản chi" onPress={handleAdd} />
      </View>
    </View>
  );
}

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  InputAccessoryView,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useContext, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { formatFullDate } from "../../utils/dateHelper";
import ScrollChooseTime from "../../components/common/ScrollChooseTime";
import CategoryItem from "../../components/common/CategoryItem";
import { CategoryContext } from "../../context/CategoryContext";
import { TransactionContext } from "../../context/TransactionContext";
import EditBtn from "../../components/common/EditBtn";
import EnterBtn from "../../components/common/EnterBtn";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TransactionForm() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  // Nhận dữ liệu giao dịch cũ truyền sang từ CalendarScreen
  const { transaction } = route.params || {};

  const insets = useSafeAreaInsets();

  const { spendCategories, revenueCategories } = useContext(CategoryContext);
  const { updateTransaction, deleteTransaction } =
    useContext(TransactionContext);

  // Thiết lập giá trị mặc định từ giao dịch cũ
  const [currentDate, setCurrentDate] = useState(
    new Date(transaction?.date || new Date())
  );
  const [note, setNote] = useState(transaction?.note || "");
  const [amount, setAmount] = useState(transaction?.amount || 0);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  // Xác định danh sách Category dựa trên type (Thu hay Chi)
  const isExpense = transaction?.type === "spend";
  const activeCategories = isExpense ? spendCategories : revenueCategories;

  // Tìm ID của danh mục cũ để highlight đúng Icon
  const initialCategory = activeCategories?.find(
    (cat: any) => cat.name === transaction?.categoryName
  );
  const [selectedCategoryID, setSelectedCategoryID] = useState(
    initialCategory?.id
  );

  const inputAccessID = "EDIT_DONE_ID";

  // Cập nhật Lịch sử Thu/Chi
  const handleUpdate = () => {
    const selectedCategory = activeCategories.find(
      (cat: any) => cat.id === selectedCategoryID
    );

    const updatedTx = {
      ...transaction, // Giữ nguyên ID và Type cũ
      date: currentDate,
      note,
      amount: amount,
      categoryName: selectedCategory ? selectedCategory.name : "Khác",
    };

    updateTransaction(updatedTx);
    navigation.goBack(); // Sửa xong thì quay về màn hình trước
  };

  // Xoá Lịch sử Thu/Chi
  const handleDelete = () => {
    Alert.alert(
      "Xóa giao dịch",
      "Bạn có chắc chắn muốn xóa giao dịch này không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            deleteTransaction(transaction.id);
            navigation.goBack();
          },
        },
      ]
    );
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
    <View className="flex-1 bg-mainBg">
      {/* HEADER CHỈNH SỬA */}
      <View
        className="flex-row justify-between items-center px-4 py-4 border-b border-gray-300 bg-white"
        style={{ paddingTop: insets.top, height: insets.top + 55 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-[20px] font-bold">Chỉnh sửa</Text>
        <TouchableOpacity onPress={handleDelete}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>

      {/* Khối Ngày tháng */}
      <View className="flex-row items-center gap-x-[4px] px-[13px] py-[7px] border-b border-borderDark">
        <Text className="text-[20px]">Ngày</Text>

        <View className="flex-row items-center gap-x-[10px]">
          <TouchableOpacity onPress={handlePrevDay}>
            <AntDesign name="left" size={16} color="black" />
          </TouchableOpacity>

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

      <ScrollChooseTime
        isVisible={isPickerVisible}
        currentDate={currentDate}
        onConfirm={(date) => {
          setCurrentDate(date);
          setIsPickerVisible(false);
        }}
        onCancel={() => setIsPickerVisible(false)}
      />

      {/* Khối Ghi chú */}
      <View className="flex-row items-center gap-x-[11px] px-[13px] py-[7px] border-b border-borderDark">
        <Text className="text-[20px]">Ghi chú</Text>
        <TextInput
          className="text-[20px] px-[6px] py-[6px] w-[300px]"
          placeholder="Chưa nhập vào"
          value={note}
          onChangeText={setNote}
        />
      </View>

      {/* Khối Tiền */}
      <View className="flex-row items-center gap-x-[11px] px-[13px] py-[7px] border-b border-borderDark">
        <Text className="text-[20px]">
          {isExpense ? "Tiền chi" : "Tiền thu"}
        </Text>
        <TextInput
          className="text-[20px] font-medium px-[6px] py-[6px] w-[300px] rounded-lg bg-inputBG"
          value={String(amount)}
          onChangeText={(text) => setAmount(parseInt(text) || 0)}
          keyboardType="numeric"
          inputAccessoryViewID={inputAccessID}
        />
        <Text className="text-[20px]">đ</Text>
      </View>

      {Platform.OS === "ios" && (
        <InputAccessoryView nativeID={inputAccessID}>
          <View className="bg-btnHeader flex-row justify-center px-4 py-2 border-t border-gray-300">
            <TouchableOpacity onPress={() => Keyboard.dismiss()}>
              <Text className="text-primary font-bold text-[20px]">OK</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      )}

      {/* Khối Danh mục */}
      <View className="px-[13px] pt-[30px]">
        <Text className="text-[20px] pb-[30px]">Danh mục</Text>
        <ScrollView contentContainerClassName="flex-row flex-wrap gap-x-[7px] gap-y-[7px]">
          {activeCategories?.map((item: any) => (
            <CategoryItem
              key={item.id}
              img={item.icon}
              nameCategory={item.name}
              colorCategory={item.color}
              isSelected={item.id === selectedCategoryID}
              onPress={() => setSelectedCategoryID(item.id)}
            />
          ))}
          <EditBtn tabIndex={isExpense ? 0 : 1} />
        </ScrollView>
      </View>

      {/* Nút Cập nhật */}
      <View className="items-center pt-10 pb-10">
        <EnterBtn title="Lưu thay đổi" onPress={handleUpdate} />
      </View>
    </View>
  );
}

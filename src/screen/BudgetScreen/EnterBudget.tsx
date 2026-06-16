import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS } from "@/src/constants/colors";
import BudgetItemSetting from "../../components/budget/BudgetItemSetting";
import { CategoryContext } from "../../context/CategoryContext";

interface EnterBudgetProps {
  visible: boolean;
  onClose: () => void;
  onSave: (budgets: Record<string, number>) => void;
  initialBudgets: Record<string, number>;
}

export default function EnterBudget({
  visible,
  onClose,
  onSave,
  initialBudgets,
}: EnterBudgetProps) {
  const { spendCategories = [] } = useContext(CategoryContext) || {};

  // 1. State lưu ngân sách theo từng danh mục: { "Ăn uống": 200000, "Mua sắm": 500000, ... }
  const [budgets, setBudgets] = useState<Record<string, number>>({});

  // ĐỒNG BỘ DỮ LIỆU: Mỗi khi mở Modal, load lại ngân sách đã lưu trước đó
  useEffect(() => {
    if (visible) {
      setBudgets(initialBudgets);
    }
  }, [visible, initialBudgets]);

  // 2. Tính tổng tự động: Cộng tất cả các giá trị (value) đang có trong object budgets
  const totalBudget = Object.values(budgets).reduce((sum, val) => sum + val, 0);

  // 3. Hàm cập nhật ngân sách khi người dùng gõ phím ở các danh mục
  const handleCategoryBudgetChange = (name: string, value: number) => {
    setBudgets((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        {/* Nhấn ra ngoài để đóng */}
        <TouchableOpacity
          className="absolute inset-0"
          activeOpacity={1}
          onPress={onClose}
        />

        <View className="bg-calendarOutMonth h-[92%] pt-4">
          {/* Header */}
          <View className="flex-row items-center justify-between px-4 pb-4 border-b border-borderDark bg-menuBg">
            <TouchableOpacity onPress={onClose} className="p-2 -ml-2">
              <AntDesign name="close" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <Text className="text-[20px] font-medium text-black">
              Cài đặt ngân sách
            </Text>
            <TouchableOpacity
              className="p-2 -mr-2"
              onPress={() => {
                onSave(budgets); // Gửi dữ liệu ra màn hình ngoài
                onClose(); // Đóng Modal
              }}
            >
              <Text className="text-[20px] text-primary font-medium">Lưu</Text>
            </TouchableOpacity>
          </View>

          <View className="px-[13px]">
            <ScrollView showsVerticalScrollIndicator={false} className="mt-2">
              {/* TỔNG NGÂN SÁCH (Chỉ hiển thị Text, tự động tính toán)*/}
              <View className="flex-row justify-between items-center border border-borderDark rounded-lg mt-5 mb-[50px] px-4 py-4 bg-mainBg">
                <Text className="text-[18px] font-medium text-black">
                  Tổng ngân sách
                </Text>

                <Text
                  className={`text-[18px] font-medium ${
                    totalBudget > 0 ? "text-black" : "text-textGray"
                  }`}
                >
                  {totalBudget > 0
                    ? `${totalBudget.toLocaleString("vi-VN")}đ`
                    : "Chưa đặt"}
                </Text>
              </View>

              {/* CÁC DANH MỤC CON */}
              <View className="bg-white mb-10">
                {spendCategories.map((category: any, index: number) => {
                  return (
                    <BudgetItemSetting
                      key={index}
                      name={category.name}
                      icon={category.icon}
                      color={category.color}
                      // Truyền dữ liệu ngân sách từ state tổng xuống
                      budget={budgets[category.name] || 0}
                      // Truyền hàm cập nhật để BudgetItemSetting gọi khi gõ số
                      onBudgetChange={(val: number) =>
                        handleCategoryBudgetChange(category.name, val)
                      }
                    />
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { COLORS } from "@/src/constants/colors";
import { useContext, useState } from "react";
import DateMonthSelector from "@/src/components/common/DateMonthSelector";
import BudgetTotal from "@/src/components/budget/BudgetTotal";
import BudgetItem from "@/src/components/budget/BudgetItem";
import { CategoryContext } from "../../context/CategoryContext";
import { TransactionContext } from "../../context/TransactionContext";
import EnterBudget from "../BudgetScreen/EnterBudget";

export default function BudgetScreen() {
  const insets = useSafeAreaInsets();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { spendCategories = [] } = useContext(CategoryContext) || {}; // Lấy icon và màu icon từ danh mục
  const { transactions = [] } = useContext(TransactionContext) || {}; // Lấy lịch sử giao dịch
  const [isEnterBudgetVisible, setIsEnterBudgetVisible] = useState(false); // Ẩn hiện Modal

  // STATE CHỨA NGÂN SÁCH ĐÃ LƯU
  const [savedBudgets, setSavedBudgets] = useState<Record<string, number>>({});

  // 2. Tính Tổng ngân sách và Tổng chi tiêu cho khối BudgetTotal trên cùng
  const totalBudget = Object.values(savedBudgets).reduce(
    (sum, val) => sum + val,
    0
  );

  /* Xử lỹ dữ liệu từ TransactionContext */
  // Lọc ra các giao dịch CHI TIÊU của THÁNG HIỆN TẠI
  const currentMonthSpendTransactions = transactions.filter((t: any) => {
    const transDate = new Date(t.date);
    return (
      t.type === "spend" &&
      transDate.getMonth() === currentDate.getMonth() &&
      transDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // 2. Tính TỔNG TIỀN ĐÃ CHI trong tháng để đẩy vào BudgetTotal
  const totalSpent = currentMonthSpendTransactions.reduce(
    (sum: number, t: any) => sum + t.amount,
    0
  );

  return (
    <View className="flex-1 bg-mainBg">
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-6 bg-menuBg border-b border-borderDark"
        style={{ paddingTop: insets.top, height: insets.top + 55 }}
      >
        <View></View>
        <Text className="text-[20px] font-medium">Ngân sách</Text>
        <TouchableOpacity onPress={() => setIsEnterBudgetVisible(true)}>
          <Feather name="edit" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <DateMonthSelector
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />

        <View className="mt-5 px-6">
          <BudgetTotal
            budget={totalBudget}
            spent={totalSpent}
            onPress={() => setIsEnterBudgetVisible(true)}
          />
          {spendCategories.map((category: any, index: number) => {
            // 3. Tính tổng tiền chi tiêu RIÊNG CHO DANH MỤC NÀY
            const categorySpent = currentMonthSpendTransactions
              .filter((t: any) => t.categoryName === category.name)
              .reduce((sum: number, t: any) => sum + t.amount, 0);

            // Ngân sách của danh mục (Tạm để 0)
            const categoryBudget = savedBudgets[category.name] || 0;
            return (
              <BudgetItem
                key={index} // Bắt buộc phải có key khi dùng map
                name={category.name} // Lấy tên từ context
                icon={category.icon} // Lấy icon từ context
                color={category.color} // Lấy màu từ context
                budget={categoryBudget}
                spent={categorySpent}
                onPress={() => setIsEnterBudgetVisible(true)}
              />
            );
          })}
        </View>
      </ScrollView>

      <EnterBudget
        visible={isEnterBudgetVisible}
        onClose={() => setIsEnterBudgetVisible(false)}
        initialBudgets={savedBudgets}
        onSave={(newBudgets) => setSavedBudgets(newBudgets)}
      />
    </View>
  );
}

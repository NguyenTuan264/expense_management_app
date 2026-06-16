import DateMonthSelector from "@/src/components/common/DateMonthSelector";
import { useContext, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import ReportSummary from "../../components/report/ReportSummary";
import { TransactionContext } from "../../context/TransactionContext";
import TabSwitch from "../../components/report/TabSwitch";
import { ReportContext } from "../../context/ReportContext";
import DonutChart from "../../components/report/DonutChart";
import { CategoryContext } from "../../context/CategoryContext";

export default function ReportMonth() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Lấy dữ liệu từ kho chung
  const { transactions } = useContext(TransactionContext) || {};
  const { activeTab, setActiveTab } = useContext(ReportContext);
  const { spendCategories = [], revenueCategories = [] } =
    useContext(CategoryContext) || {};

  //  Lọc giao dịch TRONG THÁNG đang chọn
  const monthlyTransactions = transactions.filter((t: any) => {
    const transDate = new Date(t.date);
    return (
      transDate.getMonth() === currentDate.getMonth() &&
      transDate.getFullYear() === currentDate.getFullYear()
    );
  });

  //  Tính toán tổng Thu và Chi của tháng đó
  const totalSpend = monthlyTransactions
    .filter((t: any) => t.type === "revenue")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const totalExpense = monthlyTransactions
    .filter((t: any) => t.type === "spend")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  /* Xử lý dữ liệu để đưa vào biểu đồ tròn */
  // Lấy giao dịch từ tab đang mở
  const currentTabTransactions = monthlyTransactions.filter(
    (t: any) => t.type === activeTab
  );

  // Tìm màu trong kho Danh mục
  const activeCategories =
    activeTab === "spend" ? spendCategories : revenueCategories;

  // Gom nhóm các giao dịch trùng tên danh mục và tính tổng tiền
  const aggregatedData = currentTabTransactions.reduce(
    (acc: any, curr: any) => {
      if (!acc[curr.categoryName]) {
        // Tìm danh mục tương ứng để lấy mã màu
        const matchedCategory = activeCategories.find(
          (cat: any) => cat.name === curr.categoryName
        );
        acc[curr.categoryName] = {
          name: curr.categoryName,
          amount: 0,
          color: matchedCategory?.color || "#A0A0A0", // Không tìm ra
        };
      }
      acc[curr.categoryName].amount += curr.amount;
      return acc;
    },
    {}
  );

  // Object sang Array, tiền từ lớn -> nhỏ
  const chartData = Object.values(aggregatedData).sort(
    (a: any, b: any) => b.amount - a.amount
  );

  // Tổng tiền -> cho vào biểu đồ
  const currentChartTotal = activeTab === "spend" ? totalExpense : totalSpend;
  return (
    <ScrollView>
      <DateMonthSelector
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <View className="flex-1 bg-mainBg">
        {/* Truyền dữ liệu vào bảng Tổng hợp */}
        <ReportSummary totalSpend={totalSpend} totalExpense={totalExpense} />
        <TabSwitch activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Biểu đồ tròn */}
        <DonutChart data={chartData as any} total={currentChartTotal} />
      </View>
    </ScrollView>
  );
}

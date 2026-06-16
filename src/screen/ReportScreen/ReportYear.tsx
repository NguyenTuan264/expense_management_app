import { View, Text, ScrollView } from "react-native";
import { useContext, useState } from "react";
import DateYearSelector from "../../components/common/DateYearSelector";
import { TransactionContext } from "../../context/TransactionContext";
import ReportSummary from "../../components/report/ReportSummary";
import TabSwitch from "../../components/report/TabSwitch";
import { ReportContext } from "../../context/ReportContext";
import TotalBar from "@/src/components/report/TotalBar";
import DonutChart from "../../components/report/DonutChart";
import { CategoryContext } from "../../context/CategoryContext";

export default function ReportYear() {
  const [currentDate, setCurrentDate] = useState(new Date());
  // Lấy dữ liệu giao dịch từ Context (Thêm = [] để chống lỗi rỗng)
  const { transactions = [] } = useContext(TransactionContext) || {};
  const { activeTab, setActiveTab } = useContext(ReportContext);

  // Lấy danh sách danh mục để lấy mã màu và icon
  const { spendCategories = [], revenueCategories = [] } =
    useContext(CategoryContext) || {};

  // Lọc lấy các giao dịch khớp với NĂM đang chọn
  const yearlyTransactions = transactions.filter((t: any) => {
    const transDate = new Date(t.date);
    return transDate.getFullYear() === currentDate.getFullYear();
  });

  // Tính toán tổng Thu và Chi của năm đó
  const totalSpend = yearlyTransactions
    .filter((t: any) => t.type === "revenue")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const totalExpense = yearlyTransactions
    .filter((t: any) => t.type === "spend")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  /* Xử lý dữ liệu để đưa vào biểu đồ tròn */
  // Lấy giao dịch từ tab đang mở
  const currentTabTransactions = yearlyTransactions.filter(
    (t: any) => t.type === activeTab
  );

  // Chọn đúng kho danh mục để tìm màu và icon
  const activeCategories =
    activeTab === "spend" ? spendCategories : revenueCategories;

  // Gom nhóm các giao dịch trùng tên danh mục và tính tổng tiền
  const aggregatedData = currentTabTransactions.reduce(
    (acc: any, curr: any) => {
      if (!acc[curr.categoryName]) {
        // Tìm danh mục tương ứng
        const matchedCategory = activeCategories.find(
          (cat: any) => cat.name === curr.categoryName
        );
        acc[curr.categoryName] = {
          name: curr.categoryName,
          amount: 0,
          color: matchedCategory?.color || "#A0A0A0",
          icon: matchedCategory?.icon || "help-circle-outline",
        };
      }
      acc[curr.categoryName].amount += curr.amount;
      return acc;
    },
    {}
  );

  // Ép kiểu Object sang Array và sắp xếp tiền từ Lớn -> Nhỏ
  const chartData = Object.values(aggregatedData).sort(
    (a: any, b: any) => b.amount - a.amount
  );

  // Tổng tiền truyền vào biểu đồ
  const currentChartTotal = activeTab === "spend" ? totalExpense : totalSpend;
  return (
    <ScrollView>
      <DateYearSelector
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <View className="flex-1 bg-mainBg">
        {/* <ReportSummary totalSpend={totalSpend} totalExpense={totalExpense} /> */}
        <TabSwitch activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Biểu đồ tròn */}
        <DonutChart data={chartData as any} total={currentChartTotal} />
      </View>

      {/* Tổng Chi tiêu/Thu nhập */}
      <TotalBar total={currentChartTotal} />
    </ScrollView>
  );
}

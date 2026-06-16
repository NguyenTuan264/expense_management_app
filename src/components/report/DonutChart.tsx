import { View, Text } from "react-native";
import PieChart from "react-native-pie-chart";
import ReportItem from "./ReportItem";
import { COLORS } from "@/src/constants/colors";

interface DonutChartProps {
  data: { name: string; amount: number; color: string; icon?: string }[];
  total: number;
}

export default function DonutChart({ data, total }: DonutChartProps) {
  const widthAndHeight = 200;

  // Trường hợp: Chưa có dữ liệu
  if (total === 0 || data.length === 0) {
    return (
      <View className="items-center justify-center py-[20px]">
        <View
          className="items-center justify-center relative"
          style={{ width: widthAndHeight, height: widthAndHeight }}
        >
          <PieChart
            widthAndHeight={widthAndHeight}
            series={[{ value: 1, color: COLORS.iconGray }]}
            cover={{ radius: 0.5, color: COLORS.mainBg }}
          />
          <Text className="absolute text-iconGray text-[12px] font-bold text-center">
            Chưa có dữ liệu
          </Text>
        </View>
      </View>
    );
  }

  // Trường hợp: Khi có dữ liệu
  const series = data.map((item) => ({
    value: item.amount,
    color: item.color,
  }));

  // ==============================================================
  // TOÁN HỌC: TÍNH TOÁN TỌA ĐỘ ĐỂ ĐẶT CHỮ LÊN CHÍNH GIỮA LÁT CẮT
  // ==============================================================
  let currentAngle = -Math.PI / 2; // Thư viện bắt đầu vẽ từ hướng 12h (-90 độ)
  const radius = widthAndHeight / 2;
  const labelRadius = radius * 0.82; // Canh chữ nằm ở 82% từ tâm ra (ngay giữa dải màu)

  const labels = data.map((item, index) => {
    // 1. Tính độ rộng của góc lát cắt
    const sliceAngle = (item.amount / total) * 2 * Math.PI;

    // 2. Tìm góc chính giữa lát cắt để đặt chữ
    const midAngle = currentAngle + sliceAngle / 2;
    currentAngle += sliceAngle; // Cộng dồn góc cho lát cắt tiếp theo

    // 3. Quy đổi góc thành toạ độ X, Y
    const x = radius + Math.cos(midAngle) * labelRadius;
    const y = radius + Math.sin(midAngle) * labelRadius;

    // 4. Bỏ qua không in chữ nếu lát cắt quá nhỏ (< 5%) để tránh chữ bị tràn
    const percent = (item.amount / total) * 100;
    if (percent < 5) return null;

    return (
      <View
        key={`label-${index}`}
        className="absolute"
        style={{
          left: x,
          top: y,
          transform: [{ translateX: -35 }, { translateY: -10 }], // Lùi lại một nửa để chữ canh đúng tâm tọa độ
          width: 80,
          alignItems: "center",
        }}
      >
        <Text
          className="text-[14px] text-mainBg text-center"
          style={{
            // Đổ bóng nhẹ giúp chữ màu trắng luôn dễ đọc trên mọi nền màu
            textShadowColor: "rgba(0, 0, 0, 0.4)",
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          }}
          numberOfLines={1}
        >
          {item.name}
        </Text>
      </View>
    );
  });

  // Xử lý trường hợp lỗi tính toán vượt ngoài 100%
  let accumulatedPercent = 0; // Tổng % cộng dồn
  const dataWithExactPercent = data.map((item, index) => {
    // Phần tử CUỐI CÙNG -> 100 trừ tổng các % trước đó
    if (index === data.length - 1) {
      return { ...item, percent: 100 - accumulatedPercent };
    }

    // Phần tử khác -> Làm tròn bình thường và cộng dồn
    const percent = Math.round((item.amount / total) * 100);
    accumulatedPercent += percent;
    return { ...item, percent };
  });

  return (
    <View className="items-center justify-center ">
      {/* 1. KHỐI BIỂU ĐỒ TRÒN */}
      <View
        className="items-center justify-center relative mt-5 mb-5 "
        style={{ width: widthAndHeight, height: widthAndHeight }}
      >
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          cover={{ radius: 0.5, color: COLORS.mainBg }}
        />

        {/* In các nhãn (Tên danh mục) đè lên dải màu của biểu đồ */}
        {labels}
      </View>

      {/* 2. Danh sách dữ liệu biểu đồ */}
      <View className="w-full">
        {dataWithExactPercent.map((item, index) => {
          return (
            <ReportItem
              key={`legend-${index}`}
              icon={item.icon} // Truyền icon
              color={item.color} // Truyền màu
              name={item.name} // Truyền tên
              amount={item.amount} // Truyền số tiền
              percent={item.percent} // Truyền phần trăm
              isFirst={index === 0}
            />
          );
        })}
      </View>
    </View>
  );
}

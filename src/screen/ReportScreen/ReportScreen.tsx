import ReportTabView from "@/src/components/common/ReportTabView";
import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function ReportScreen() {
  return (
    <View className="flex-1">
      <ReportTabView />
    </View>
  );
}

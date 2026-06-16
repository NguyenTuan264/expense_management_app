import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Test() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text className="text-2xl text-blue-400 font-bold">Hello</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

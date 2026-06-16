import ReportMonth from "@/src/screen/ReportScreen/ReportMonth";
import ReportYear from "@/src/screen/ReportScreen/ReportYear";
import { useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabView, SceneMap } from "react-native-tab-view";

const FirstRoute = () => (
  <View className="flex-1">
    <ReportMonth />
  </View>
);

const SecondRoute = () => (
  <View className="flex-1">
    <ReportYear />
  </View>
);

const initialLayout = { width: Dimensions.get("window").width };

const ReportTabView = () => {
  const [index, setIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [routes] = useState([
    { key: "first", title: "Hàng tháng" },
    { key: "second", title: "Hàng năm" },
  ]);

  const insets = useSafeAreaInsets();

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props: any) => {
    return (
      <View
        className="flex-row items-center justify-center px-5  bg-menuBg border-b border-borderDark"
        style={{ paddingTop: insets.top, height: insets.top + 55 }}
      >
        <View className="flex-row bg-btnHeader rounded-xl px-1 py-1 w-[220px]">
          {props.navigationState.routes.map((route: any, i: number) => {
            const isFocused = props.navigationState.index === i; // Kiểm tra xem Tab nào đang được chọn

            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => props.jumpTo(route.key)} // Bấm vào thì nhảy Tab
                className={`flex-1 items-center justify-center py-2 rounded-lg ${
                  isFocused ? "bg-primary" : "bg-transparent"
                }`}
              >
                <Text
                  className={`font-semibold text-base ${
                    isFocused ? "text-white" : "text-primary"
                  }`}
                >
                  {route.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      animationEnabled={false}
      swipeEnabled={false}
    />
  );
};
export default ReportTabView;

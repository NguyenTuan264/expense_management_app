import * as React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SpendMoney from "@/src/screen/InputScreen/SpendMoney";
import RevenueMoney from "@/src/screen/InputScreen/RevenueMoney";

const FirstRoute = () => (
  <View className="flex-1">
    <SpendMoney />
  </View>
);

const SecondRoute = () => (
  <View className="flex-1">
    <RevenueMoney />
  </View>
);

const initialLayout = { width: Dimensions.get("window").width };

const InputTabView = () => {
  const [index, setIndex] = React.useState(0);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [routes] = React.useState([
    { key: "first", title: "Tiền chi" },
    { key: "second", title: "Tiền thu" },
  ]);

  const insets = useSafeAreaInsets();

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "first":
        return (
          <SpendMoney
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        );
      case "second":
        return (
          <RevenueMoney
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        );
      default:
        return null;
    }
  };

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
export default InputTabView;

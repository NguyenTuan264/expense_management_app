import ListRevenueMoney from "@/src/screen/InputScreen/ListRevenueMoney";
import ListSpendMoney from "@/src/screen/InputScreen/ListSpendMoney";
import * as React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/colors";
import { useRoute } from "@react-navigation/native";

const FirstRoute = () => (
  <View className="flex-1">
    <ListSpendMoney />
  </View>
);

const SecondRoute = () => (
  <View className="flex-1">
    <ListRevenueMoney />
  </View>
);

const initialLayout = { width: Dimensions.get("window").width };

const EditTabView = () => {
  const route = useRoute<any>();
  const startingIndex = route.params?.initialIndex || 0;
  const [index, setIndex] = React.useState(startingIndex);
  const [routes] = React.useState([
    { key: "first", title: "Tiền chi" },
    { key: "second", title: "Tiền thu" },
  ]);
  const insets = useSafeAreaInsets();

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "first":
        return <ListSpendMoney isEditing={isEditing} />;
      case "second":
        return <ListRevenueMoney isEditing={isEditing} />;
      default:
        return null;
    }
  };

  const [isEditing, setIsEditing] = React.useState(false);

  const renderTabBar = (props: any) => {
    const navigation = useNavigation();

    return (
      <View
        className="flex-row items-center justify-between px-3 bg-menuBg border-b border-borderDark"
        style={{ paddingTop: insets.top, height: insets.top + 55 }}
      >
        {/* Nút Back */}
        <View className="flex-1 items-start">
          <TouchableOpacity className="p-1" onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

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

        {/* Nút sửa */}
        <View className="flex-1 items-end">
          <TouchableOpacity
            className="p-1"
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text className="text-primary text-[20px]">
              {isEditing ? "OK" : "Sửa"}
            </Text>
          </TouchableOpacity>
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
export default EditTabView;

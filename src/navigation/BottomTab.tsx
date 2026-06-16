import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants/colors";
import InputScreen from "../screen/InputScreen/InputScreen";
import CalendarScreen from "../screen/CalendarScreen/CalendarScreen";
import ReportScreen from "../screen/ReportScreen/ReportScreen";
import BudgetScreen from "../screen/BudgetScreen/BudgetScreen";
import SettingScreen from "../screen/SettingScreen/SettingScreen";

const Tab = createBottomTabNavigator();
export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "help";
          if (route.name === "Input") {
            iconName = "pencil-outline";
          } else if (route.name === "Calendar") {
            iconName = "calendar-clear-outline";
          } else if (route.name === "Report") {
            iconName = "pie-chart-outline";
          } else if (route.name === "Budget") {
            iconName = "wallet-outline";
          } else if (route.name === "Setting") {
            iconName = "settings-outline";
          }
          return <Ionicons name={iconName} color={color} size={30} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.iconGray,
        tabBarStyle: {
          backgroundColor: COLORS.menuBg,
          borderTopWidth: 1,
          borderTopColor: COLORS.borderDark,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Input" component={InputScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />
      <Tab.Screen name="Budget" component={BudgetScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}

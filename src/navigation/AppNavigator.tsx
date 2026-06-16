import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import EditScreen from "../screen/InputScreen/EditScreen";
import EditCategory from "../screen/InputScreen/EditCategory";
import TransactionForm from "../components/common/TransactionForm";
import InfoAppScreen from "../screen/SettingScreen/InfoAppScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTab"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditCategory"
          component={EditCategory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TransactionForm"
          component={TransactionForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InfoAppScreen"
          component={InfoAppScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

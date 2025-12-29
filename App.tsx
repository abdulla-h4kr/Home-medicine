import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MedicineListScreen from "./src/screens/MedicineListScreen";
import AddMedicineScreen from "./src/screens/AddMedicineScreen";
import LocationsScreen from "./src/screens/LocationsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Medicines" component={MedicineListScreen} />
          <Tab.Screen name="Add" component={AddMedicineScreen} />
          <Tab.Screen name="Locations" component={LocationsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

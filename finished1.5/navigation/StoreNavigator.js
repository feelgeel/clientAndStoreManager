import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Manualordering from "../screens/ManualOrder";
import Sell from "../screens/Sell";



const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="manualOrdering" component={Manualordering} />
    <Stack.Screen name="sell" component={Sell} />
  </Stack.Navigator>
);

export default FeedNavigator;

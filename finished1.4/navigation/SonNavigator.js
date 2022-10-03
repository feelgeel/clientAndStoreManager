import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SonSelfServingScreen from "../screens/selfServing/SonSelfServingScreen";
import ClientTransaction from "../screens/TransactionFolder/ClientTransaction";
import SonModeScreens from "../screens/SonModeScreens";
import ClientCashScreen from "../screens/cash/ClientCashScreen";


const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SonselfServing" component={SonSelfServingScreen}/>
    <Stack.Screen name="SonModeScreen" component={SonModeScreens} />
  </Stack.Navigator>
);

export default FeedNavigator;

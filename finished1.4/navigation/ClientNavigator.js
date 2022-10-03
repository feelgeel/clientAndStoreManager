import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SelfServingScreen from "../screens/selfServing/SelfServingScreen";
import ClientTransaction from "../screens/TransactionFolder/ClientTransaction";
import ClientModeScreen from "../screens/ClientModeScreens";
import ClientListScreen from "../screens/showListNames/ClientListScreen";
import ClientCashScreen from "../screens/cash/ClientCashScreen";
import ImgPlay from "../screens/ImgPlay";
import RegisterScreen from "../screens/RegisterScreen";


const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
     <Stack.Screen name="RegisterScreen" component={RegisterScreen} /> 
     <Stack.Screen name="showlists" component={ClientListScreen} /> 
    <Stack.Screen name="clientTransaction" component={ClientTransaction} />
    <Stack.Screen name="selfServing" component={SelfServingScreen} />
    <Stack.Screen name="clientCash" component={ClientCashScreen} />
    <Stack.Screen name="clientModeScreen" component={ClientModeScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;

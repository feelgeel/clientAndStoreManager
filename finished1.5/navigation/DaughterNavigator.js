import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SonSelfServingScreen from "../screens/selfServing/SonSelfServingScreen";
import ModeScreens from "../screens/DaughterModeScreens";


const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SonselfServing" component={SonSelfServingScreen}/>
    <Stack.Screen name="DaughterModeScreens" component={ModeScreens} />
  </Stack.Navigator>
);

export default FeedNavigator;

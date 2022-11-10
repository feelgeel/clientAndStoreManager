import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import fatherModeScreens from "../screens/fatherModeScreens";
import FatherListScreen from "../screens/showListNames/FatherListScreen";
import FatherCashScreen from "../screens/cash/FatherCashScreen";
import AddFamilyMember from "../screens/familyMember/AddFamilyMember";


const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
     <Stack.Screen name="fatherListScreen" component={FatherListScreen}/> 
    <Stack.Screen name="addFamilyMember" component={AddFamilyMember} />
    <Stack.Screen name="FatherCashScreen" component={FatherCashScreen} />
    <Stack.Screen name="fatherModeScreen" component={fatherModeScreens}/>
  </Stack.Navigator>
);

export default FeedNavigator;

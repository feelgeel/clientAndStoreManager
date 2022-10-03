import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AccountScreen from "../screens/AccountScreen";
import NewListingButton from "./NewListingButton";
import FeedNavigator from "./FeedNavigator";
const Tab = createBottomTabNavigator();
const AppNavigator = () => {
 
  return(
    <Tab.Navigator
    >
    <Tab.Screen
      name="Feed"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home"
           color={color} size={size} />
          ),
        }}
        />
    <Tab.Screen
      name="ListingEdit"
      component={AccountScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewListingButton
          // onPress={() => navigation.navigate(transMode)}
          />
          ),
          
        })}
        />
    <Tab.Screen
      name="Account"
      component={AccountScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" 
          color={color} size={size} />
          ),
        }}
        />
  </Tab.Navigator>
)
      };

export default AppNavigator;

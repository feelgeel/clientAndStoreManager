import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import ManualOrder from "../screens/ManualOrder";
import NewListingButton from "./NewListingButton";
import StoreNavigator from "./StoreNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();


const GrossNavigator = () => {

  return(
    <Tab.Navigator>
    <Tab.Screen
      name="Feed"
      component={StoreNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        />
    <Tab.Screen
      name="ListingEdit"
      component={ManualOrder}
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
      component={ManualOrder}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        />
  </Tab.Navigator>
)
      };

export default GrossNavigator;

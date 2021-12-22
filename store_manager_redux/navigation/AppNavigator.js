import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import listContext from "../list_context/list-context";
import { useSelector, useDispatch } from "react-redux";
import *as listNamesAction from '../redux/listNames';
const Tab = createBottomTabNavigator();


const AppNavigator = () => {
  const transMode=useSelector(state=>state.entities.listNames.transMode)
  const dispatch=useDispatch();
  const context=useContext(listContext)
let scanner="modeScreen";
let TheMode=context.Mode;
switch (TheMode) {
  case "":
     scanner="modeScreen";
    break;
  case "selfServing":
     scanner="selfServing";
    break;
  case "byuFromStore":
     scanner="byuFromStore";
    break;
  case "sell":
     scanner="sell";
    break;
  case "transaction":
     scanner="transaction";
    break;
  case "orderProducts":
     scanner="orderProducts";
    break;
  case "manualOrdering":
     scanner="manualOrdering";
    break;
  case "listOrdering":
     scanner="listOrdering";
    break;

  default:
    break;
}
  return(
    <Tab.Navigator>
    <Tab.Screen
      name="Feed"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        />
    <Tab.Screen
      name="ListingEdit"
      component={ListingEditScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewListingButton
          onPress={() => navigation.navigate(transMode)}
          />
          ),
          
        })}
        />
    <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        />
  </Tab.Navigator>
)
      };

export default AppNavigator;

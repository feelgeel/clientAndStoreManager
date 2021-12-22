import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import listContext from "../list_context/list-context";

const Tab = createBottomTabNavigator();


const AppNavigator = () => {
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
          onPress={() => navigation.navigate(scanner)}
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

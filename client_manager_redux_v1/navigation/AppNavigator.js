import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import ClientNavigator from "./ClientNavigator";
import StoreNavigator from "./StoreNavigator";
import OwnerNavigator from "./OwnerNavigator";
import WorkerNavigator from "./WorkerNavigator";
import manufactureNavigator from "./manufactureNavigator";
import supplierNavigator from "./supplierNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
// import listContext from "../list_context/list-context";
import { useSelector, useDispatch } from "react-redux";
import *as listNamesAction from '../redux/listNames';
const Tab = createBottomTabNavigator();


const AppNavigator = () => {
  const transMode=useSelector(state=>state.entities.listNames.transMode)
  const accountType=useSelector(state=>state.entities.accountType.account)
  const dispatch=useDispatch();
  let selectedNavigator=ClientNavigator
  // const context=useContext(listContext)
let scanner="modeScreen";
// let TheMode=context.Mode;
switch (accountType) {
  case "client":
  selectedNavigator=ClientNavigator;
  dispatch(listNamesAction.setTransMode("clientModeScreen"))
  break;
  case "father":
  selectedNavigator=ClientNavigator;
  dispatch(listNamesAction.setTransMode("clientModeScreen"))
  break;
  case "son":
  selectedNavigator=ClientNavigator;
  dispatch(listNamesAction.setTransMode("clientModeScreen"))
  break;
  case "owner":
  selectedNavigator=OwnerNavigator;
  dispatch(listNamesAction.setTransMode("ownerNavigator"))
  break;
  case "worker":
  selectedNavigator=WorkerNavigator;
  dispatch(listNamesAction.setTransMode("workerNavigator"))
  break;
  case "manufacture":
  selectedNavigator=manufactureNavigator;
  dispatch(listNamesAction.setTransMode("manifactureModeScreen"))
  break;
  case "supplier":
  selectedNavigator=supplierNavigator;
  dispatch(listNamesAction.setTransMode("supplierModeScreen"))
    break;
  default:
    break;
}
// switch (transMode) {
//   case "":
//      scanner="modeScreen";
//     break;
//   case "selfServing":
//      scanner="selfServing";
//     break;
//   case "byuFromStore":
//      scanner="byuFromStore";
//     break;
//   case "sell":
//      scanner="sell";
//     break;
//   case "transaction":
//      scanner="transaction";
//     break;
//   case "orderProducts":
//      scanner="orderProducts";
//     break;
//   case "manualOrdering":
//      scanner="manualOrdering";
//     break;
//   case "listOrdering":
//      scanner="listOrdering";
//     break;

//   default:
//     break;
// }
  return(
    <Tab.Navigator>
    <Tab.Screen
      name="Feed"
      component={selectedNavigator}
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

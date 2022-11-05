import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import ClientNavigator from "./ClientNavigator";
import StoreNavigator from "./StoreNavigator";
import fatherNavigator from "./fatherNavigator";
import SonNavigator from "./SonNavigator";
import DaughterNavigator from "./DaughterNavigator";
import WorkerNavigator from "./WorkerNavigator";
import manufactureNavigator from "./manufactureNavigator";
import supplierNavigator from "./supplierNavigator";
import NewListingButton from "./NewListingButton";
import ClientModeScreens from "../screens/ClientModeScreens";
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
  selectedNavigator=fatherNavigator;
  dispatch(listNamesAction.setTransMode("fatherModeScreen"))
  break;
  case "son":
  selectedNavigator=SonNavigator;
  dispatch(listNamesAction.setTransMode("SonModeScreen"))
  break;
  case "daughter":
  selectedNavigator= DaughterNavigator;
  dispatch(listNamesAction.setTransMode("DaughterModeScreens"))
  break;
  case "storeOwner":
  selectedNavigator=StoreNavigator;
  dispatch(listNamesAction.setTransMode("storeModeScreens"))
  break;
  case "storeworker":
  selectedNavigator=WorkerNavigator;
  dispatch(listNamesAction.setTransMode("workerModeScreens"))
  break;
  case "supplier":
  selectedNavigator=supplierNavigator;
  dispatch(listNamesAction.setTransMode("SupplierModeScreens"))
    break;
  case "supplierWorker":
  selectedNavigator=WorkerNavigator;
  dispatch(listNamesAction.setTransMode("supplierWorker"))
  break;
  case "manifacture":
  selectedNavigator=manufactureNavigator;
  dispatch(listNamesAction.setTransMode("ManifactureModeScreen"))
  break;
  case "manufactureWorker":
  selectedNavigator=manufactureNavigator;
  dispatch(listNamesAction.setTransMode("manifactureModeScreen"))
  break;
  default:
    break;
}
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
      component={ClientModeScreens}
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

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import listScreen from '../screens/listScreen';
import AddItemScreens from '../screens/AddItemScreens';
import ShowListsScreen from '../screens/showListsScreen';
import AddItemScreens1 from '../screens/AddItemScreens1';
import ListingEditScreen from '../screens/ListingEditScreen';
import storesScreen from '../screens/storesScreen';
import categFilter from '../screens/categFilter';
import mainCategFilter from '../screens/mainCategFilter';
import productScreen1 from '../screens/productScreen2';
import UpdateTwoStatesOnce from '../screens/updateTwoStatesOnce';
import prodPickerScreen from "../screens/prodPickerScreen";
import chosenProdScreen from '../screens/chosenProdScreen';
import codeBarScreen from "../screens/codeBarScreen";
import qrcode from "../screens/qrcodegenerator";
import Qrcodescanner from "../screens/qrcodescanner";


const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
     {/* <Stack.Screen name="showlists" component={productScreen1} />  */}
     <Stack.Screen name="showlists" component={ShowListsScreen} /> 
    <Stack.Screen name="addList" component={ListingEditScreen} />
    <Stack.Screen name="showlistitems" component={listScreen} />
    <Stack.Screen name="itemDetails" component={prodPickerScreen} />
    <Stack.Screen name="add" component={AddItemScreens} />
    <Stack.Screen name="add1" component={AddItemScreens1} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    <Stack.Screen name="stores" component={storesScreen} />
    <Stack.Screen name="categFilter" component={categFilter} />
    <Stack.Screen name="mainCategfilter" component={mainCategFilter} />
    <Stack.Screen name="products" component={productScreen1} />
    {/* <Stack.Screen name="codeBar" component={codeBarScreen} /> */}
    <Stack.Screen name="codeBar" component={qrcode} />
    <Stack.Screen name="qrcodescanner" component={Qrcodescanner} />
    <Stack.Screen name="chosenProd" component={chosenProdScreen} />
    {/* <Stack.Screen name="products" component={UpdateTwoStatesOnce} /> */}
  </Stack.Navigator>
);

export default FeedNavigator;

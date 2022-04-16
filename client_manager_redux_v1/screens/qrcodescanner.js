import React, { useState, useEffect,useContext } from 'react';
import { View, StyleSheet, Text, button, Button,FlatList } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import listContext from "../list_context/list-context";
import { ListItem} from "../components/lists";
import Screen from "../components/Screen";
import Icon from '../components/Icon';
import { Modal } from "react-native-paper";
import colors from "../config/colors";
import itemContext from "../list_context/list-context";
import TextInput from "../components/TextInput";
import SvgQRCode from 'react-native-qrcode-svg';
import JWT from 'expo-jwt';

// import jwt from "jsonwebtoken";
import {
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import * as Yup from "yup";
const Qrcodescanner = ({ navigation ,route}) => {

  const [gting, setGting] = useState("");
  const [visible, setVisible] =useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [scanned, setScanned] = useState(false);
  const [hasCameraPermission, setCameraPermission] = useState(null);
const context=useContext(itemContext);
let listname=context.TheListName;
let key="cisco";
useEffect(() => {
  (async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setCameraPermission(status === 'granted');
  })();
}, []);
const coded=(code,key)=>{
 return JWT.encode(code, key, { algorithm: 'none' });
}
let tryObj={hee:"trtr"}
// console.log("coded",coded(tryObj,"hh").length);
// listname=JSON.stringify(listname);
  let vr={_id: "6005332687757b23685cf16c",
  name: "mayonaise",
  main_categ: "condiment",
  quantity: 1,
  status: false,
  
  chosenProdIds: [],
  ThechosenProdId: [],}
  const user=context.User;
  // console.log(JSON.stringify(vr));
  const store={
    userId: "60eadcfd38c8cf147cb87ffc",
    listNameID: "0.25245.2562",
    timeReseave: "22/03/2016",
    timeSend: "22/03/2016",
    seller: {
      email: "jafar@gmail.com"
    },
    prod: [{
      storeName: "grossery",
      categName: "milk",
      status:false,
      storeGting: [{
        gting: "6132254568568",
        price: 50,
        quantity: 1
      }],
      quant: 5
    }]
  }
  const client={
    userId: "60eadcfd38c8cf147cb87ffc",
    listNameID: "0.25245.2562",
    timeSend: "22/03/2016",
    prod: [{
      storeName: "grossery",
      categName: "milk",
      prodGting: [{
        gting: "6132254568568",
        quantity: 1
      }],
      quant:1
    }]
  }
  const listName={
    listName: "cisco_gross",
    _id: "0.25245.2562",
    createdTime: "22/03/2016",
    prod: [{
      storeName: "grossery",
      categName: "milk",
      prodGting: [{
        gting: "6132254568568",
        quantity: 1
      }],
      totalQuantity:1
    }],
    prodObj:[{}]
  }
  // console.log(listName);
  const handleBarCodeScanned=({ type, data })=>{
    setScanned(true);
    setGting(data)
    if(user.type==="client"){
     
      if(type==256){
        // let dataObj=JSON.parse(data)
          // if(user.userId==dataObj.userId){
            // console.log("coded",coded(data,key));
            console.log("data", JSON.stringify(data));
          // }else{
          //   console.log("wrong customer");
          // }
      }else if(type==32){
        console.log("EAN13");
      }
    }else{
      if(type==256){
        console.log("qrcode");
      }else{ if(type==32)
        console.log("EAN13");
      }

    }
  }
  // {"userId":"60eadcfd38c8cf147cb87ffc","listName":"0.25245.2562","timeStamp":"22/03/2016","prod":[{"storeType":"grossery","categName":"milk","seller":{"email":"jafar@gmail.com"},"storeGting":[{"gting":"6132254568568","price":50,"quantity":1}],"quant":1}]}
return (
  <Screen>
     {/* <Text>{gting}</Text> */}
 <View 
//  style={{flex:1,paddingTop:"50%",justifyContent:"center",alignItems:"center"}}
 >
 <Button
 title="hello"
 />
 <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.Type.qr,BarCodeScanner.Constants.Type.ena13]}
        
        // style={styles.bar}
      />
       {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} 
   
 </View>
    
  </Screen>
  );
};


const styles = StyleSheet.create({
    bar:{
        width:"100%",
        height:"90%"
    }
 });
export default Qrcodescanner;
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

// import jwt from "jsonwebtoken";
import {
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import * as Yup from "yup";
const Qrcodescanner = ({ navigation ,route}) => {
  const [hasCameraPermission, setCameraPermission] = useState(null);
  const [gting, setGting] = useState("");
  const [visible, setVisible] =useState(false);
  const showModal = () => setVisible(true);
   const hideModal = () => setVisible(false);
  const [scanned, setScanned] = useState(false);
const context=useContext(itemContext);
let listname=context.TheListName;
// console.log(listname);
listname=JSON.stringify(listname);
  let vr={_id: "6005332687757b23685cf16c",
  name: "mayonaise",
  main_categ: "condiment",
  quantity: 1,
  status: false,
  
  chosenProdIds: [],
  ThechosenProdId: [],}

  // listname=JSON.stringify(listname);
  // let jwttoken=jwt.sign(listname,"123")
  // console.log(jwttoken.length);
  const handleBarCodeScanned=({ type, data })=>{
    setScanned(true);
    setGting(data)
    let list_arr=JSON.parse(data)
    context.addToList(list_arr)
    showModal()
  }
return (
  <Screen>
     <Text>{gting}</Text>
 <View style={{paddingTop:"50%",justifyContent:"center",alignItems:"center"}}>
 <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.Type.qr,BarCodeScanner.Constants.Type.ena13]}
        
        style={styles.bar}
      />
       {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} 
   
 </View>
    
  </Screen>);
};


const styles = StyleSheet.create({
    bar:{
        width:"100%",
        height:"90%"
    }
 });
export default Qrcodescanner;
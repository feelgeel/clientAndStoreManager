import React, { useContext, useState ,useEffect} from 'react';
import { Button, Modal, FlatList, StyleSheet, Text, View,textInput } from 'react-native';
import Screen from '../components/Screen';
import listContext from '../list_context/list-context';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {  Card, Title,List } from 'react-native-paper';
import TextInput from "../components/TextInput";
import { ListItem } from '../components/lists';
import Icon from '../components/Icon';
import colors from '../config/colors';
import { useSelector, useDispatch } from "react-redux";
import *as addingGtingAction from '../redux/addingGting';
import *as listNamesAction from '../redux/listNames';
import {updateProducts} from '../api/productsApi';
import {getGrosseryByGting} from '../api/grosseryApi';
import {getStock,updateStock} from '../api/stockApi';
import {addByu} from '../api/byuApi';
import {updateListNames} from '../api/listNameApi';
import ListChoosingScreen from './ListChoosingScreen';
function ListOrdering({navigation,route}) {
  const dispatch=useDispatch();
  const transMode=useSelector(state=>state.entities.listNames.transMode)
  const listNames=useSelector(state=>state.entities.listNames.list)
  const theChosen=useSelector(state=>state.entities.addingGting.chosen)
  const theListName=useSelector(state=>state.entities.listNames.theList)
    const context=useContext(listContext);
    const [scannedgting, setScannedgting] = useState("6130760003769");
    const [price, setprice] = useState(1);
    const [quantity, setquantity] = useState(1);
    const [Scannedresult, setScannedresult] = useState([]);
    const [theProducts, setTheProducts] = useState([]);
    const [data, setdata] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [Resultmodal, setResultmodal] = useState(false);
    // let listNames=context.ListName
    let TheListName={...context.TheListName}
    let Purchases=context.Purchase;
    let finishedObj=[]

  // console.log(listNames)
  // console.log(Purchases)
//  useEffect(()=>{
//   setTheProducts(theChosen);
//  },[theChosen])

    //////////////////////////////////////
  // console.log(theProducts)

    ////////////////////////////////////////

    const handleBarCodeScanned=({ type, data })=>{
     console.log("type",type);
     console.log("data",data);
      }
      // console.log(DATA[0])
      const Item = ({ title }) => (
        <View style={styles.item}>
          <Text onPress={()=>console.log(title)} 
          style={styles.title}>{title}</Text>
        </View>
      );
      const handleChecked=async()=>{ 
        // console.log(updatedprod);
        //6130433000200
        //6133320000802
       
            }
            
            // console.log(data)
      const handleChoose=(item)=>{
      let dttt=data.map(tr=>{
        console.log(tr)
      })
      
      }
      const handlegting=async()=>{
     console.log(scannedgting)
        const grossRes=await getGrosseryByGting(scannedgting);
      if(grossRes.ok){
        console.log("prod exist in our db next is to check da stock")
        const stockRes=await getStock(scannedgting);
        if(stockRes.ok){
          console.log("we got da stock")
          let daStock= stockRes.data
          if(daStock.quantity>0){
            console.log("set the setPrice to daStock.sellprice and then open quant modifier")
          }else if(daStock.quantity==0){
            console.log("quant is zero redirect to order or set the quantity to be negative")
          }else{
            console.log("the quant is negative pls update ur stock")
          }
        }else{
          navigation.navigate("orderProducts")
          console.log("prod never entered our shop redirect to order")
        }
          // console.log(stockRes)
      }else {
        navigation.navigate("orderProducts")
        console.log("prod doesn't exist rescan again and make sure the gting is right",scannedgting)
      }
        // console.log(grossRes)

      }
      // console.log("the",theProducts)
return (
<Screen style={styles.container}>
<Text>listordering tatatat</Text>
<Button
title="scan"
onPress={()=>setModalVisible(true)} />
<Button
title="exit selfServing mode"
onPress={()=>{
    context.setModes("")
    dispatch(listNamesAction.setTransMode("modeScreen"));
navigation.navigate("modeScreen")
}
} />
       <ListChoosingScreen/> 
    {/* </List.Section> */}
      
 <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <Button
        title="done"
        onPress={()=>setModalVisible(false)} />
        <TextInput keyboardType="number-pad" 
        placeholder="gting"
        onChangeText={(text)=>{
          setScannedgting(text)
          // console.log(tex)
        }
          } />
        <Button
        title="checked"
        onPress={()=>{
          handlegting()
          // setResultmodal(true);
         }} />
        {/* <View style={{flex:1,paddingTop:"50%",justifyContent:"center",alignItems:"center"}}>
          <BarCodeScanner
         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
         // barCodeTypes={[BarCodeScanner.Constants.Type.qr,BarCodeScanner.Constants.Type.ena13]}
       
         style={styles.bar}
          />
        {scanned && <Button title={'Tap to Scan'} onPress={() => setScanned(false)} />} 
  
</View> */}
      </Modal>
 <Modal
        animationType="slide"
        visible={Resultmodal}
        onRequestClose={() => {
          setResultmodal(false);
        }}
      >
        <Button
        title="price"
        onPress={()=>{
          setResultmodal(false)}} />
    <TextInput keyboardType="number-pad" 
        placeholder="price"
        onChangeText={(text)=>{
          setprice(text)
          // console.log(tex)
        }
          } />
    <TextInput keyboardType="number-pad" 
        placeholder="quantity"
        onChangeText={(text)=>{
          setquantity(text)
          console.log(text)
        }
          } />
  
     
<View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
<Button title='cancel'

 onPress={()=>{
  setResultmodal(false)
 }}
/>
<Button title='OK'
  onPress={()=>{
    handleChecked()
 }}
/>
</View>
      </Modal>
</Screen>
 );
}
const styles = StyleSheet.create({
  bar:{
    width:"100%",
    height:"90%"
},
item: {
  backgroundColor: '#f9c2ff',
  padding: 20,
  marginVertical: 8,
},
header: {
  fontSize: 32,
  backgroundColor: '#fff',
},
title: {
  fontSize: 24,
},
})
export default ListOrdering;
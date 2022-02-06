import React, { useState } from 'react';
import { StyleSheet, View,Modal,TextInput,Button,Text } from 'react-native';
import AddProducts from '../components/AddProducts';
import Screen from '../components/Screen';
import {getProductByName} from "../api/grosseryApi"
import { useSelector, useDispatch } from "react-redux";
import *as storeListNamesActions from '../redux/store_listNames';


const containerStyle = {backgroundColor: 'white', padding: 20};
function ListOrderingScreen({children,style}) {
  const dispatch=useDispatch();
  const storeListnames=useSelector(state=>state.entities.store_listNames)
  const user=useSelector(state=>state.entities.users.list)
  const [product,setproduct]=useState([]);
  const [chosen,setchosen]=useState([]);
  const [thechosen,setthechosen]=useState({});
  const [quantityModal,setquantityModal]=useState(false);
  const [quantity,setQuantity]=useState(1);

// console.log(storeListnames.list)
  const handleQuantity=async()=>{
    let newProd=[...product]
   let newChosen=[...chosen]
   let newtheChosen={...thechosen}
   let dtt={}
   let newstoreListnames={...storeListnames}
  dtt={
 timeStamp:Date.now(),
 Gting:newtheChosen.Gting,
 userId:user.userId,
 status:false,
 quantity:quantity
  }
  dispatch(storeListNamesActions.addListName(dtt));
console.log(storeListnames.list)
 
 }

  const handleUnselected=(data)=>{
    setthechosen(data)
    // console.log(thechosen)
    setquantityModal(true)
    // handleQuantity(data)
    // console.log(data)
  
  }
  const handleSave=async(store,categ)=>{
    const {data:prod}=await getProductByName(store,categ);
    setproduct(prod)
  }
  // console.log(quantity)
return (
<Screen style={styles.container}>
<AddProducts onUnselected={(dt)=>handleUnselected(dt)} 
product={product}
 chosen={chosen}
  onSave={(store,categ)=>handleSave(store,categ)}/>

  <Modal 
 animationType="slide"
 // transparent={true}
 contentContainerStyle={containerStyle}
 visible={quantityModal}
 onRequestClose={() => {
   // Alert.alert("Modal has been closed.");
   setquantityModal(false);
 }}
>
<View style={{
    flexDirection:"row",justifyContent:"center"}}>
    <Text style={{paddingRight:20,fontSize:30}}>quantity</Text>
<TextInput  keyboardType="number-pad"  onChangeText={(t)=>setQuantity(t)} 
placeholder="quantity" style={{width:50,height:50}}/>

</View>
     
<View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
<Button title='cancel'

 onPress={()=>{
  setquantityModal(false)
 }}
/>
<Button title='OK'
  onPress={()=>{
    handleQuantity()
 }}
/>
</View>

      </Modal>
</Screen>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ListOrderingScreen;
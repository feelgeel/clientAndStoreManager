import React, { useState, useEffect } from 'react';
import { StyleSheet, View,Modal,TextInput,Button,Text,FlatList } from 'react-native';
import AddProducts from '../components/AddProducts';
import Screen from '../components/Screen';
import {getProductByName} from "../api/grosseryApi"
import { useSelector, useDispatch } from "react-redux";
import *as storeListNamesActions from '../redux/store_listNames';
import *as storeproductsActions from '../redux/store_products';
import Icon from './../components/Icon';
import colors from '../config/colors';
import { ListItem, ListItemSeparator } from "../components/lists";
import GeneratedQrCode from '../components/GeneratedQrCode';
import { storeAddListName } from '../api/store_ListNameApi';
import { storeAddProducts } from '../api/store_productsApi';
import *as listNamesAction from '../redux/listNames';
const containerStyle = {backgroundColor: 'white', padding: 20};
function ListOrderingScreen({navigation,children,style}) {
  const dispatch=useDispatch();
  const storeListnames=useSelector(state=>state.entities.store_listNames.list)
  const storeproducts=useSelector(state=>state.entities.store_products.list)
  const listProducts=useSelector(state=>state.entities.store_products.listproducts)
  const user=useSelector(state=>state.entities.users.list)
  const [product,setproduct]=useState([]);
  const [chosen,setchosen]=useState([]);
  const [thechosen,setthechosen]=useState({});
  const [quantityModal,setquantityModal]=useState(false);
  const [Modalproduct,setModalproduct]=useState(false);
  const [modalAddList,setmodalAddList]=useState(false);
  const [quantity,setQuantity]=useState(1);
  const [ListName,setListName]=useState("");
  const [selectedListName,setselectedListName]=useState({});
  const [TheListName,setTheListName]=useState([]);
  const [ModalQR,setModalQR]=useState(false);

  let vr={
  listid: selectedListName._id,
  userId: user._id,
  type:user.mode,
}
// console.log("user",user)
  let listname=JSON.stringify(vr);
  useEffect(()=>{
    setTheListName(storeListnames)
    setchosen(listProducts)
  },[storeListnames,storeproducts])
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
 productId:thechosen._id,
 listId:selectedListName._id,
 status:false,
 quantity:quantity,
  }
  newChosen.push(dtt)
  const index = newProd.findIndex(dt=>dt._id===dtt.productId);
  if(index>=0){
    newProd.splice(index,1);

  }
  setproduct(newProd);
  const {data:savedProd}=await storeAddProducts(dtt)
  dispatch(storeproductsActions.addListName(savedProd));
  dispatch(storeproductsActions.setlistProds(newChosen));
  // setchosen(newChosen)
  console.log(savedProd)
  setquantityModal(false)
// console.log(index)
 
 }

  const handleUnselected=(data)=>{
    setthechosen(data)
    // console.log(thechosen)
    setquantityModal(true)
    // handleQuantity(data)
    // console.log(data)
  
  }
  const handleSave=async(store,categ)=>{ 
    console.log(categ)
    const {data:prod}=await getProductByName(store,categ);
    // const {data:prod}=await getGrosseryByName(categ);
    setproduct(prod)
  }
  const handleSaveListName=()=>{
    // dispatch(storeListNamesActions.addListName(ListName));
  }
  console.log(chosen)
return (
<Screen style={styles.container}>
<Button
title="exit manualOrdering mode"
onPress={()=>{
    // context.setModes("")
    dispatch(listNamesAction.setTransMode("modeScreen"));
navigation.navigate("modeScreen")
}
} />
<ListItem
          title="add an order"
          IconComponent={
            <Icon
              name="plus-circle"
              backgroundColor={colors.secondary}
              />
            }
            onPress={()=>{
              setmodalAddList(true)
            }}
        />
          <FlatList
          data={TheListName}
          keyExtractor={(TheListName) => (TheListName._id).toString()}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => 
          {  
              return<ListItem
                title={item.listName}
                // title={item.listName}
                quantity={true}
                IconComponent={
                  <Icon
                    name={"menu"}
                    backgroundColor={colors.primary}
                  />
                }
                onPress={()=>{ 
                  setselectedListName(item)
                  let newProd=storeproducts.filter(data=>data.listId==item._id)
                  // console.log("filtered prod",newProd)
                  setchosen(newProd)
                  dispatch(storeproductsActions.setlistProds(newProd));
                  dispatch(storeListNamesActions.setTheListName(item));
                  setModalproduct(true)
                  console.log("newprod",newProd)
                }}
                onLongPress={()=>{
                  console.log("halo");
                }}
                
                
              />
            }
          }
        />

      {/*                     adding a list                   */}
        <Modal
          animationType="slide"
          // transparent={true}
          contentContainerStyle={containerStyle}
          visible={modalAddList}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setmodalAddList(false);
          }}
        >
            <View style={{
              flexDirection:"row",justifyContent:"center"}}>
              {/* <Text style={{paddingRight:20,fontSize:30}}>listName</Text> */}
            <TextInput  onChangeText={(t)=>setListName(t)} 
            placeholder="listName" style={{fontSize:30}}/>

            </View>
     
            <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
            <Button title='cancel'

             onPress={()=>{
              setmodalAddList(false)
             }}
            />
            
            <Button title='OK'
             onPress={async()=>{
              //  let id=Math.random()*Math.random()
               let theListname={
                //  _id:id,
                 listName:ListName,
                 userId:user.userId,
                 timeStamp:Date.now(),
                 status:false,
                 totalQuantity:0,
                 totalPrice:0,
                 unfinished:0,
                 finished:0
                }
                 console.log(ListName)
                //  setListName(theListname)
                 setTheListName(theListname)
                 const {data:savedlistname}=await storeAddListName(theListname)
                 dispatch(storeListNamesActions.addListName(savedlistname));
                 setmodalAddList(false)
                  // console.log(savedlistname)
                handleSaveListName();
             }}
              />
              </View>
        </Modal>
        {/*              add products           */}
  <Modal
   animationType="slide"
   // transparent={true}
   contentContainerStyle={containerStyle}
   visible={Modalproduct}
   onRequestClose={() => {
     // Alert.alert("Modal has been closed.");
     setModalproduct(false);
   }}
  >
  <Button title='send'

onPress={()=>{
  setproduct([])
 setModalQR(true)
}}
/>
  <Button title='QRCode'

onPress={()=>{
  
  setproduct([])
 setModalQR(true)
}}
/>
  <Button 
  title='cancel'
onPress={()=>{
  dispatch(storeproductsActions.loadListNames([]));
  setproduct([])
 setModalproduct(false)
}}
/>
  <Button title='save'

onPress={()=>{
 setquantityModal(false)
 setModalproduct(false)
}}
/>
<AddProducts 
onUnselected={(dt)=>handleUnselected(dt)} 
product={product}
 chosen={chosen}
  onSave={(store,categ)=>handleSave(store,categ)}
  />


  </Modal>
{/*                      add quantity                */}
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
      <Modal
 visible={ModalQR}
>
<Button title='cancel'
  onPress={()=>{
    setModalQR(false)
 }}
/>
<GeneratedQrCode data={listname} />
</Modal>
</Screen>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ListOrderingScreen;
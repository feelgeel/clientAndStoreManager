import React, { useState } from 'react';
import { StyleSheet, View,Modal,TextInput,Button,Text,FlatList } from 'react-native';
import AddProducts from '../components/AddProducts';
import Screen from '../components/Screen';
import {getProductByName,getGrosseryByName} from "../api/grosseryApi"
import { useSelector, useDispatch } from "react-redux";
import *as storeListNamesActions from '../redux/store_listNames';
import Icon from './../components/Icon';
import colors from '../config/colors';
import { ListItem, ListItemSeparator } from "../components/lists";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const containerStyle = {backgroundColor: 'white', padding: 20};
function ListOrderingScreen({children,style}) {
  const dispatch=useDispatch();
  const storeListnames=useSelector(state=>state.entities.store_listNames)
  const user=useSelector(state=>state.entities.users.list)
  const [product,setproduct]=useState([]);
  const [chosen,setchosen]=useState([]);
  const [thechosen,setthechosen]=useState({});
  const [quantityModal,setquantityModal]=useState(false);
  const [Modalproduct,setModalproduct]=useState(false);
  const [modalAddList,setmodalAddList]=useState(false);
  const [quantity,setQuantity]=useState(1);
  const [ListName,setListName]=useState("");
  const [TheListName,setTheListName]=useState([]);

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
    console.log(categ)
    const {data:prod}=await getProductByName(store,categ);
    // const {data:prod}=await getGrosseryByName(categ);
    setproduct(prod)
  }
  const handleSaveListName=()=>{
    // dispatch(storeListNamesActions.addListName(ListName));
  }
  console.log(TheListName)
return (
<Screen style={styles.container}>

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
          // keyExtractor={(ListName) => ListName._id}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => 
          {  
              return<ListItem
                title="hello"
                // title={item.listName}
                quantity={true}
                IconComponent={
                  <Icon
                    name={"menu"}
                    backgroundColor={colors.primary}
                  />
                }
                onPress={()=>handleChoose(item)}
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
             onPress={()=>{
               let id=Math.random()*Math.random()
               let theListname={
                 listName:ListName,
                 userId:user.userId,
                 timeStamp:Date.now(),
                 status:false,
                 totalPrice:0,
                 unfinished:0,
                 finished:0
                }
                 console.log(ListName)
                //  setListName(theListname)
                 setTheListName(theListname)
                 dispatch(storeListNamesActions.addListName(theListname));
                 setmodalAddList(false)

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
</Screen>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ListOrderingScreen;
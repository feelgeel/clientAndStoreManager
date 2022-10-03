import React, { useState, useEffect } from 'react';
import { StyleSheet, View,Button,FlatList,TextInput,Modal,Text } from 'react-native';
import *as addingGtingAction from '../redux/addingGting';
import *as listNamesAction from '../redux/listNames';
import { useSelector, useDispatch } from "react-redux";
import Icon from '../components/Icon';
import colors from '../config/colors';
import {loadProducts,addProducts} from '../api/productsApi';
import {updateListNames} from '../api/listNameApi';
import {  Card, Title,List } from 'react-native-paper';
function ListChoosingScreen({theprod=[],theChosen=[]}) {
  const listId=useSelector(state=>state.entities.listNames.theList._id)
  const list=useSelector(state=>state.entities.listNames.list)
  const theListName=useSelector(state=>state.entities.listNames.theList)
  const addgting=useSelector(state=>state.entities.addingGting)
  const userid=useSelector(state=>state.entities.users.list.userId)
  const grosseryBygting=addgting.grosseryBygting;
  const thechosen=addgting.chosen;
  useEffect(()=>{
    setproduct(grosseryBygting)
    setchosen(thechosen)
    // setunfinished(theList.unfinished)
    // settotalQuantity(theList.totalQuantity)
  },[addgting])
  const dispatch=useDispatch();
  const [unselected,setUnselected]=useState(false);
  const [selected,setSelected]=useState(true);
  const [product,setproduct]=useState(grosseryBygting);
  const [chosen,setchosen]=useState(thechosen);
  const [quantity,setQuantity]=useState(1);
  const [unfinished,setunfinished]=useState(theListName.unfinished);
  const [totalQuantity,settotalQuantity]=useState(theListName.totalQuantity);
  const [modal,setModal]=useState(false);
  const [TheItem,setTheItem]=useState();
  // console.log(product)
 
  const handleUnselected=(item)=>{
    let oldProd={...item}
    let newprod={
      productId:item._id,
      listId,
      userId:userid,
      addedDate:Date.now(),
      checkedDate:"",
      product_type:item.product_type,
      Gting:item.Gting,
      image:item.image_front_url,
      brands:item.brands,
      status:false,
      modes:"client",
      price:0
    }
    console.log(newprod)
    setTheItem(newprod)
    setModal(true)
  }
  const handleQuantity=async()=>{
   let grosByGting=[...product]
  let newChosen=[...chosen]
  let newTheListName={...theListName}
  let newListNames=[...list];
  console.log( grosByGting.length)
  let theProd={...TheItem}
  let newQuant=Number(quantity)
  const index = grosByGting.findIndex(dt=>dt._id===theProd.productId);
  theProd.quantity=newQuant
  const {data:prod}=await addProducts(theProd);
  newChosen.push(prod)
  console.log("index",index)
  grosByGting.splice(index,1);
  newTheListName.unfinished++;
  newTheListName.totalQuantity+=newQuant
  const {data:updateThelistName}=await updateListNames(newTheListName._id,newTheListName);
  const index_listName = newListNames.findIndex(dt=>dt._id===newTheListName._id);
  newListNames[index_listName]=newTheListName
  // console.log('upsdatethelistname',updateThelistName)
  console.log( grosByGting.length)
  dispatch(listNamesAction.setTheListName(newTheListName));
  dispatch(listNamesAction.loadListNames(newListNames));
  dispatch(addingGtingAction.addChosen(newChosen));
  setchosen(newChosen);
  setproduct(grosByGting);
  setModal(false); 
}
// console.log(theListName)
  const handleSelected=(item)=>{
    let newProd=[...product]
  let newChosen=[...chosen]
  const index = newChosen.indexOf(item);
  let index_prod=newProd.findIndex(st=>st.categ===item.categ);
  newChosen.splice(index,1);
  // console.log("prodindex",index_prod)
  // console.log("index",index)
  if(index_prod!==-1){
    newProd.unshift(item)
    
    }
  dispatch(addingGtingAction.addGrossGting(newProd))
  dispatch(addingGtingAction.addChosen(newChosen))
  setproduct(newProd)
  setchosen(newChosen)
    // console.log("selected")
  }
  // console.log("grosseryBygting",grosseryBygting.length)
  // console.log("thechosen",thechosen.length)
  const containerStyle = {backgroundColor: 'white', padding: 20};
return (
<View style={styles.container}>


< View style={{flexDirection:"row",
              justifyContent:"space-between"}}>
              <Button style={{flex:0.5}} 
              title={product.length+'unselected'} 
              onPress={()=>{setUnselected(true);setSelected(false)}}
              />
              <Button style={{flexDirection:"row"}} title={chosen.length+'selected'} 
              onPress={()=>{setUnselected(false);setSelected(true)}}
              />

</View>
 {unselected&&<FlatList
          data={product}
          keyExtractor={(product) => product._id}
          
          renderItem={({ item }) => 
          {
              return (
                <Card 
                onPress={()=>handleUnselected(item)}
                >
                {<Card.Cover source={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
                <Card.Content>
                  <Title>{item.brands}</Title>
                </Card.Content>
                
              </Card>
              )
          }
        }
        />
}
         {selected&&<FlatList
          data={chosen}
          keyExtractor={(chosen) => chosen.productId}
          
          renderItem={({ item }) => 
          {
              return (
                <Card 
                onPress={()=>handleSelected(item)}
                >
                {<Card.Cover source={{ uri: item.image||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
                <Card.Content>
                  <Title>{item.brands}</Title>
                </Card.Content>
                
              </Card>
              )
          }
        }
        />
        }

        <Modal 
 animationType="slide"
 // transparent={true}
 contentContainerStyle={containerStyle}
 visible={modal}
 onRequestClose={() => {
   // Alert.alert("Modal has been closed.");
   setModal(false);
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
    setModal(false)
 }}
/>
<Button title='OK'
  onPress={()=>{
    handleQuantity()
 }}
/>
</View>

      </Modal>
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ListChoosingScreen;
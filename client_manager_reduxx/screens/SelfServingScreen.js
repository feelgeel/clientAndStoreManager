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
import {addByu} from '../api/byuApi';
import {updateListNames} from '../api/listNameApi';
function SelfServingScreen({navigation,route}) {
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
    const [theProducts, setTheProducts] = useState(theChosen);
    const [data, setdata] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [Resultmodal, setResultmodal] = useState(false);
    // let listNames=context.ListName
    let TheListName={...context.TheListName}
    let Purchases=context.Purchase;
    let finishedObj=[]

  // console.log(listNames)
  // console.log(Purchases)
 useEffect(()=>{
  setTheProducts(theChosen);
 },[theChosen])

    //////////////////////////////////////
listNames.map(t=>{
  const name=t.listName
  if(TheListName.listName==name){

    let data=[];
    Purchases.map(tr=>{
      if(name==tr.listName){
        data.push(tr)
      }
    })
    finishedObj.push({
      title:name,
      data
    })
  }
})
  console.log(theProducts)

    ////////////////////////////////////////

    const handleBarCodeScanned=({ type, data })=>{
     console.log("type",type);
     console.log("data",data);
      }
      const DATA = [
        {
          title: 'Main dishes',
          data: ['Pizza', 'Burger', 'Risotto'],
        },
        {
          title: 'Sides',
          data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
        },
        {
          title: 'Drinks',
          data: ['Water', 'Coke', 'Beer'],
        },
        {
          title: 'Desserts',
          data: ['Cheese Cake', 'Ice Cream'],
        },
      ];
      // console.log(DATA[0])
      const Item = ({ title }) => (
        <View style={styles.item}>
          <Text onPress={()=>console.log(title)} 
          style={styles.title}>{title}</Text>
        </View>
      );
      const handleChecked=async()=>{
        let newPrice=Number(price)
        let newquant=Number(quantity)
        let newTheListName={...theListName}
        let newListNames=[...listNames]
        let newdaProd=[...theProducts]
        const index = theChosen.findIndex(dt=>dt.Gting==scannedgting);
        const list_index = newListNames.findIndex(dt=>dt._id==newTheListName._id);
        let theChosenProd={...theChosen[index]}
        let oldquant=theChosenProd.quantity;
        let calcQuant=Number(oldquant)-Number(newquant);
        let newByu={
          productId:theChosenProd.productId,
          listId:theChosenProd.listId,
          userId:theChosenProd.userId,
          byuDate:Date.now(),
          Gting:theChosenProd.Gting,
          image:theChosenProd.image,
          brands:theChosenProd.brands,
          quantity:newquant,
          price:newPrice,
        }
        // console.log(theChosenProd)
        if(calcQuant<0){
          console.log("the number is too big ")
        }else if(calcQuant==0){
          theChosenProd.status=true;
          // theChosenProd.price=newPrice;
          theChosenProd.quantity=0;
          newdaProd[index]=theChosenProd;
          console.log(theChosenProd.quantity,"set the product to true")
        }else
        {
          theChosenProd.quantity=calcQuant;
          newdaProd[index]=theChosenProd;
          console.log(theChosenProd.quantity,"set the new quant")
        }

        const {data:updatedprod}=await updateProducts(theChosenProd._id,theChosenProd);
        const {data:byu}=await addByu(newByu);
        dispatch(addingGtingAction.addChosen(newdaProd));
        dispatch(addingGtingAction.addByu(byu));
         let notchecked=newdaProd.filter(dt=>dt.status==false)
        if(notchecked.length==0){
          // console.log("checked",checked)
          newTheListName.finished++;
          newTheListName.unfinished--;
          newTheListName.status=true;
          const {data:updateListname}=await updateListNames(theListName._id,newTheListName);
            dispatch(listNamesAction.setTheListName(updateListname));
            newListNames[list_index]=updateListname
            setModalVisible(false)
            setResultmodal(false)
          console.log("length is 0",newListNames)
          dispatch(listNamesAction.editListName(newListNames));
          }else{
            newTheListName.finished++;
            newTheListName.unfinished--;
            const {data:put_list}=await updateListNames(theListName._id,newTheListName);
            newListNames[list_index]=put_list
            setModalVisible(false)
            setResultmodal(false)
            console.log("length is not  0")
            dispatch(listNamesAction.addListName(newListNames));
            }
            
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
      // console.log("the",theProducts)
return (
<Screen style={styles.container}>
<Text>selfServing</Text>
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
           <FlatList
              data={theProducts}
              keyExtractor={(theProducts) => theProducts._id}
                  
              renderItem={({ item }) => 
              {
              return (
                <Card 
                style={{paddingTop:50}}
                // onPress={()=>handleDeleteChosen(item)}
                >
                {<Card.Cover source={{ uri: item.image||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
                <Card.Content>
                  <Title>{item.brands+" "+
                  item.Gting+" quantity: "
                  +item.quantity+" status: "+item.status}</Title>
                </Card.Content>
                
                </Card>
                  )
              }
    }
    />   
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
          setResultmodal(true);
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
export default SelfServingScreen;
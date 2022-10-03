import React, { useContext, useState ,useEffect} from 'react';
import { Button, Modal, FlatList, StyleSheet, Text, View,textInput } from 'react-native';
import Screen from '../../components/Screen';
import listContext from '../../list_context/list-context';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {  Card, Title,List } from 'react-native-paper';
import TextInput from "../../components/TextInput";
import { ListItem } from '../../components/lists';
import Icon from '../../components/Icon';
import colors from '../../config/colors';
import { useSelector, useDispatch } from "react-redux";
import *as addingGtingAction from '../../redux/addingGting';
import *as listNamesAction from '../../redux/listNames';
import *as sellStoreAction from '../../redux/Sell_store';
import {updateProducts} from '../../api/productsApi';
import {getGrosseryByGting, getProductByName} from '../../api/grosseryApi';
import {addProductSell} from '../../api/sellProductApi.';
import {setproduct} from '../../api/sellProductApi.';
import {getStock,updateStock} from '../../api/stockApi';
import {addByu} from '../../api/byuApi';
import {updateListNames} from '../../api/listNameApi';
import AddProducts from '../../components/AddProducts';
import moment from 'moment';
import { addListNameSell } from '../../api/sellApi.';
import AddSell from './AddSell';
import ModifySell from './ModifySell';
function Sell({navigation,route}) {
  const dispatch=useDispatch();
  const transMode=useSelector(state=>state.entities.listNames.transMode)
  const listNames=useSelector(state=>state.entities.listNames.list)
  const selllistNames=useSelector(state=>state.entities.sell_store.list)
  const sellproducts=useSelector(state=>state.entities.sell_store.products)
  const theChosen=useSelector(state=>state.entities.addingGting.chosen)
  const theListName=useSelector(state=>state.entities.listNames.theList)
  const user=useSelector(state=>state.entities.users.list)
    const context=useContext(listContext);
    const [scannedgting, setScannedgting] = useState("6130816010048");
    // const [scannedgting, setScannedgting] = useState("6130760003769");
    const [price, setprice] = useState(1);
    const [quantity, setquantity] = useState(1);
    const [Scannedresult, setScannedresult] = useState([]);
    const [data, setdata] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [quantityModal, setquantityModal] = useState(false);
    const [Resultmodal, setResultmodal] = useState(false);
    const [productModal, setproductModal] = useState(false);
    const [modalAddList, setmodalAddList] = useState(false);
    const [modalModifySell, setmodalModifySell] = useState(false);
    const [product, setproduct] = useState([]);
    const [chosen, setchosen] = useState([]);
    const [theProducts, setTheProducts] = useState([]); 
    const [slectedprod, setslectedprod] = useState({});
    const [stock, setstock] = useState({});
    const [sellListName, setsellListName] = useState([]); 
    const [selectedlistName, setselectedlistName] = useState({});
    const [thechosen,sethechosen]=useState({});
    const [addModifyMode,setaddModifyMode]=useState("");
    // let listNames=context.ListName
    let TheListName={...context.TheListName}
    let Purchases=context.Purchase;
    let finishedObj=[]

  // console.log(listNames)
  // console.log(Purchases)
  useEffect(()=>{
    setsellListName(selllistNames);
  //  setproduct(sell);
  },[])
  
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
      const handlemodifySell=(item)=>{
      let dttt=data.map(tr=>{
        console.log(tr)
      })
      
      }
      const handlegting=async()=>{
    //  console.log(scannedgting)
        const grossRes=await getGrosseryByGting(scannedgting);
        let grossdata=grossRes.data;
        console.log(grossdata)
        if(grossdata.length!==0){
          setTheProducts(grossdata)
          setproductModal(true)

        }
      //   setTheProducts(grossdata)
      //   // console.log(grossdata)
      // if(grossdata.length!==0){
      //   setquantityModal(true)
      //   console.log("prod exist in our db next is to check da stock")
      //   const stockRes=await getStock(user.userId,scannedgting,grossRes.data[0]._id);
      //   // console.log(user.userId,scannedgting,grossRes.data[0]._id)
      //   // console.log(stockRes.data)
      //   if(stockRes.data.length!==0){

      //   }
      // }else{
      //   console.log("product doesn't exist")
      // }
      //   if(stockRes.ok){
      //     console.log("we got da stock")
      //     let daStock= stockRes.data
      //     if(daStock.quantity>0){
      //       console.log("set the setPrice to daStock.sellprice and then open quant modifier")
      //     }else if(daStock.quantity==0){
      //       console.log("quant is zero redirect to order or set the quantity to be negative")
      //     }else{
      //       console.log("the quant is negative pls update ur stock")
      //     }
      //   }else{
      //     navigation.navigate("orderProducts")
      //     console.log("prod never entered our shop redirect to order")
      //   }
      //     // console.log(stockRes)
      // }else {
      //   // navigation.navigate("orderProducts")
      //   console.log("prod doesn't exist rescan again and make sure the gting is right",scannedgting)
      // }
        // console.log(grossRes)

      }
      const handlequantprice=()=>{

      }
      console.log(addModifyMode);

      const handleSell=async()=>{
        // setquantityModal(false)
        let newProd=[...product]
        let newChosen=[...chosen]
        let newtheChosen={...thechosen}
        let dtt={}
      //   let newstoreListnames={...storeListnames}
      
      
       dtt={
      timeStamp:Date.now(),
      Gting:newtheChosen.Gting,
      userId:user.userId,
      productId:thechosen._id,
      // listId:savedsell._id,
      status:false,
      quantity:quantity,
       }
      //  dispatch(sellStoreAction.addListName(savedsell));
      //  let {data:savedproducts}=await setproduct(dtt)
      let index=newProd.findIndex(prod=>prod._id==dtt.productId)
      newProd.splice(index,1)
      newChosen.push(dtt)
      setchosen(newChosen)
      setproduct(newProd)
      console.log(newProd.length)
      setquantityModal(false)
      }
      // console.log("chosens",chosen);
      const handleSave=async(store,categ)=>{ 
        const {data:prod}=await getProductByName(store,categ);
        let finishedprod=[...prod];
        chosen.map(prodDt=>{
          let index=prod.findIndex(dt=>dt._id!==prodDt.productId)
          finishedprod.splice(index,1)
        })
        setproduct(finishedprod)
        // console.log(finishedprod.length)
      }
      const handleUnselected=async(data)=>{
        sethechosen(data);
        setslectedprod(data)
        let {data:savedStock}=await getStock(user.userId,data.Gting,data._id)
        console.log(user.userId,data.Gting,data._id) 
        setprice(savedStock[0].sellPrice)
        setstock(savedStock[0])
        console.log(user.userId,data.Gting,data._id) 
        setquantityModal(true);
        // handleQuantity(data)
        // console.log(data)
      
      }
      console.log("chosen",chosen)
return (
<Screen style={styles.container}>
<Text>sell</Text>
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
          
          <ListItem
          title="add a sell"
          IconComponent={
            <Icon
              name="plus-circle"
              backgroundColor={colors.secondary}
              />
            }
            onPress={()=>{
              setmodalAddList(true)
              setaddModifyMode("add")
              let theListname={
                //  _id:Math.random()*Math.random(),
                 listName:moment().format('D/M/YY,h:m:s a'),
                 userId:user.userId,
                 timeStamp:Date.now(),
                 status:false,
                 totalQuantity:0,
                 totalPrice:0,
                 unfinished:0,
                 finished:0
                }
                // let {data:savedsell}=await addListNameSell(theListname)
                // dispatch(sellStoreAction.addListName(theListname));
                setselectedlistName(theListname);
                setproduct([])
                setchosen([])
                
                
            }}
        />

      <FlatList
          data={sellListName}
          keyExtractor={(sellListName) => sellListName._id}
          renderItem={({ item }) => 
          {  
           
              return<ListItem
              chevron={true}
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
                  setselectedlistName(item);
            // console.log("sell listname",selllistNames,"sell products",sellproducts);
            let newChosen=sellproducts.filter(dt=>dt.listId==item._id)
            console.log(newChosen)
            setchosen(newChosen)
                  setmodalModifySell(true);
                }}
                onLongPress={()=>{
                  console.log("halo");
                }}
                
                
              />
            }
          }
        />
          
    {/*                             add a sell                     */}
    <AddSell
    selectedlistName={selectedlistName}
    chosen={chosen}
    product={product}
    modalAddList={modalAddList}
    onUnselected={(dt)=>handleUnselected(dt)}
    onSave={(store,categ)=>handleSave(store,categ)}
    onsetproduct={(dt)=>setproduct(dt)}
    onsetchosen={(dt)=>setchosen(dt)}
    onsetmodaladdlist={(dt)=>setmodalAddList(dt)}
    onsetlistname={(dt)=>setsellListName(dt)}
    />
    {/*                             modify a sell                     */}
    <ModifySell
    selectedlistName={selectedlistName}
    chosen={chosen}
    product={product}
    modalModifySell={modalModifySell}
    onUnselected={(dt)=>handleUnselected(dt)}
    onSave={(store,categ)=>handleSave(store,categ)}
    onsetproduct={(dt)=>setproduct(dt)}
    onsetchosen={(dt)=>setchosen(dt)}
    onsetmodalModifySell={(dt)=>setmodalModifySell(dt)}
    onsetlistname={(dt)=>setsellListName(dt)}
    />
    
      {/*                        scan                                  */}
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
        onChangeText={(text)=>{ setScannedgting(text)
        }
          } />
        <Button
        title="checked"
        onPress={()=>{handlegting()}} />
      </Modal>
 
 {/* <Modal
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
          // console.log(text)
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
 */}



{                                 /*handle quantity and price */                 }
 <Modal
        animationType="slide"
        visible={quantityModal}
        onRequestClose={() => {
          setquantityModal(false);
        }}
      >
        <Button
        title="exit"
        onPress={()=>{
          setquantityModal(false)}} />
          <ListItem
              chevron={true}
                title={"price:"+price}
                // title={item.listName}
                quantity={true}
                onPress={()=>handlemodifySell(item)}
                onLongPress={()=>{
                  console.log("halo");
                }}
                
                
              />   
              <View style={{flexDirection:"row"}}>
              
                <Text>{stock.quantity}</Text> 
              <TextInput keyboardType="number-pad" 
                  placeholder="quantity"
                  onChangeText={(text)=>{
                    setquantity(text)
                    console.log("quantity",quantity)
                  }
                } />   
      </View>
<View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
<Button title='cancel'

 onPress={()=>{
  setResultmodal(false)
 }}
/>
<Button title='OK'
  onPress={()=>{
    
    handleSell()
 }}
/>
</View>
      </Modal>


{                                 /*choose product */                 }
 <Modal
        animationType="slide"
        visible={productModal}
        onRequestClose={() => {
          setproductModal(false);
        }}
      >
        <Button
        title="exit"
        onPress={()=>{
          setproductModal(false)}} /> 

<FlatList
              data={theProducts}
              keyExtractor={(theProducts) => theProducts._id}
                  
              renderItem={({ item }) => 
              {
              return (
                <Card 
                onPress={()=>setse}
                style={{paddingTop:50}}
                onPress={()=>setslectedprod(item)}
                >
                {<Card.Cover source={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
                <Card.Content>
                  <Title style={slectedprod._id==item._id&&{backgroundColor:"green"}}>{item.brands+" "+
                  item.Gting+" quantity: "
                  +item.quantity+" status: "+item.status}</Title>
                </Card.Content>
                
                </Card>
                  )
              }
    }
    />  
    <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
<Button title='cancel'

 onPress={()=>{
  setproductModal(false)
 }}
/>
<Button title='OK'
  onPress={()=>{
    setproductModal(false)
    setquantityModal(true)
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
export default Sell;
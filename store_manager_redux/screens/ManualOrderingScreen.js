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
import {getStock,updateStock,addStock} from '../api/stockApi';
import {addtransaction} from '../api/transactionApi';
import {addtransactionProd} from '../api/transactionProdApi';
import {addByu} from '../api/byuApi';
import {updateListNames} from '../api/listNameApi';
function ManualOrdering({navigation,route}) {
  const dispatch=useDispatch();
  const transMode=useSelector(state=>state.entities.listNames.transMode)
  const listNames=useSelector(state=>state.entities.listNames.list)
  const theChosen=useSelector(state=>state.entities.addingGting.chosen)
  const theListName=useSelector(state=>state.entities.listNames.theList)
  const user=useSelector(state=>state.entities.users.list)
    const context=useContext(listContext);
    const [scannedgting, setScannedgting] = useState("6130760003769");
    const [price, setprice] = useState(25);
    const [quantity, setquantity] = useState(5);
    const [Tva, setTva] = useState(17);
    const [Benefit, setBenifit] = useState(30);
    const [Scannedresult, setScannedresult] = useState([]);
    const [theProducts, setTheProducts] = useState([]);
    const [daprod, setdaprod] = useState({});
    const [data, setdata] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [Resultmodal, setResultmodal] = useState(false);
    const [supplier, setSupplier] = useState("");
    const [thetransObj, setthetransObj] = useState({});
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
        // console.log(daprod);
        let newTheprod=[...theProducts]
        let newQuant= Number(quantity)
        let newPrice=Number(price)
        let totalprice=newQuant*newPrice
        let daProdObj={
          Gting:daprod.Gting,
          productId:daprod._id,
          brands:daprod.brands,
          image:daprod.image_front_url,
          price,
          quantity,
          totalprice,
          Tva,
          Benefit,
        }
        newTheprod.push(daProdObj)
        setTheProducts(newTheprod)
        console.log(theProducts);
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
        if(grossRes.data.length==1){
          console.log("one prod")
        }else{
          console.log("create a model and then get to choose betwen")
          console.log("if u choose one we already have then it's an error ")
          console.log(" else we set the obj to daprod")
        }
        setdaprod(grossRes.data[0])
        // console.log(daprod)
        setResultmodal(true)
      }else {
        
      }
        // console.log(grossRes)

      }
      console.log("supplier",supplier)
      const handleSave=async()=>{
        let daSupplier=supplier;
        let daUser=user.userId;
     
      let trans_prod1=theProducts.map(tt=>{
        let daprice=tt.price;
        let withTva=daprice*(Tva/100+1)
        withTva=Math.ceil(withTva)
        let withBenefit=daprice*(Benefit/100+1)
        withBenefit=Math.ceil(withBenefit)
        tt.ttc=withBenefit
        return tt
      })
      setTheProducts(trans_prod1)
      let trans_obj={
        storeId:daUser,
        supplierId:daSupplier,
        addedDate:Date.now()
      }
      // storeId:String,
      // supplierId:String,
      // addedDate:Number,
      // prod:{}
      
     
    

      // console.log(st_stock)
      setthetransObj(trans_obj)
      let {data:trans_dt}= await addtransaction(trans_obj)
      let trans_id=trans_dt._id;
      let trans_prod=theProducts.map(tt=>{
        let newTS_prod={}
        newTS_prod.productId=tt.productId
        newTS_prod.transactionId=trans_id
        newTS_prod.Gting=tt.Gting
        newTS_prod.price=tt.price
        newTS_prod.quantity=tt.quantity
        newTS_prod.Benefit=tt.Benefit
        return newTS_prod
      })
      // if(trans_dt){
        trans_prod.map(async(td)=>{
          let {data:trans_prod}= await addtransactionProd(td)
          console.log("trans server",trans_prod);
        })
        let st_stock=theProducts.map(async(tt)=>{
          let newStock={}
          let {data:st_res}=await getStock(user.userId,tt.Gting,tt.productId)
          if(st_res.length==0){
            newStock.productId=tt.productId
            newStock.oldByuPrice=tt.price
            newStock.oldByuPrice=tt.price
            newStock.storeId=user.userId
            newStock.quantity=tt.quantity
            newStock.sellPrice=tt.ttc
            newStock.Gting=tt.Gting
            console.log("empty");
          }
           return newStock
                    })
      // }
      console.log("playing around with the code",trans_prod);
      }
return (
<Screen style={styles.container}>
<Text>manual ordering</Text>
<Button
title="scan"
onPress={()=>setModalVisible(true)} />
<Button
title="exit manualOrdering mode"
onPress={()=>{
    context.setModes("")
    dispatch(listNamesAction.setTransMode("modeScreen"));
navigation.navigate("modeScreen")
}
} />
    <TextInput 
        placeholder="supplier"
        onChangeText={(text)=>{
          setSupplier(text)
          // console.log(tex)
        }
          } />
 <Button
title="save"
onPress={()=>{
  handleSave()
  // console.log("save the list in store transition")
}
} />      
      
           <FlatList
              data={theProducts}
              keyExtractor={(theProducts) => theProducts.Gting}
                  
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
                  +item.quantity+"price: "+item.price+" totalprice: "+item.totalprice}</Title>
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
        title="exit"
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
    <TextInput keyboardType="number-pad" 
        placeholder="TVA"
        onChangeText={(text)=>{
          setTva(text)
          // console.log(text)
        }
          } />
    <TextInput keyboardType="number-pad" 
        placeholder="benefit"
        onChangeText={(text)=>{
          setBenifit(text)
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
</Screen>
 );
}
const styles = StyleSheet.create({
  container:{
    backgroundColor: "#6f51ff",
  },
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
export default ManualOrdering;
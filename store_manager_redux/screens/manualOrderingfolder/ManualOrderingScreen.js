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
import {updateProducts} from '../../api/productsApi';
import {getGrosseryByGting, getProductByName} from '../../api/grosseryApi';
import {getStock,updateStock,addStock} from '../../api/stockApi';
import {addtransaction} from '../../api/transactionApi';
import {addtransactionProd} from '../../api/transactionProdApi';
import *as sellStoreAction from '../../redux/Sell_store';
import {addByu} from '../../api/byuApi';
import {updateListNames} from '../../api/listNameApi';
import { ceil } from 'react-native-reanimated';
import AddProducts from '../../components/AddProducts';
import { addListNameSell } from '../../api/sellApi.';
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
    const [product, setproduct] = useState([]);
    const [chosen, setchosen] = useState([]);
    const [daprod, setdaprod] = useState({});
    const [data, setdata] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalChoose, setmodalChoose] = useState(false);
    const [modalChoose2, setmodalChoose2] = useState(false);
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
      // console.log("supplier",supplier)
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
      if(trans_dt){
        trans_prod.map(async(td)=>{
          let {data:trans_prod}= await addtransactionProd(td)
          // console.log("trans server",trans_prod);
        })
      }
        let st_stock=theProducts.map((tt)=>{
          let newStock={}
            newStock.productId=tt.productId
            newStock.oldByuPrice=tt.price
            newStock.newByuPrice=tt.price
            newStock.storeId=user.userId
            newStock.quantity=tt.quantity
            newStock.sellPrice=tt.ttc
            newStock.Gting=tt.Gting
           return newStock
                    })
        st_stock.map(async(tt)=>{
          let newStock={}
          let {data:st_res}=await getStock(tt.storeId,tt.Gting,tt.productId)
          console.log("st_res",st_res);
          // console.log("tt",tt);
          if(st_res.length==0){
            let {data:stockAdded}= await addStock(tt);
            console.log("stock dt",stockAdded);
          }
          else{
            let newSt_res={...st_res[0]}
            let oldQuant=newSt_res.quantity;
            newSt_res.newByuPrice=tt.oldByuPrice
            newSt_res.quantity=Number(oldQuant)+Number(tt.quantity)

            let daprice=(Number(newSt_res.oldByuPrice)+Number(newSt_res.newByuPrice))/2;
            daprice=Math.ceil(daprice)
            let withTva=daprice*(Tva/100+1)
            withTva=Math.ceil(withTva)
            let withBenefit=daprice*(Benefit/100+1)
            withBenefit=Math.ceil(withBenefit)
            newSt_res.sellPrice=withBenefit

            let {data:updatedStock}=await updateStock(newSt_res._id,newSt_res)
            console.log(newSt_res._id)
          }
                    })
      // }
      // console.log("playing around with the code",user);
      }
      const handleAddproducts=async(store,categ)=>{
        const {data:prod}=await getProductByName(store,categ);
        let finishedprod=[...prod];
        chosen.map(prodDt=>{
          let index=prod.findIndex(dt=>dt._id!==prodDt.productId)
          finishedprod.splice(index,1)
        })
        setproduct(finishedprod)
        // console.log(finishedprod.length)
      }
      const handleunselected=(data)=>{
        setdaprod(data)
        setmodalChoose2(true);
      }
      const handleProductsList=async()=>{
        let gting=Number(daprod.Gting)
        let withBenefit=price*(Benefit/100+1)
        withBenefit=Math.ceil(withBenefit)
        let newchosen=[...chosen];
        let newproduct=[...product];
        let newQuant= Number(quantity)
        let newPrice=Number(price)
        let totalprice=newQuant*newPrice;
        let {data:st_res}=await getStock(user.userId,gting,daprod.productId)
        if(st_res.length===0){
          let newchosenobj={
            oldByuPrice:price,
            newByuPrice:price,
            ByuPrice:price,
            quantity:newQuant,
            sellPrice:withBenefit,
            storeId:user.userId,
            image:daprod.image_front_url,
            productId:daprod._id,
            Benefit,
            Gting:daprod.Gting,
            // sellPrice:
          }
          let index=newproduct.findIndex(dt=>dt._id==newchosenobj.productId)
          newproduct.splice(index,1)
          newchosen.push(newchosenobj)
         setchosen(newchosen);
         setproduct(newproduct);
          // let {data:stockAdded}= await addStock(newchosenobj);
          // console.log(stockAdded)
          // console.log(stockAdded)
        }else{
          // console.log(st_res)
          let oldbyuprice=st_res[0].newByuPrice;
          let st_id=st_res[0]._id;
          let newPrice=(price+oldbyuprice)/2;
          let oldQuantity=st_res[0].quantity;
          let newQuantity=oldQuantity+quantity;
          newPrice=Math.ceil(newPrice)
          let newchosenomodifiedobj={
            oldByuPrice:oldbyuprice,
            newByuPrice:price,
            ByuPrice:newPrice,
            quantity:newQuantity,
            sellPrice:withBenefit,
            image:daprod.image_front_url,
            storeId:user.userId,
            productId:dt.productId,
            Benefit:dt.Benefit,
            Gting:dt.Gting
            // sellPrice:
          }
          // let {data:stockAdded}= await updateStock(st_id,newchosenomodifiedobj);
          console.log("newchosenomodifiedobj",newchosenomodifiedobj)
            let index=newproduct.findIndex(dt=>dt._id==daProdObj.productId)
             newproduct.splice(index,1)
             newchosen.push(daProdObj)
            setchosen(newchosen);
            setproduct(newproduct);
        }
        // let daProdObj={
        //   Gting:daprod.Gting,
        //   productId:daprod._id,
        //   brands:daprod.brands,
        //   image:daprod.image_front_url,
        //   price,
        //   quantity,
        //   totalprice,
        //   Tva,
        //   Benefit,
        // }
        // let index=newproduct.findIndex(dt=>dt._id==daProdObj.productId)
        // newproduct.splice(index,1)
        // newchosen.push(daProdObj)
        // setchosen(newchosen);
        // setproduct(newproduct);
        // setTheProducts(newproduct)
        // console.log("index",index)
        setmodalChoose2(false)
      }
      ////////// save stock from addproduct component//////////
      const handleaddingStock=async()=>{
         // productId:String,//required
        // storeId:String,
        // quantity:Number,
        // newByuPrice:Number,
        // oldByuPrice:Number,
        // sellPrice:Number,
        // Gting:Number,
        // benefit:Number
        // console.log("hello")
      chosen.map(async(dt)=>{
        let gting=Number(dt.Gting)
        // let withTva=price*(Tva/100+1)
        // withTva=Math.ceil(withTva)
        let withBenefit=price*(Benefit/100+1)
        withBenefit=Math.ceil(withBenefit)
        // console.log(withBenefit,price)
        // tt.ttc=withBenefit
        let {data:st_res}=await getStock(user.userId,gting,dt.productId)
        if(st_res.length===0){
          let newchosenobj={
            oldByuPrice:price,
            newByuPrice:price,
            ByuPrice:price,
            quantity:dt.quantity,
            sellPrice:withBenefit,
            storeId:user.userId,
            productId:dt.productId,
            Benefit:dt.Benefit,
            Gting:dt.Gting
            // sellPrice:
          }
          console.log(newchosenobj)
          let {data:stockAdded}= await addStock(newchosenobj);
          // console.log(stockAdded)
        }else{
          // console.log(st_res)
          let oldbyuprice=st_res[0].newByuPrice;
          let st_id=st_res[0]._id;
          let newPrice=(Number(price)+Number(oldbyuprice))/2;
          let oldQuantity=st_res[0].quantity;
          let newQuantity=Number(oldQuantity)+Number(quantity);
          newPrice=Math.ceil(newPrice)
          let newchosenomodifiedobj={
            oldByuPrice:oldbyuprice,
            newByuPrice:price,
            ByuPrice:newPrice,
            quantity:newQuantity,
            sellPrice:withBenefit,
            storeId:user.userId,
            productId:dt.productId,
            Benefit:dt.Benefit,
            Gting:dt.Gting
            // sellPrice:
          }
          let {data:stockAdded}= await updateStock(st_id,newchosenomodifiedobj);
          console.log("newchosenomodifiedobj",newchosenomodifiedobj)
        }
        // console.log(user.userId,gting,dt.productId)
        // console.log(st_res)
      })
      setchosen([]);
      setproduct([])
      }
      const handlesavestock=async()=>{
       chosen.map(async(dt)=>{
        let gting=(dt.Gting).toString()
        let {data:st_res}=await getStock(user.userId,gting,dt.productId)
        console.log("added",dt)
        if(st_res.length===0){
          let {data:stockAdded}= await addStock(dt);
        }else{
          let st_id=st_res[0]._id;
          let dbQuant=Number(st_res[0].quantity)
          let newQuantity=Number(dt.quantity);
          let updatedQuant=Number(newQuantity)+Number(newQuantity)
          dt.quantity=updatedQuant
          console.log("update",dt)
          console.log("quant",newQuantity)
          console.log("updatedquant",updatedQuant)
          let {data:stockAdded}= await updateStock(st_id,dt);
        }
       })

      }
      // console.log("chosen",newchosen)
return (
<Screen style={styles.container}>
<Text>manual ordering</Text>
<Button
title="scan"
onPress={()=>setModalVisible(true)} />
<Button
title="choose"
onPress={()=>setmodalChoose(true)} />
<Button
title="exit manualOrdering mode"
onPress={()=>{
    // context.setModes("")
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
  handlesavestock()
  // console.log("save the list in store transition")
}
} />      
      
           <FlatList
              data={chosen}
              keyExtractor={(chosen) => chosen.Gting}
                  
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
 {/*                        choose                 */}
      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalChoose}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setmodalChoose(false);
        }}
      >
      <Button
        title="exit"
        onPress={()=>{
          setmodalChoose(false)}} />
      <Button
        title="save"
        onPress={()=>{
          handleaddingStock()
          setmodalChoose(false)}} />
       <AddProducts 
             onUnselected={(data)=>handleunselected(data)} 
             onSave={(store,categ)=>handleAddproducts(store,categ)}
             product={product}
              chosen={chosen}
        />
      </Modal>
 
{/*           add chosen          */}
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
{/*  add chosen list */}
 <Modal
        animationType="slide"
        visible={modalChoose2}
        onRequestClose={() => {
          setmodalChoose2(false);
        }}
      >
        <Button
        title="exit"
        onPress={()=>{
          setmodalChoose2(false)}} />
          <Text>just saying</Text>
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
  setmodalChoose2(false)
 }}
/>
<Button title='OK'
  onPress={()=>{
    handleProductsList()
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
import React, { useState } from 'react';
import { StyleSheet, View,Modal,Button,Text,FlatList } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import *as listNamesAction from '../../redux/listNames';
import Screen from '../../components/Screen';
import { handleAddproducts, handleAddToChosen,handleUnselected,
     handleSaveManualListAndProd, handleChosenClicked,
     handleUpdateTheChosenQuant, 
     handleScannedGting,
     handleAddScannedProd,
     handleDeleteProduct,
     handleSetListProducts,
     handleUpdateManualListAndProd,
     handleGetStock,
     handleAddASell} from './SellFunc';
import { ListItem } from '../../components/lists';
import AddListManualOrder from '../../components/AddListGlobal';
import ModifyListManualOrder from '../../components/AddListGlobal';
import C_Button from '../../components/C_Button';
function Sell({navigation}) {
    const dispatch=useDispatch();
    const user=useSelector(state=>state.entities.users.list)
    const listproducts=useSelector(state=>state.entities.storeMaualorderList.listproducts)
    const theChosenRedux=useSelector(state=>state.entities.storeMaualorderList.theChosen)
    const[scanModal,setscanModal]=useState(false)
    const[sellModal,setsellModal]=useState(false)
    const[quantityModal,setquantityModal]=useState(false)
    const[modifyChosenModal,setmodifyChosenModal]=useState(false) 
    const[modifyproductModal,setmodifyproductModal]=useState(false) 
    const[scannedProdModel,setscannedProdModel]=useState(false) 
    const[areUSureModal,setareUSureModal]=useState(false) 
    const[quantity,setquantity]=useState(1)
    const[price,setprice]=useState(1)
    const[benefit,setbenefit]=useState(30)
    const[chosen,setchosen]=useState([])
    const[product,setproduct]=useState([])
    const[sellList,setsellList]=useState([])
    const[duplication,setduplication]=useState([])
    const[scannedProd,setscannedProd]=useState({})
    const[theChosen,settheChosen]=useState({})
    const[selectedListName,setselectedListName]=useState({})
    const[selectedStock,setselectedStock]=useState({})
    const[scannedgtingResProd,setscannedgtingResProd]=useState([])
    const[scannedgtingResChosen,setscannedgtingResChosen]=useState([])
    const [scannedGting, setscannedGting] = useState("6130433000200");
    const [areUSeureMessage, setareUSeureMessage] = useState("");
    //modify manual List
    const[scanModal1,setscanModal1]=useState(false)
    const[modifyProductslistModal,setmodifyProductslistModal]=useState(false)
    const[quantityModal1,setquantityModal1]=useState(false)
    const[modifyChosenModal1,setModifyChosenModal1]=useState(false) 
    const[scannedProdModel1,setscannedProdModel1]=useState(false) 
    const[areUSureModal1,setareUSureModal1]=useState(false) 
    // console.log("scannedgtingResProd",scannedgtingResProd)

return (
<Screen style={styles.container}>
<Text>SELL</Text>
{/* <Button
title="scan"
onPress={()=>setscanModal(true)} /> */}
<C_Button 
title="choose"
onPress={()=>{handleAddASell(user,setsellModal,setchosen,setproduct)}} />
<C_Button
title="exit Sell mode"
onPress={()=>{
    // context.setModes("")
    dispatch(listNamesAction.setTransMode("modeScreen"));
navigation.navigate("modeScreen")
}
} />
         <FlatList
              data={sellList}
              keyExtractor={(manualOrderLists) => manualOrderLists._id}
                  
              renderItem={({ item }) => 
              {
              return (
                <ListItem
          title={item.listName}
          
            onPress={()=>{
                setselectedListName(item)
                handleSetListProducts(item,setchosen,listproducts,setproduct,dispatch)
                setmodifyProductslistModal(true)
            }}
            onLongPress={()=>{
             
            }}
        />
                  )
              }
    }
    />  
    {/*
        /////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////
        /////////////////         ADD PRODUCT        ///////////
        ////////////////////////////////////////////////////////    
        ////////////////////////////////////////////////////////    
*/}
  
<AddListManualOrder
//add product
// chosen,product,chosenModal,setchosenModal, setscanModal,
// onSaveChosen,onSelected,onAddProduct,showDelete,showStock,onDelete,
// onUnselected,buttonColor,
chosen={chosen}
product={product}
chosenModal={sellModal}
setchosenModal={(dt)=>setsellModal(dt)}
setproduct={(dt)=>setproduct(dt)}
setscanModal={(dt)=>setscanModal(dt)}
onSaveChosen={()=>handleSaveManualListAndProd(chosen,user,setsellList,
    sellList,dispatch,setsellModal,setchosen,
    setselectedListName,selectedListName,benefit)}
onSelected={(dt)=>handleChosenClicked(dt,settheChosen,setmodifyChosenModal,
            dispatch,setquantity)}
onAddProduct={(store,categ)=>handleAddproducts(store,categ,setproduct,chosen)}
onUnselected={(dt)=>handleUnselected(dt,setquantityModal,settheChosen,
    user,setselectedStock,product,setduplication,chosen,selectedStock,
    setscannedgtingResChosen,setscannedgtingResProd)}
buttonColor="#dc3545"
onAddStockAlert={()=>handleGetStock(user,setproduct)}
//add quantity
// quantityModal,onAddQuantity,setbenefit,selectedStock,quantity,
// manualOrderAddQuant,stockAlert,setquantityModal,showStock,
// setquantity,setprice,price,benefit,theChosen
quantityModal={quantityModal}
setquantityModal={(dt)=>setquantityModal(dt)}
onAddQuantity={()=>handleAddToChosen(
    theChosen,selectedListName,
    quantity,setquantityModal,
    product,setproduct,chosen,setchosen,
    user,price,benefit,selectedStock)}
setquantity={(dt)=>setquantity(dt)}
setprice={(dt)=>setprice(dt)}
setbenefit
// setstockAlert={(dt)=>setstockAlert(dt)}
sell={true}
manualOrderAddQuant={false}
quantity={quantity}
price={price}
benefit
theChosen={theChosen}
// stockAlert={stockAlert}
selfServing={false}
selectedStock={selectedStock}
duplication={duplication}
setselectedStock={(dt)=>setselectedStock(dt)}
//modify chosen
//modifyChosenModal,setareUSureModal,setareUSeureMessage,
//onUpdateTheChosenQuant,modifyTransProd,modifyManOrderProd,
//setmodifyChosenModal,
modifyChosenModal={modifyChosenModal}
setmodifyChosenModal={(dt)=>setmodifyChosenModal(dt)}
setareUSureModal={(dt)=>setareUSureModal(dt)}
onUpdateTheChosenQuant={()=>handleUpdateTheChosenQuant(quantity,price,
    settheChosen,chosen,setchosen,theChosen,benefit)}
    setareUSeureMessage={(dt)=>setareUSeureMessage(dt)}
//scan
// scanModal,setscannedGting,onScan,
scanModal={scanModal}
setscannedGting={(dt)=>setscannedGting(dt)}
onScan={()=>handleScannedGting(scannedGting,setscannedProd,
    setscannedProdModel,user,settheChosen,theChosen,chosen,dispatch,product,
    setscannedgtingResChosen,setscannedgtingResProd,setselectedStock)}
// scannedGting={scannedGting}
//scanned prod
// scannedProd,scannedProdModel,onAddScannedProd,manOrderScanProd,setscannedProdModel,
// scannedgtingResProd,scannedgtingResChosen,
scannedProd={scannedProd}
scannedProdModel={scannedProdModel}
setscannedProdModel={(dt)=>setscannedProdModel(dt)}
// setscannedProd={(dt)=>setscannedProd(dt)}
onAddScannedProd={()=>handleAddScannedProd(theChosen,scannedProd,quantity,price,
    setchosen,user,chosen,setproduct,benefit,selectedStock,product,setselectedStock)}
        
scannedgtingResProd={scannedgtingResProd}
scannedgtingResChosen={scannedgtingResChosen}    
//are u sure modal
// areUSureModal,onOk,areUSeureMessage
areUSureModal={areUSureModal}
onOk={()=>handleDeleteProduct(chosen,theChosen,setchosen,setareUSureModal,
    setmodifyChosenModal,setproduct,product,user)}
    areUSeureMessage={areUSeureMessage}
/>


    {/*
        ////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////
        ////////         ADD and modify PRODUCT        /////////
        ////////////////////////////////////////////////////////    
        ////////////////////////////////////////////////////////    
*/}
 <ModifyListManualOrder
 //add product
chosen={chosen}
product={product}
chosenModal={modifyProductslistModal}
user={user}
dispatch={dispatch}
manualOrderLists={sellList}
setmanualOrderLists={(dt)=>setsellList(dt)}
setchosen={(dt)=>setchosen(dt)}
setchosenModal={(dt)=>setmodifyProductslistModal(dt)}
setproduct={(dt)=>setproduct(dt)}
settheChosen={(dt)=>settheChosen(dt)}
setmodifyChosenModal={(dt)=>setmodifyChosenModal1(dt)}
setscanModal={(dt)=>setscanModal1(dt)}
setquantityModal={(dt)=>setquantityModal1(dt)}
setselectedListName={(dt)=>setselectedListName(dt)}
selectedListName={selectedListName}
onSaveChosen={()=>handleUpdateManualListAndProd(chosen,user,setsellList,
    sellList,dispatch,setsellModal,setchosen,setselectedListName,selectedListName,theChosenRedux,benefit)}
onSelected={(dt)=>handleChosenClicked(dt,settheChosen,setmodifyChosenModal1,
        dispatch)}
onAddProduct={(store,categ)=>handleAddproducts(store,categ,setproduct,chosen)}
showPrice={true}
showDelete={false}
showBenefit={true}
// buttonColor="#dc3545"
//scan
scanModal={scanModal1}
scannedGting={scannedGting}
theChosen={theChosen}

setscannedGting={(dt)=>setscannedGting(dt)}
setscannedProd={(dt)=>setscannedProd(dt)}
setscannedProdModel={(dt)=>setscannedProdModel1(dt)}
onScan={()=>handleScannedGting(scannedGting,setscannedProd,
    setscannedProdModel,user,settheChosen,theChosen,chosen,dispatch)}
//scanned prod
scannedProd={scannedProd}
scannedProdModel={scannedProdModel1}
quantity={quantity}
price={price}
setquantity={(dt)=>setquantity(dt)}
setprice={(dt)=>setprice(dt)}
onAddScannedProd={()=>handleAddScannedProd(theChosen,scannedProd,quantity,price,
    setchosen,user,chosen,setproduct)}
//add quantity
quantityModal={quantityModal1}

onAddQuantity={()=>handleAddToChosen(
    theChosen,selectedListName,
    quantity,setquantityModal1,
    product,setproduct,
    chosen,setchosen,user,price,benefit)}
//modify chosen
modifyChosenModal={modifyChosenModal1}
setareUSureModal={(dt)=>setareUSureModal1(dt)}
onUpdateTheChosenQuant={()=>handleUpdateTheChosenQuant(quantity,price,
    settheChosen,chosen,setchosen,theChosen)}
    setareUSeureMessage={(dt)=>setareUSeureMessage(dt)}
//are u sure modal
areUSureModal={areUSureModal1}
onOk={()=>handleDeleteProduct(chosen,theChosen,setchosen,setareUSureModal,
    setmodifyChosenModal,setproduct)}
    areUSeureMessage={areUSeureMessage}
 />
</Screen>
 );
}
const styles = StyleSheet.create({
container:{
    backgroundColor: "#6f51ff",
}
})
export default Sell;
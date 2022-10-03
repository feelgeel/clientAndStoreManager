import React, { useState } from 'react';
import { StyleSheet, View,Modal,Button,Text,FlatList } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import *as listNamesAction from '../../redux/listNames';
import Screen from '../../components/Screen';
import AddOrderList from '../../components/AddListGlobal';
import ModifyOrderList from '../../components/AddListGlobal';
import { handleSaveClientList, handleChosenClicked, 
    handleAddproducts, handleScannedGting,
     handleAddScannedProd, handleAddToChosen, handleUpdateTheChosenQuant,
      handleDeleteProduct,handleUnselected, handleAddprodStockAlert,
      handleRefresh } from './FatherlistFuncs';
import { ListItem } from '../../components/lists/ListItem';
import C_Button from '../../components/C_Button';
import { clientLoadListNames } from '../../api/client_ListNameApi';


function FatherListScreen({children,style}) {
    const dispatch=useDispatch();
    const user=useSelector(state=>state.entities.users.list)
    const family=useSelector(state=>state.entities.family.familyDt)
    const listproducts=useSelector(state=>state.entities.storeMaualorderList.listproducts)
    const theChosenRedux=useSelector(state=>state.entities.storeMaualorderList.theChosen)
    const[scanModal,setscanModal]=useState(false)
    const[chosenModal,setchosenModal]=useState(false)
    const[quantityModal,setquantityModal]=useState(false)
    const[modifyChosenModal,setModifyChosenModal]=useState(false) 
    const[modifyproductModal,setmodifyproductModal]=useState(false) 
    const[scannedProdModel,setscannedProdModel]=useState(false) 
    const[areUSureModal,setareUSureModal]=useState(false) 
    const[quantity,setquantity]=useState(1)
    const[price,setprice]=useState(1)
    const[stockAlert,setstockAlert]=useState(0)
    const[selectedStock,setselectedStock]=useState([]) 
    const[duplication,setduplication]=useState([])
    const[scannedgtingResChosen,setscannedgtingResChosen]=useState([]) 
    const[selectedProd,setselectedProd]=useState({})
    
    const[benefit,setbenefit]=useState(30)
    const[chosen,setchosen]=useState([])
    const[clientList,setClientList]=useState([])
    const[product,setproduct]=useState([])
    const[orderList,setorderList]=useState([])
    const[scannedProd,setscannedProd]=useState({})
    const[theChosen,settheChosen]=useState({})
    const[selectedListName,setselectedListName]=useState({})
    const [scannedGting, setscannedGting] = useState("6130760003769");
    const [areUSeureMessage, setareUSeureMessage] = useState("");
    //modify manual List
    const[scanModal1,setscanModal1]=useState(false)
    const[modifyProductslistModal,setmodifyProductslistModal]=useState(false)
    const[quantityModal1,setquantityModal1]=useState(false)
    const[modifyChosenModal1,setModifyChosenModal1]=useState(false) 
    const[scannedProdModel1,setscannedProdModel1]=useState(false) 
    const[areUSureModal1,setareUSureModal1]=useState(false) 
return (
<Screen style={styles.container}>
<Text>father list screen</Text>
{/* <Button
title="scan"
onPress={()=>setscanModal(true)} /> */}
<C_Button
title="choose"
onPress={()=>{setchosenModal(true);setchosen([]);setproduct([])}}
 />
<C_Button
title="exit ListOrder mode"
onPress={async()=>{
    const {data:clientList}=await clientLoadListNames(user.userId)
    console.log(clientList)
    // context.setModes("")
//     dispatch(listNamesAction.setTransMode("modeScreen"));
// navigation.navigate("modeScreen")
}
} />
         {/* <FlatList
              data={orderList}
              keyExtractor={(orderList) => orderList._id}
                  
              renderItem={({ item }) => 
              {
              return (
                <ListItem
          title={item.listName}
          
            onPress={()=>{
                // setselectedListName(item)
                // handleSetListProducts(item,setchosen,listproducts,setproduct,dispatch)
                // setmodifyProductslistModal(true)
            }}
            onLongPress={()=>{
             
            }}
        />
                  )
              }
    }
    />   */}
    {/*
        /////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////
        /////////////////         ADD PRODUCT        ///////////
        ////////////////////////////////////////////////////////    
        ////////////////////////////////////////////////////////    */}

  <AddOrderList
//add product
//  chosen,product,chosenModal,setchosenModal,
//  setscanModal,onSaveChosen,onSelected,onAddProduct,
//  showDelete,onDelete,onUnselected,buttonColor,
//  selfServing,clientStock,verification,onAddStockAlert,manualOrder
chosen={chosen}
product={product}
chosenModal={chosenModal}
setchosenModal={(dt)=>setchosenModal(dt)}
setproduct={(dt)=>setproduct(dt)}
setscanModal={(dt)=>setscanModal(dt)}
onSaveChosen={()=>handleSaveClientList(chosen,user,setorderList,
    orderList,dispatch,setchosenModal,setchosen,setselectedListName,
    selectedListName,family)}
onSelected={(dt)=>handleChosenClicked(dt,settheChosen,setModifyChosenModal,
            dispatch)}
onAddProduct={(store,categ)=>handleAddproducts(store,categ,setproduct,chosen)}
showDelete={false}
manualOrderLists={clientList}
onUnselected={(dt)=>handleUnselected(dt,setquantityModal,settheChosen,user)}
buttonColor="#dc3545"
manualOrder={false}
onAddStockAlert={()=>handleAddprodStockAlert(user,setproduct)}
// onRefresh={()=>handleRefresh()}
refresh={false}
//add quantity
// quantityModal,onAddQuantity,setbenefit,
// selectedStock,quantity,
// manualOrderAddQuant,stockAlert,
// setquantityModal,showStock,
// setquantity,setprice,price,benefit,theChosen
quantityModal={quantityModal}
setquantityModal={(dt)=>setquantityModal(dt)}
onAddQuantity={(dt)=>handleAddToChosen(
    theChosen,selectedListName,
    quantity,setquantityModal,
    product,setproduct,
    chosen,setchosen,user,dt)}
    setquantity={(dt)=>setquantity(dt)}
    setprice={(dt)=>setprice(dt)}
    setbenefit={(dt)=>setbenefit(dt)}
    setstockAlert={(dt)=>setstockAlert(dt)}
    sell={false}
    manualOrderAddQuant={false}
    quantity={quantity}
    price={price}
    benefit={benefit}
    theChosen={theChosen}
    stockAlert={stockAlert}
    selfServing={false}
    clientList={true}
    selectedStock={selectedStock}
    duplication={duplication}
    setselectedStock={(dt)=>setselectedStock(dt)}
    listOrder={false}
   //modify chosen
//modifyChosenModal,setareUSureModal,
// setareUSeureMessage,
//onUpdateTheChosenQuant,modifyTransProd,
// modifyManOrderProd,
//setmodifyChosenModal,     
modifyChosenModal={modifyChosenModal}
setareUSureModal={(dt)=>setareUSureModal(dt)}
theChosen={theChosen}
setareUSeureMessage={(dt)=>setareUSeureMessage(dt)}
onUpdateTheChosenQuant={()=>handleUpdateTheChosenQuant(quantity,price,
    settheChosen,chosen,setchosen,theChosen,benefit)}
    modifyManOrderProd={true}
    setmodifyChosenModal={(dt)=>setmodifyChosenModal(dt)}
//scan
// scanModal,setscannedGting,onScan,
scanModal={scanModal}
setscannedGting={(dt)=>setscannedGting(dt)}
onScan={()=>handleScannedGting(scannedGting,setscannedProd,
    setscannedProdModel,user,settheChosen,theChosen,chosen,dispatch,setquantity,quantity)}
//scanned prod
// scannedProd,scannedProdModel,onAddScannedProd,
// manOrderScanProd,setscannedProdModel,
// scannedgtingResProd,scannedgtingResChosen,
scannedProd={scannedProd}
scannedProdModel={scannedProdModel}
setscannedProdModel={(dt)=>setscannedProdModel(dt)}
onAddScannedProd={(dt)=>handleAddScannedProd(theChosen,scannedProd,quantity,price,
    setchosen,user,chosen,setproduct,benefit,dt)}
setbenefit={(dt)=>setbenefit(dt)}
scannedgtingResChosen={scannedgtingResChosen} 
selectedProd={selectedProd}
setselectedProd={(dt)=>setselectedProd(dt)}


//are u sure modal
// areUSureModal,onOk,areUSeureMessage
areUSureModal={areUSureModal}
onOk={()=>handleDeleteProduct(chosen,theChosen,setchosen,setareUSureModal,
    setModifyChosenModal,setproduct)}
    areUSeureMessage={areUSeureMessage}
/>

</Screen>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default FatherListScreen;

import React, { useState } from 'react';
import { StyleSheet, View,Button } from 'react-native';
import AddListGlobal from '../../components/AddListGlobal';
import Screen from '../../components/Screen';
import { handleAddproducts, handleUnselected,
     handleAddToChosen, 
     handleChosenClicked,
     handleUpdateTheChosenQuant,
     handleDeleteProduct,
     handleAddScannedProd,
     handleScannedGting,
     handleSaveSelfServing} from '../selfServing/selfServingFunc';
import { useSelector, useDispatch } from "react-redux";
import C_Button from '../../components/C_Button';


function SelfServingScreen({children,style}) {
    const dispatch=useDispatch();
    const user=useSelector(state=>state.entities.users.list)
    const stockRedux=useSelector(state=>state.entities.clientStock.list)
const[selfServingModal,setselfServingModal]=useState(false)
const[quantityModal,setquantityModal]=useState(false)
const[modifyChosenModal,setmodifyChosenModal]=useState(false)
const[areUSureModal,setareUSureModal]=useState(false)
const[scanModal,setscanModal]=useState(false)
const[scannedGting,setscannedGting]=useState("6130760003769")
const[scannedProdModel,setscannedProdModel]=useState(false)
const[areUSeureMessage,setareUSeureMessage]=useState("")
const[scannedgtingResChosen,setscannedgtingResChosen]=useState([]) 
const[scannedgtingResProd,setscannedgtingResProd]=useState([]) 
const[product,setproduct]=useState([])
const[chosen,setchosen]=useState([])
const[quantity,setquantity]=useState(1)
const[stockAlert,setstockAlert]=useState(0)
const[price,setprice]=useState(1)
const[selfServingList,setselfServingList]=useState([])
const[theChosen,settheChosen]=useState({})
const[selectedListName,setselectedListName]=useState({})
const[scannedProd,setscannedProd]=useState({})

return (
<Screen style={styles.container}>
<C_Button
title="Add A list"
onPress={()=>setselfServingModal(true)}
/>
<AddListGlobal
//add product
// chosen,product,chosenModal,setchosenModal, setscanModal,
// onSaveChosen,onSelected,onAddProduct,showDelete,showStock,onDelete,
// onUnselected,buttonColor,
chosen={chosen}
product={product}
chosenModal={selfServingModal}
setchosenModal={(dt)=>setselfServingModal(dt)}
setproduct={(dt)=>setproduct(dt)}
setscanModal={(dt)=>setscanModal(dt)}
onSaveChosen={()=>handleSaveSelfServing(chosen,user,setselfServingList,
    selfServingList,dispatch,setselfServingModal,setchosen,setselectedListName
,selectedListName,stockRedux)}
onSelected={(dt)=>handleChosenClicked(dt,settheChosen,setmodifyChosenModal,
        dispatch,setprice,setquantity,chosen)}
onAddProduct={(store,categ)=>handleAddproducts(store,categ,setproduct,chosen)}
onUnselected={(dt)=>handleUnselected(dt,setquantityModal,settheChosen)}
// manOrderScanProd={true}
buttonColor="#dc3545"
selfServing={true}
//add quantity
// quantityModal,onAddQuantity,setbenefit,selectedStock,quantity,
// manualOrderAddQuant,stockAlert,setquantityModal,showStock,
// setquantity,setprice,price,benefit,
quantityModal={quantityModal}
setquantityModal={(dt)=>setquantityModal(dt)}
onAddQuantity={(values)=>handleAddToChosen(
        theChosen,quantity,setquantityModal,
        product,setproduct,chosen,setchosen,
        user,price,stockAlert,values)}
    
setquantity={(dt)=>setquantity(dt)}
setprice={(dt)=>setprice(dt)}
setbenefit
setstockAlert={(dt)=>setstockAlert(dt)}
showStock={false}
manualOrderAddQuant={false}
selectedStock
quantity={quantity}
price={price}
benefit
stockAlert={stockAlert}
selfServing={true}
   //modify chosen
//modifyChosenModal,setareUSureModal,setareUSeureMessage,
//onUpdateTheChosenQuant,modifyTransProd,modifyManOrderProd,
//setModifyChosenModal,
modifyChosenModal={modifyChosenModal}
setmodifyChosenModal={(dt)=>setmodifyChosenModal(dt)}
theChosen={theChosen}
setareUSureModal={(dt)=>setareUSureModal(dt)}
onUpdateTheChosenQuant={()=>handleUpdateTheChosenQuant(quantity,price,
    settheChosen,chosen,setchosen,theChosen,stockAlert)}
    setareUSeureMessage={(dt)=>setareUSeureMessage(dt)}
//     modifyManOrderProd={false}
//are u sure modal
areUSureModal={areUSureModal}
showPriceAreUSure={true}
onOk={()=>handleDeleteProduct(chosen,theChosen,setchosen,setareUSureModal,
    setmodifyChosenModal,setproduct)}
    areUSeureMessage={areUSeureMessage}
//scan
scanModal={scanModal}
scannedGting={scannedGting}
setscannedGting={(dt)=>setscannedGting(dt)}
setscannedProd={(dt)=>setscannedProd(dt)}
setscannedProdModel={(dt)=>setscannedProdModel(dt)}
onScan={()=>handleScannedGting(scannedGting,setscannedProd,
    setscannedProdModel,user,settheChosen,chosen,dispatch,
    setscannedgtingResProd,setscannedgtingResChosen)}
    scannedProd={scannedProd}
    //scanned prod
scannedProdModel={scannedProdModel}
// quantity={quantity}
// price={price}
// benefit={benefit}
setquantity={(dt)=>setquantity(dt)}
setprice={(dt)=>setprice(dt)}
onAddScannedProd={(values)=>handleAddScannedProd(theChosen,scannedProd,quantity,price,
    setchosen,user,chosen,setproduct,values,scannedgtingResProd)}
    setbenefit={(dt)=>setbenefit(dt)}
    showPriceScannedProd={true}
/>
</Screen>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default SelfServingScreen;
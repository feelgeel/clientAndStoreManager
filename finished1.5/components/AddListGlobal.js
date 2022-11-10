import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddProductModal from './AddProductModal';
import Scan from './Scan';
import ScannedProdModel from './ScannedProdModel';
import AddQuantity from './AddQuantity';
import ModifyChosen from './modifyChosen/ModifyChosen';
import AreUSure from './AreUSure';

function AddListGlobal({
       //add product
       chosen,product,chosenModal,setchosenModal,
       setscanModal,onSaveChosen,onSelected,onAddProduct,
       showDelete,onDelete,onUnselected,buttonColor,
       selfServing,clientList,clientStock,verification,onAddStockAlert
       ,manualOrder,onRefresh,refresh,
        //Add quantity
     quantityModal,onAddQuantity,setbenefit,selectedStock,quantity,
     stockAlert,setquantityModal,sell,
    setquantity,setprice,price,benefit,duplication,setselectedStock,listOrder,
    perimationDate,setperimationDate,perimationAlert,setperimationAlert,
     //modify chosen
     modifyChosenModal,setmodifyChosenModal,setareUSureModal,setareUSeureMessage,
     onUpdateTheChosenQuant,modifyTransProd,modifyManOrderProd,
     theChosen,setstockAlert,
       //scan
       scanModal,setscannedGting,onScan,
       //scanned product
       scannedProd,scannedProdModel,onAddScannedProd,manOrderScanProd,setscannedProdModel,
       scannedgtingResProd,scannedgtingResChosen,selectedProd,setselectedProd,
    
    
     //are u sure
     areUSureModal,onOk,areUSeureMessage,titleButton
}) {
return (
<View style={styles.container}>
{/*  add product*/}
<AddProductModal
 chosen={chosen}
 product={product}
 prodModal={chosenModal}
 onSetProdModal={(dt)=>setchosenModal(dt)}
 onAddProduct={(store,categ)=>onAddProduct(store,categ)}
 onUnselected={(dt)=>{onUnselected(dt)}}
 onSaveChosen={()=>onSaveChosen()}
 onSelected={(dt)=>onSelected(dt)}
onScan={()=>setscanModal(true)}
showDelete={showDelete}
manualOrder={manualOrder}
onDelete={()=>onDelete()}
buttonColor={buttonColor}
selfServing={selfServing}

clientStock={clientStock}
verification={verification}
onAddStockAlert={(dt)=>onAddStockAlert(dt)}
sell={sell}
// buttonColor={buttonColor}
onRefresh={onRefresh}
refresh={refresh}
/>
{/*  add quantity*/}
<AddQuantity
chosenmodal={quantityModal}
setchosenmodal={(dt)=>setquantityModal(dt)}
setquantity={(dt)=>setquantity(dt)}
setprice={(dt)=>setprice(dt)}
setbenefit={(dt)=>setbenefit(dt)}
setstockAlert={(dt)=>setstockAlert(dt)}
sell={sell}
manualOrder={manualOrder}
onAddQuantity={(dt)=>onAddQuantity(dt)}
buttonColor={buttonColor}
selectedStock={selectedStock}
quantity={quantity}
price={price}
benefit={benefit}
stockAlert={stockAlert}
selfServing={selfServing}
clientList={clientList}
theChosen={theChosen}
duplication={duplication}
setselectedStock={setselectedStock}
scannedgtingResProd={scannedgtingResProd}
scannedgtingResChosen={scannedgtingResChosen}
listOrder={listOrder}
perimationDate={perimationDate}
setperimationDate={setperimationDate}
perimationAlert={perimationAlert}
setperimationAlert={setperimationAlert}

/>
{/*  modify chosen*/}
<ModifyChosen
modifyChosenModal={modifyChosenModal}
setmodifyChosenModal={(dt)=>setmodifyChosenModal(dt)}
Theproduct={theChosen}
setquantity={(dt)=>setquantity(dt)}
setprice={(dt)=>setprice(dt)}
setbenefit={(dt)=>setbenefit(dt)}
setstockAlert={(dt)=>setstockAlert(dt)}
onUpdateTheChosenQuant={(dt)=>onUpdateTheChosenQuant(dt)}
//     setbenefit={(dt)=>setbenefit(dt)}
    onDelete={()=>{setareUSureModal(true)
    setareUSeureMessage("ARE U SURE U WANT TO DELETE THIS PRODUCT FROM THE LIST")
    }}
    buttonColor={buttonColor}
manualOrder={manualOrder}
modifyTransProd={modifyTransProd}
quantity={quantity}
price={price}
benefit={benefit}
stockAlert={stockAlert}
modifyManOrderProd={modifyManOrderProd}
selfServing={selfServing}
// manualOrder={manualOrder}
listOrder={listOrder}
sell={sell}
perimationDate={perimationDate}
setperimationDate={setperimationDate}
perimationAlert={perimationAlert}
setperimationAlert={setperimationAlert}
/>
{/*  scan product*/}
 <Scan
 scanModal={scanModal}
 setscanModal={(dt)=>setscanModal(dt)}
 setscannedGting={(dt)=>setscannedGting(dt)}
 onScan={()=>onScan()}
 buttonColor={buttonColor}
 />
 {/*  scanned product modal*/}
<ScannedProdModel
scannedProd={scannedProd}
scannedProdModel={scannedProdModel}
setscannedProdModel={(dt)=>setscannedProdModel(dt)}
setquantity={(dt)=>setquantity(dt)}
setprice={(dt)=>setprice(dt)}
setbenefit={(dt)=>setbenefit(dt)}
setstockAlert={(dt)=>setstockAlert(dt)}
manualOrder={manualOrder}
theChosen={theChosen}
onAddScannedProd={(dt)=>onAddScannedProd(dt)}
buttonColor={buttonColor}
// showPriceScannedProd={showPriceScannedProd}
// showBenefit={showBenefit}
manOrderScanProd={manOrderScanProd}
quantity={quantity}
price={price}
benefit={benefit}
stockAlert={stockAlert}
selfServing={selfServing}
clientList={clientList}
sell={sell}
selectedStock={selectedStock}
setselectedStock={(dt)=>setselectedStock(dt)}
scannedgtingResProd={scannedgtingResProd}
scannedgtingResChosen={scannedgtingResChosen}
selectedProd={selectedProd}
setselectedProd={setselectedProd}
listOrder={listOrder}
/>

{/*  are u sure model*/}
<AreUSure
areUSureModal={areUSureModal}
setareUSureModal={(dt)=>setareUSureModal(dt)}
onOk={()=>onOk()}
Message={areUSeureMessage}
titleButton={titleButton}
theChosen={theChosen}
buttonColor={buttonColor}
selfServing={selfServing}
sell={sell}

/>
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default AddListGlobal;
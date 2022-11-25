import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddProductModal from './AddProductModal';
import Scan from './Scan';
import ScannedProdModel from './ScannedProdModel';
import AddQuantity from './AddQuantity';
import ModifyChosen from './modifyChosen/ModifyChosen';
import AreUSure from './AreUSure';
import Payment from './Payment';
import EmptyModal from './EmptyModal';

function AddListGlobal(
  globalProps,
//   {
//        //add product
//        chosen,product,chosenModal,setchosenModal,
//        setscanModal,onSaveChosen,onSelected,onAddProduct,
//        showDelete,onDelete,onUnselected,buttonColor,
//        selfServing,clientList,clientStock,verification,onAddStockAlert
//        ,manualOrder,onRefresh,refresh,
//         //Add quantity
//      quantityModal,onAddQuantity,setbenefit,selectedStock,quantity,
//      stockAlert,setquantityModal,sell,
//     setquantity,setprice,price,benefit,duplication,setselectedStock,listOrder,
//     perimationDate,setperimationDate,perimationAlert,setperimationAlert,
//      //modify chosen
//      modifyChosenModal,setmodifyChosenModal,setareUSureModal,setareUSeureMessage,
//      onUpdateTheChosenQuant,modifyTransProd,modifyManOrderProd,
//      theChosen,setstockAlert,
//        //scan
//        scanModal,setscannedGting,onScan,
//        //scanned product
//        scannedProd,scannedProdModel,onAddScannedProd,manOrderScanProd,setscannedProdModel,
//        scannedgtingResProd,scannedgtingResChosen,selectedProd,setselectedProd,
//     // //damn
//     // emptyModal,setemptyModal,
    
//      //are u sure
//      areUSureModal,onOk,areUSeureMessage,titleButton,
//       //payment
//    paymentModal,setpaymentModal,
// }
) {
  // console.log("addlist global",emptyModal)
  console.log("addlist global",globalProps)
return (
<View style={styles.container}>
{/*  add product*/}
<AddProductModal
 chosen={globalProps.chosen}
 product={globalProps.product}
 prodModal={globalProps.chosenModal}
 onSetProdModal={(dt)=>globalProps.setchosenModal(dt)}
 onAddProduct={(store,categ)=>globalProps.onAddProduct(store,categ)}
 onUnselected={(dt)=>{globalProps.onUnselected(dt)}}
 onSaveChosen={()=>globalProps.onSaveChosen()}
 onSelected={(dt)=>globalProps.onSelected(dt)}
onScan={()=>globalProps.setscanModal(true)}
showDelete={globalProps.showDelete}
manualOrder={globalProps.manualOrder}
onDelete={()=>globalProps.onDelete()}
buttonColor={globalProps.buttonColor}
selfServing={globalProps.selfServing}

clientStock={globalProps.clientStock}
verification={globalProps.verification}
onAddStockAlert={(dt)=>globalProps.onAddStockAlert(dt)}
sell={globalProps.sell}
// buttonColor={buttonColor}
onRefresh={globalProps.onRefresh}
refresh={globalProps.refresh}
/>
{/*  add quantity*/}
<AddQuantity
chosenmodal={globalProps.quantityModal}
setchosenmodal={(dt)=>globalProps.setquantityModal(dt)}
setquantity={(dt)=>globalProps.setquantity(dt)}
setprice={(dt)=>globalProps.setprice(dt)}
setbenefit={(dt)=>globalProps.setbenefit(dt)}
setstockAlert={(dt)=>globalProps.setstockAlert(dt)}
sell={globalProps.sell}
manualOrder={globalProps.manualOrder}
onAddQuantity={(dt)=>globalProps.onAddQuantity(dt)}
buttonColor={globalProps.buttonColor}
selectedStock={globalProps.selectedStock}
quantity={globalProps.quantity}
price={globalProps.price}
benefit={globalProps.benefit}
stockAlert={globalProps.stockAlert}
selfServing={globalProps.selfServing}
clientList={globalProps.clientList}
theChosen={globalProps.theChosen}
duplication={globalProps.duplication}
setselectedStock={globalProps.setselectedStock}
scannedgtingResProd={globalProps.scannedgtingResProd}
scannedgtingResChosen={globalProps.scannedgtingResChosen}
listOrder={globalProps.listOrder}
perimationDate={globalProps.perimationDate}
setperimationDate={globalProps.setperimationDate}
perimationAlert={globalProps.perimationAlert}
setperimationAlert={globalProps.setperimationAlert}

/>
{/*  modify chosen*/}
<ModifyChosen
modifyChosenModal={globalProps.modifyChosenModal}
setmodifyChosenModal={(dt)=>globalProps.setmodifyChosenModal(dt)}
Theproduct={globalProps.theChosen}
setquantity={(dt)=>globalProps.setquantity(dt)}
setprice={(dt)=>globalProps.setprice(dt)}
setbenefit={(dt)=>globalProps.setbenefit(dt)}
setstockAlert={(dt)=>globalProps.setstockAlert(dt)}
onUpdateTheChosenQuant={(dt)=>globalProps.onUpdateTheChosenQuant(dt)}
//     setbenefit={(dt)=>setbenefit(dt)}
    onDelete={()=>{globalProps.setareUSureModal(true)
      globalProps.setareUSeureMessage("ARE U SURE U WANT TO DELETE THIS PRODUCT FROM THE LIST")
    }}
    buttonColor={globalProps.buttonColor}
manualOrder={globalProps.manualOrder}
modifyTransProd={globalProps.modifyTransProd}
quantity={globalProps.quantity}
price={globalProps.price}
benefit={globalProps.benefit}
stockAlert={globalProps.stockAlert}
modifyManOrderProd={globalProps.modifyManOrderProd}
selfServing={globalProps.selfServing}
// manualOrder={manualOrder}
listOrder={globalProps.listOrder}
sell={globalProps.sell}
perimationDate={globalProps.perimationDate}
setperimationDate={globalProps.setperimationDate}
perimationAlert={globalProps.perimationAlert}
setperimationAlert={globalProps.setperimationAlert}
/>
{/*  scan product*/}
 <Scan
 scanModal={globalProps.scanModal}
 setscanModal={(dt)=>globalProps.setscanModal(dt)}
 setscannedGting={(dt)=>globalProps.setscannedGting(dt)}
 onScan={()=>globalProps.onScan()}
 buttonColor={globalProps.buttonColor}
 />
 {/*  scanned product modal*/}
<ScannedProdModel
scannedProd={globalProps.scannedProd}
scannedProdModel={globalProps.scannedProdModel}
setscannedProdModel={(dt)=>globalProps.setscannedProdModel(dt)}
setquantity={(dt)=>globalProps.setquantity(dt)}
setprice={(dt)=>globalProps.setprice(dt)}
setbenefit={(dt)=>globalProps.setbenefit(dt)}
setstockAlert={(dt)=>globalProps.setstockAlert(dt)}
manualOrder={globalProps.manualOrder}
theChosen={globalProps.theChosen}
onAddScannedProd={(dt)=>globalProps.onAddScannedProd(dt)}
buttonColor={globalProps.buttonColor}
// showPriceScannedProd={showPriceScannedProd}
// showBenefit={showBenefit}
manOrderScanProd={globalProps.manOrderScanProd}
quantity={globalProps.quantity}
price={globalProps.price}
benefit={globalProps.benefit}
stockAlert={globalProps.stockAlert}
selfServing={globalProps.selfServing}
clientList={globalProps.clientList}
sell={globalProps.sell}
selectedStock={globalProps.selectedStock}
setselectedStock={(dt)=>globalProps.setselectedStock(dt)}
scannedgtingResProd={globalProps.scannedgtingResProd}
scannedgtingResChosen={globalProps.scannedgtingResChosen}
selectedProd={globalProps.selectedProd}
setselectedProd={globalProps.setselectedProd}
listOrder={globalProps.listOrder}
/>

{/*  are u sure model*/}
<AreUSure
areUSureModal={globalProps.areUSureModal}
setareUSureModal={(dt)=>globalProps.setareUSureModal(dt)}
onOk={()=>globalProps.onOk()}
Message={globalProps.areUSeureMessage}
titleButton={globalProps.titleButton}
theChosen={globalProps.theChosen}
buttonColor={globalProps.buttonColor}
selfServing={globalProps.selfServing}
sell={globalProps.sell}

/>
{/* <AreUSure
areUSureModal={emptyModal}
setareUSureModal={(dt)=>setemptyModal(dt)}
onOk={()=>onOk()}
Message={areUSeureMessage}
titleButton={titleButton}
theChosen={theChosen}
buttonColor={buttonColor}
selfServing={selfServing}
sell={sell}

/> */}
{/* <EmptyModal
 tempmodal={true}
 settempmodal={(dt)=>setamchi(dt)}
/> */}
{/*  are u sure model*/}
{/* <Payment
 paymentModal={globalProps.paymentModal}
setpaymentModal={(dt)=>globalProps.setpaymentModal(dt)}
/> */}
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default AddListGlobal;
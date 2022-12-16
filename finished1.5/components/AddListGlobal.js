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
  // console.log("addlist global",globalProps)
return (
<View style={styles.container}>
{/*  add product*/}
{/* add product
        chosen,product,chosenModal,setchosenModal,
        setscanModal,onSaveChosen,onSelected,onAddProduct,
        showDelete,onDelete,onUnselected,buttonColor,
        selfServing,clientList,clientStock,verification,onAddStockAlert
        ,manualOrder,onRefresh,refresh, */}
<AddProductModal
 chosen={globalProps.chosen}
 product={globalProps.product}
 prodModal={globalProps.chosenModal}
 verification={globalProps.verification}
 showDelete={globalProps.showDelete}
 manualOrder={globalProps.manualOrder}
 selfServing={globalProps.selfServing}
 clientStock={globalProps.clientStock}
 sell={globalProps.sell}
 refresh={globalProps.refresh}
 onSetProdModal={(dt)=>globalProps.setchosenModal(dt)}
 onAddProduct={(store,categ)=>globalProps.onAddProduct(store,categ)}
 onUnselected={(dt)=>{globalProps.onUnselected(dt)}}
 onSaveChosen={(dt)=>globalProps.onSaveChosen(dt)}
 onSelected={(dt)=>globalProps.onSelected(dt)}
 onDelete={(dt)=>globalProps.onDelete(dt)}
 onAddStockAlert={(dt)=>globalProps.onAddStockAlert(dt)}
 onRefresh={globalProps.onRefresh}
onScan={(dt)=>globalProps.setscanModal(dt)}
buttonColor={globalProps.buttonColor}
// buttonColor={buttonColor}
/>
{/*  add quantity*/}
{/* <AddQuantity
quantityModal={globalProps.quantityModal}
setquantityModal={(dt)=>globalProps.setquantityModal(dt)}
onAddQuantity={(dt)=>globalProps.onAddQuantity(dt)}
sell={globalProps.sell}
manualOrder={globalProps.manualOrder}
selfServing={globalProps.selfServing}
listOrder={globalProps.listOrder}
clientList={globalProps.clientList}
setquantity={(dt)=>globalProps.setquantity(dt)}
selectedStock={globalProps.selectedStock}
quantity={globalProps.quantity}
theChosen={globalProps.theChosen}
/> */}
{/*  modify chosen*/}
{/* <ModifyChosen
modifyChosenModal={globalProps.modifyChosenModal}
setmodifyChosenModal={(dt)=>globalProps.setmodifyChosenModal(dt)}
Theproduct={globalProps.theChosen}
setprice={(dt)=>globalProps.setprice(dt)}
setquantity={(dt)=>globalProps.setquantity(dt)}
setbenefit={(dt)=>globalProps.setbenefit(dt)}
setstockAlert={(dt)=>globalProps.setstockAlert(dt)}
onUpdateTheChosenQuant={(dt)=>globalProps.onUpdateTheChosenQuant(dt)}
//     setbenefit={(dt)=>setbenefit(dt)}
    onDelete={()=>{globalProps.setareUSureModal(true)
      globalProps.setareUSeureMessage("ARE U SURE U WANT TO DELETE THIS PRODUCT FROM THE LIST")
    }}
    price={globalProps.price}
    benefit={globalProps.benefit}
    stockAlert={globalProps.stockAlert}
    selfServing={globalProps.selfServing}
    manualOrder={globalProps.manualOrder}
    listOrder={globalProps.listOrder}
    sell={globalProps.sell}
    perimationDate={globalProps.perimationDate}
    setperimationDate={globalProps.setperimationDate}
    perimationAlert={globalProps.perimationAlert}
    setperimationAlert={globalProps.setperimationAlert}
    // buttonColor={globalProps.buttonColor}
// modifyTransProd={globalProps.modifyTransProd}
// quantity={globalProps.quantity}
// modifyManOrderProd={globalProps.modifyManOrderProd}
// manualOrder={manualOrder}
/> */}
{/*  scan product*/}
 {/* <Scan
 scanModal={globalProps.scanModal}
 setscanModal={(dt)=>globalProps.setscanModal(dt)}
 setscannedGting={(dt)=>globalProps.setscannedGting(dt)}
 onScan={()=>globalProps.onScan()}
//  buttonColor={globalProps.buttonColor}
 /> */}
 {/*  scanned product modal*/}
{/* <ScannedProdModel
// scannedProd={globalProps.scannedProd}
scannedProdModel={globalProps.scannedProdModel}
setscannedProdModel={(dt)=>globalProps.setscannedProdModel(dt)}
setquantity={(dt)=>globalProps.setquantity(dt)}
setprice={(dt)=>globalProps.setprice(dt)}
theChosen={globalProps.theChosen}
onAddScannedProd={(dt)=>globalProps.onAddScannedProd(dt)}
setbenefit={(dt)=>globalProps.setbenefit(dt)}
buttonColor={globalProps.buttonColor}
setstockAlert={(dt)=>globalProps.setstockAlert(dt)}
manualOrder={globalProps.manualOrder}
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

// showPriceScannedProd={showPriceScannedProd}
// showBenefit={showBenefit}
// manOrderScanProd={globalProps.manOrderScanProd}
/> */}

{/*  are u sure model*/}
{/* <AreUSure
areUSureModal={globalProps.areUSureModal}
setareUSureModal={(dt)=>globalProps.setareUSureModal(dt)}
onOk={()=>globalProps.onOk()}
Message={globalProps.areUSeureMessage}
titleButton={globalProps.titleButton}
theChosen={globalProps.theChosen}
selfServing={globalProps.selfServing}
sell={globalProps.sell}
/> */}
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
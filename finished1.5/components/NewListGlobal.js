import React from 'react';
import { View,StyleSheet } from 'react-native';
import AddProductModal from './AddProductModal';
import AddQuantity from './AddQuantity';
import Payment from './Payment';
import ModifyChosen from './modifyChosen/ModifyChosen';
import AreUSure from './AreUSure';
import ScannedProdModel from './ScannedProdModel';
import Scan from './Scan';

const NewListGlobal = (globalProps) => {

  // console.log('global props',globalProps)
return (
 <View>
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
<AddQuantity
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
/>
<ModifyChosen
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
/>
 <Scan
 scanModal={globalProps.scanModal}
 setscanModal={(dt)=>globalProps.setscanModal(dt)}
 setscannedGting={(dt)=>globalProps.setscannedGting(dt)}
 onScan={()=>globalProps.onScan()}
//  buttonColor={globalProps.buttonColor}
 />
<ScannedProdModel
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
/>
<AreUSure
areUSureModal={globalProps.areUSureModal}
setareUSureModal={(dt)=>globalProps.setareUSureModal(dt)}
onOk={()=>globalProps.onOk()}
Message={globalProps.areUSeureMessage}
titleButton={globalProps.titleButton}
theChosen={globalProps.theChosen}
selfServing={globalProps.selfServing}
sell={globalProps.sell}
/>
<Payment
 paymentModal={globalProps.paymentModal}
setpaymentModal={(dt)=>globalProps.setpaymentModal(dt)} 
 totalPrice={globalProps.totalPrice}
  settotalPrice={(dt)=>globalProps.settotalPrice(dt)}
/>
 </View>
  );
};


const styles = StyleSheet.create({

 });
export default NewListGlobal;
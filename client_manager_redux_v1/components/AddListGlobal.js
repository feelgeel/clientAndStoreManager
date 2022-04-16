import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddProductModal from './AddProductModal';
import Scan from './Scan';
import ScannedProdModel from './ScannedProdModel';
import AddQuantity from './AddQuantity';
import ModifyChosen from './ModifyChosen';
import AreUSure from './AreUSure';

function AddListGlobal({
       //add product
       chosen,product,chosenModal,setchosenModal,
       settheChosen,setModifyChosenModal,setscanModal,setquantityModal,
       onSaveChosen,onSelected,onAddProduct,showPriceAddprod,showDelete,showBenefit,showStock,onDelete,
       onUnselected,buttonColor,
       //scan
       scanModal,theChosen,setscannedGting,setscannedProdModel,onScan,
       //scanned product
       scannedProd,scannedProdModel,setquantity,setprice,onAddScannedProd,showPriceScannedProd,
     //Add quantity
     quantityModal,onAddQuantity,setBenefit,selectedStock,quantity,showPriceAddQuant,
     //modify chosen
     modifyChosenModal,setareUSureModal,setareUSeureMessage,onUpdateTheChosenQuant,
     //are u sure
     areUSureModal,onOk,areUSeureMessage,showPriceAreUSure
}) {
return (
<View style={styles.container}>
{/*  add product*/}
<AddProductModal
 chosen={chosen}
 product={product}
 onAddProduct={(store,categ)=>onAddProduct(store,categ)}
 onUnselected={(dt)=>{onUnselected(dt)}}
 prodModal={chosenModal}
 onSetProdModal={(dt)=>setchosenModal(dt)}
 onSaveChosen={()=>onSaveChosen()}
 onSelected={(dt)=>onSelected(dt)}
 showPriceAddprod={showPriceAddprod}
onScan={()=>setscanModal(true)}
showDelete={showDelete}
onDelete={()=>onDelete()}
buttonColor={buttonColor}
showBenefit={showBenefit}
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
theChosen={theChosen}
onAddScannedProd={()=>onAddScannedProd()}
buttonColor={buttonColor}
showPriceScannedProd={showPriceScannedProd}
showBenefit={showBenefit}
/>
{/*  add quantity*/}
<AddQuantity
chosenmodal={quantityModal}
Setchosenmodal={(dt)=>setquantityModal(dt)}
Setquantity={(dt)=>setquantity(dt)}
Setprice={(dt)=>setprice(dt)}
setBenefit={(dt)=>setBenefit(dt)}
showPriceAddQuant={showPriceAddQuant}
showBenefit={showBenefit}
showStock={showStock}
onAddQuantity={()=>onAddQuantity()}
buttonColor={buttonColor}
selectedStock={selectedStock}
quantity={quantity}
/>
{/*  modify chosen*/}
<ModifyChosen
modifyChosenModal={modifyChosenModal}
setModifyChosenModal={(dt)=>setModifyChosenModal(dt)}
Theproduct={theChosen}
Setquantity={(dt)=>setquantity(dt)}
onUpdateTheChosenQuant={()=>onUpdateTheChosenQuant()}
    showPrice={showPriceAddprod}
    setprice={(dt)=>setprice(dt)}
    onDelete={()=>{setareUSureModal(true)
    setareUSeureMessage("ARE U SURE U WANT TO DELETE THIS PRODUCT FROM THE LIST")
    }}
    buttonColor={buttonColor}
    showStock={showStock}
/>
{/*  are u sure model*/}
<AreUSure
areUSureModal={areUSureModal}
setareUSureModal={(dt)=>setareUSureModal(dt)}
onOk={()=>onOk()}
Message={areUSeureMessage}
theChosen={theChosen}
buttonColor={buttonColor}
showPriceAreUSure={showPriceAreUSure}
showBenefit={showBenefit}
/>
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default AddListGlobal;
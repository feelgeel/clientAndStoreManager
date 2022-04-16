import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddProductModal from '../../components/AddProductModal';
import Scan from '../../components/Scan';
import ScannedProdModel from '../../components/ScannedProdModel';
import AddQuantity from '../../components/AddQuantity';
import ModifyChosen from '../../components/ModifyChosen';
import AreUSure from '../../components/AreUSure';

function AddListManualOrder({
    //add product
    chosen,product,chosenModal,setchosenModal,
    settheChosen,setModifyChosenModal,setscanModal,setquantityModal,
    onSaveChosen,onSelected,onAddProduct,showPrice,showDelete,onDelete,
    buttonColor,
    //scan
    scanModal,theChosen,setscannedGting,setscannedProdModel,onScan,
    //scanned product
    scannedProd,scannedProdModel,setquantity,setprice,onAddScannedProd,
  //Add quantity
  quantityModal,onAddQuantity,
  //modify chosen
  modifyChosenModal,setareUSureModal,setareUSeureMessage,onUpdateTheChosenQuant,
  //are u sure
  areUSureModal,onOk,areUSeureMessage

}) {
return (
<View style={styles.container}>
{/*  add product*/}
<AddProductModal
 chosen={chosen}
 product={product}
 onAddProduct={(store,categ)=>onAddProduct(store,categ)}
 onUnselected={(dt)=>{setquantityModal(true);settheChosen(dt)}}
 prodModal={chosenModal}
 onSetProdModal={(dt)=>setchosenModal(dt)}
 onSaveChosen={()=>onSaveChosen()}
 onSelected={(dt)=>onSelected(dt)}
showPrice={showPrice}
onScan={()=>setscanModal(true)}
showDelete={showDelete}
onDelete={()=>onDelete()}
buttonColor={buttonColor}
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
/>
{/*  add quantity*/}
<AddQuantity
chosenmodal={quantityModal}
Setchosenmodal={(dt)=>setquantityModal(dt)}
Setquantity={(dt)=>setquantity(dt)}
Setprice={(dt)=>setprice(dt)}
showPrice={true}
onAddQuantity={()=>onAddQuantity()}
buttonColor={buttonColor}
/>
{/*  modify chosen*/}
<ModifyChosen
modifyChosenModal={modifyChosenModal}
setModifyChosenModal={(dt)=>setModifyChosenModal(dt)}
Theproduct={theChosen}
Setquantity={(dt)=>setquantity(dt)}
onUpdateTheChosenQuant={()=>onUpdateTheChosenQuant()}
    showPrice={true}
    setprice={(dt)=>setprice(dt)}
    onDelete={()=>{setareUSureModal(true)
    setareUSeureMessage("ARE U SURE U WANT TO DELETE THIS PRODUCT FROM THE LIST")
    }}
    buttonColor={buttonColor}
/>
{/*  are u sure model*/}
<AreUSure
areUSureModal={areUSureModal}
setareUSureModal={(dt)=>setareUSureModal(dt)}
onOk={()=>onOk()}
Message={areUSeureMessage}
theChosen={theChosen}
buttonColor={buttonColor}
/>
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default AddListManualOrder;
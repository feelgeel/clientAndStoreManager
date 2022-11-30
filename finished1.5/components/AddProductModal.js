import React from 'react';
import { StyleSheet, View,Modal,Button } from 'react-native';
import AddProducts from './AddProducts';
import C_Button from './C_Button';

function AddProductModal({
    product=[],
    chosen=[],
    prodModal,
    verification=false,
    showDelete=false,
    manualOrder=false,
    selfServing=false,
    clientStock=false,
    sell=false,
    refresh=false,
    onSetProdModal,
    onAddProduct,
    onUnselected,
    onSaveChosen,
    onSelected,
    onDelete,
    onAddStockAlert,
    onRefresh,
    onScan,
    buttonColor,
   
}) {
    // console.log("addprod modal",product)
return (
<View style={styles.container}>

<Modal
animationType="slide"
visible={prodModal}
onRequestClose={() => {
    onSetProdModal(false);

}}

>
<C_Button 
title="exit"
onPress={()=>onSetProdModal(false)}
// color={buttonColor}
/>
<C_Button 
title="scan"
onPress={onScan}
// color={buttonColor}
/>
<C_Button 
title="save"
onPress={onSaveChosen}
// color={buttonColor}
/>
{refresh&&<C_Button 
title="refresh"
onPress={onRefresh}
// color={buttonColor}
/>}
{showDelete&&<Button 
    title="Delete List"
    onPress={onDelete}
    // color={buttonColor}
/>}
<AddProducts
product={product}
chosen={chosen}
onUnselected={onUnselected}
onAddProduct={onAddProduct}
verification={verification}
onSelected={onSelected}
manualOrder={manualOrder}
selfServing={selfServing}
clientStock={clientStock}
onAddStockAlert={onAddStockAlert}
sell={sell}
buttonColor={buttonColor}
/>
</Modal>
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default AddProductModal;
import React from 'react';
import { StyleSheet, View,Modal,Button } from 'react-native';
import AddProducts from './AddProducts';
import C_Button from './C_Button';

function AddProductModal({
    chosen,
    product,
    prodModal,
    onSetProdModal,
    onAddProduct,
    onUnselected,
    verification=false,
    onSaveChosen,
    onSelected,
    onScan,
    showDelete=false,
    onDelete,
    buttonColor,
    manualOrder,
    selfServing,
    clientStock=false,
    onAddStockAlert,
    sell,
}) {
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
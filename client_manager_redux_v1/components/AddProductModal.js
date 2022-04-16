import React from 'react';
import { StyleSheet, View,Modal,Button } from 'react-native';
import AddProducts from './AddProducts';

function AddProductModal({
    chosen,
    product,
    onAddProduct,
    onUnselected,
    prodModal,
    onSetProdModal,
    onSaveChosen,
    onSelected,
    showPriceAddprod,
    onScan,
    showDelete=false,
    showBenefit=false,
    onDelete,
    buttonColor
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
<Button 
title="exit"
color={buttonColor}
onPress={()=>onSetProdModal(false)}
/>
<Button 
color={buttonColor}
title="scan"
onPress={onScan}
/>
<Button 
color={buttonColor}
title="save"
onPress={onSaveChosen}
/>
{showDelete&&<Button 
color={buttonColor}
title="Delete List"
onPress={onDelete}
/>}
<AddProducts
chosen={chosen}
product={product}
onAddProduct={onAddProduct}
onUnselected={onUnselected}
onSelected={onSelected}
showPriceAddprod={showPriceAddprod}
showBenefit={showBenefit}
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
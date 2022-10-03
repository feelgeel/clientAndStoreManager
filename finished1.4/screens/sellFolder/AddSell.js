import React from 'react';
import { StyleSheet, View,Modal,Button } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import AddProducts from '../../components/AddProducts';
import { getStock,updateStock } from '../../api/stockApi';
function AddSell({
    selectedlistName,
    chosen,
    product,
    modalAddList,
    onUnselected,
    onSave,
    onsetproduct,
    onsetchosen,
    onsetmodaladdlist,
    onsetlistname}) {
      const selllistNames=useSelector(state=>state.entities.sell_store.list)
      const sellProducts=useSelector(state=>state.entities.sell_store.product)
      const user=useSelector(state=>state.entities.users.list)
        const dispatch=useDispatch();

const handleSellListSaved=async()=>{
    let {data:savedsell}=await addListNameSell(selectedlistName);
    dispatch(sellStoreAction.addListName(savedsell));
    let newselllistname=[...selllistNames]
    newselllistname.push(savedsell)
    onsetlistname(newselllistname)
    // let newsellprod=[...sellProducts];
    chosen.map(async(prod)=>{
      let gting=(prod.Gting).toString();
      let theuser=(user.userId).toString();
      let thequantity=(prod.quantity).toString();
      let prodId=(prod.productId).toString()
      let {data:savedStock}=await getStock(theuser,gting,prodId)
      let newsavedstock={...savedStock[0]};
      let stockQuant=savedStock[0].quantity;
      let newQuantity=Number(stockQuant)-Number(thequantity);
      newsavedstock.quantity=newQuantity;
      let {data:updatedStock}=await updateStock(savedStock[0]._id,newsavedstock)
      // newsellprod.push(prod)
      // console.log("chosen",chosen)
      dispatch(sellStoreAction.setProducts(prod));
    })
    
    // console.log("newsellprod",newsellprod)
    // dispatch(sellStoreAction.addListName(selectedlistName));
    onsetmodaladdlist(false)
  }
  const handleCancleListSaved=()=>{
    onsetproduct([]);
    onsetchosen([]);
    onsetmodaladdlist(false);
  }
return (
<View style={styles.container}>
<Modal
        animationType="slide"
        // transparent={true}
        visible={modalAddList}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          onsetmodaladdlist(false);
        }}
      >
        <Button
        title="cancle"
        onPress={handleCancleListSaved} />
        <Button
        title="save"
        onPress={handleSellListSaved} />
        <AddProducts 
            onUnselected={onUnselected} 
            onSave={onSave}
            product={product}
             chosen={chosen}
        />
        {/* <View style={{flex:1,paddingTop:"50%",justifyContent:"center",alignItems:"center"}}>
          <BarCodeScanner
         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
         // barCodeTypes={[BarCodeScanner.Constants.Type.qr,BarCodeScanner.Constants.Type.ena13]}
       
         style={styles.bar}
          />
        {scanned && <Button title={'Tap to Scan'} onPress={() => setScanned(false)} />} 
  
</View> */}
      </Modal>
      
</View>
 
 
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default AddSell;
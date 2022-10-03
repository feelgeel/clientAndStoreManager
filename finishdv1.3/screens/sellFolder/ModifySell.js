import React from 'react';
import { StyleSheet, View,Modal,Button } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import *as addingGtingAction from '../../redux/addingGting';
import *as listNamesAction from '../../redux/listNames';
import *as sellStoreAction from '../../redux/Sell_store';
import { addProductSell } from '../../api/sellProductApi.';
import { addListNameSell } from '../../api/sellApi.';
import AddProducts from '../../components/AddProducts';
import {getStock,updateStock} from '../../api/stockApi';
import {loadSellListNames} from '../../api/sellProductApi.';
function ModifySell({
    selectedlistName,
    chosen,
    product,
    modalModifySell,
    onUnselected,
    onSave,
    onsetproduct,
    onsetchosen,
    onsetmodalModifySell,
    onsetlistname}) {
 const selllistNames=useSelector(state=>state.entities.sell_store.list)
 const user=useSelector(state=>state.entities.users.list)
 const dispatch=useDispatch();
 const handleSellListModified=async()=>{
    let newChosen=[...chosen]
   
  //  console.log(selectedlistName)
  //  console.log("newchosen",newChosen)
    // let {data:savedsell}=await addListNameSell(selectedlistName);
    // dispatch(sellStoreAction.addListName(savedsell));
    // let newselllistname=[...selllistNames]
    // newselllistname.push(savedsell)
    // onsetlistname(newselllistname)
    chosen.map(async(prod)=>{
let {data:listprod}=await loadSellListNames(prod._id)
      let gting=(prod.Gting).toString();
      let theuser=(user.userId).toString();
      let thequantity=(prod.quantity).toString();
      // let prodId=(prod.productId).toString()
      // let {data:savedStock}=await getStock(theuser,gting,prodId)
      // let newsavedstock={...savedStock[0]};
      // let stockQuant=savedStock[0].quantity;
      // let newQuantity=Number(stockQuant)-Number(thequantity);
      // newsavedstock.quantity=newQuantity;
      // let {data:updatedStock}=await updateStock(savedStock[0]._id,newsavedstock)
      console.log(listprod)
      console.log(prod)
    })
    // dispatch(sellStoreAction.addListName(selectedlistName));
    onsetmodalModifySell(false)
        }
const handleCancleListModified=()=>{
  onsetproduct([]);
  onsetchosen([]);
  onsetmodalModifySell(false);
}
return (
<View style={styles.container}>
<Modal
        animationType="slide"
        // transparent={true}
        visible={modalModifySell}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          onsetmodalModifySell(false);
        }}
      >
        <Button
        title="cancle"
        onPress={handleCancleListModified} />
        <Button
        title="save"
        onPress={handleSellListModified} />
        <AddProducts 
            onUnselected={onUnselected} 
            onSave={onSave}
            product={product}
             chosen={chosen}
        />
     
      </Modal>
      
</View>
 
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ModifySell;
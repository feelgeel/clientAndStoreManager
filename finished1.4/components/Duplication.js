import React, { useState } from 'react';
import { StyleSheet, View,Button,Modal,TextInput } from 'react-native';
import AddProducts from '../components/AddProducts';
import ModifyChosen from './modifyChosen/ModifyChosen';

function Duplication({setDuplicationmodal,Duplicationmodal,
    SetlistName,chosen,product,
    Setchosenmodal,
    settheChosen,
    Theproduct,
    Setquantity,
    onpdateTheChosenQuantDuplication,onDuplicateClientList,onAddproducts}) {
        const[modifyChosenModal1,setModifyChosenModal1]=useState(false)
return (
<View style={styles.container}>
<ModifyChosen
modifyChosenModal={modifyChosenModal1}
setModifyChosenModal={(dt)=>setModifyChosenModal1(dt)}
Theproduct={Theproduct}
Setquantity={Setquantity}
onUpdateTheChosenQuant={()=>onpdateTheChosenQuantDuplication()}
/>
<Modal
animationType="slide"
visible={Duplicationmodal}
onRequestClose={() => {setDuplicationmodal(false)}}>
<Button title='exit'
     onPress={()=>{setDuplicationmodal(false)}}
    />
      <TextInput  onChangeText={(t)=>SetlistName(t)} 
              placeholder="new List" style={{fontSize:30}}/>
<Button title='save'
     onPress={()=>{onDuplicateClientList()}}
    />
 <AddProducts
chosen={chosen}
product={product}
onAddProduct={(store,categ)=>onAddproducts(store,categ)}
onUnselected={(dt)=>{Setchosenmodal(true);settheChosen(dt)}}
onSelected={(dt)=>{settheChosen(dt);setModifyChosenModal1(true)}}
/>
    
</Modal>
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default Duplication;
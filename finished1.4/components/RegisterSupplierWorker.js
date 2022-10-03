import React from 'react';
import { StyleSheet, View,Modal } from 'react-native';
import C_Button from './C_Button';
import C_Text from './C_Text';
function RegisterSupplierWorker({
    prodModal,
    setprodModal,
    user,
    dispatch,
    setchangeAccountModal,
    account
}) {
const handleOk=()=>{
    setprodModal(false)
    setchangeAccountModal(false)
}
const handleExist=()=>{
    setprodModal(false)
  
}
// console.log(familyObj)
       
return (
<View style={styles.container}>
<Modal
animationType="slide"
visible={prodModal}
onRequestClose={() => {
  setprodModal(false);
}}

>
<C_Button 
title="exit"
// color={buttonColor}
onPress={()=>setprodModal(false)}
/>
<C_Text>pls go to accountScreen > share your account
     and then let your boss to add u</C_Text>    
<View style={styles.button}>
    <C_Button title="Close" 
    onPress={handleExist} color="primary" width="20%"/>
    <C_Button title="ok" 
    onPress={handleOk} color="primary" width="20%" />

</View>
</Modal>

</View>
 );
}
const styles = StyleSheet.create({
button:{
    flexDirection:"row",
    justifyContent:"space-around"
}
})
export default RegisterSupplierWorker;
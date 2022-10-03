import React from 'react';
import { StyleSheet, View,Modal } from 'react-native';
import C_Button from './C_Button';
import GeneratedQrCode from './GeneratedQrCode';

function ShareAccount({
    prodModal,
    setprodModal,
    user,
}) {
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
<GeneratedQrCode
    data={user._id}
    />
</Modal>

</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ShareAccount;
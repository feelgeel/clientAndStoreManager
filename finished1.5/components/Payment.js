import React, { useState } from 'react';
import { StyleSheet,View,Text,Button,Modal } from 'react-native';
import {  Card, Title,List } from 'react-native-paper';
import C_Card from './C_Card';
import C_Button from './C_Button';
import C_TextInput from './C_TextInput';

function Payment({
  paymentModal,
  setpaymentModal,
  payment,
  setpayment,
  onSavePayment,
}) {
  // console.log("Payment",paymentModal)
  const [remise,setremise]=useState(0)
  const [versement,setversement]=useState(0)
return (
  
<View style={styles.container}>
<Modal
        animationType="slide"
        visible={paymentModal}
        onRequestClose={() =>setpaymentModal(false)}
      >
        
      <Text style={{fontSize:30}}>total:{payment.totalPrice}</Text>
     <C_TextInput
     placeholder="remise"
     keyboardType="numeric"
     onChangeText={(dt)=>setremise(dt)}
     />
     <Text style={{fontSize:30}}
     >nouveau solde:{Number(payment.totalPrice)-Number(remise)}</Text>
     <C_TextInput
     placeholder="versement"
     keyboardType="numeric"
     onChangeText={(dt)=>setversement(dt)}
     />
       <Text style={{fontSize:30}}>rest:{payment.totalPrice-remise-versement}</Text>

           <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
            <C_Button
             title='cancel'
            // color={buttonColor}
            width="20%"
             onPress={()=>{
              setpaymentModal(false)
              
             }}
            />
            <C_Button 
            title="save"
            width="20%"

            // color={buttonColor}
             onPress={()=>{
              onSavePayment(remise,versement)
              setversement(0)
              setremise(0)
            }
            }
              />
              </View>
      </Modal>
</View>
 );
}
const styles = StyleSheet.create({
container:{
paddingHorizontal:10
}
})
export default Payment;
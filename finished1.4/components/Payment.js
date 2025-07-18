import React, { useState } from 'react';
import { StyleSheet,View,Text,Button,Modal } from 'react-native';
import {  Card, Title,List } from 'react-native-paper';
import C_Card from './C_Card';
import C_Button from './C_Button';
import C_TextInput from './C_TextInput';

function Payment({
  paymentModal,
  setpaymentModal,
}) {
  console.log("payment",paymentModal)
  const [remise,setremise]=useState(0)
  const [versement,setversement]=useState(0)
return (
  
<View style={styles.container}>
<Modal
        animationType="slide"
        visible={paymentModal}
        onRequestClose={() =>setpaymentModal(false)}
      >
        
      <Text style={{fontSize:30}}>total:10000</Text>
     <C_TextInput
     placeholder="remise"
     keyboardType="numeric"
     />
     <Text style={{fontSize:30}}>nouveau solde:9500</Text>
     <C_TextInput
     placeholder="versement"
     keyboardType="numeric"
     />
       <Text style={{fontSize:30}}>rest:500</Text>

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
            title="hello"
            width="20%"

            // color={buttonColor}
            //  onPress={()=>{
            //      onOk()
            //  }}
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
import React from 'react';
import { StyleSheet,View,Text,Button,Modal } from 'react-native';
import {  Card, Title,List } from 'react-native-paper';
import C_Card from './C_Card';
import C_Button from './C_Button';
function Payment({
  paymentModal,
  setpaymentModal,
}) {
  
return (
  
<View style={styles.container}>
<Modal
        animationType="slide"
        visible={paymentModal}
        onRequestClose={() => {
          setpaymentModal(false);
        }}
      >
        
      <Text style={{fontSize:30}}>helolo</Text>
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
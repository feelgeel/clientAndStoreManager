import React from 'react';
import { StyleSheet, View,Modal,Button,Text,TextInput } from 'react-native';

function ModifyChosen({modifyChosenModal,setModifyChosenModal,
    Setquantity,Theproduct
    ,onUpdateTheChosenQuant}) {
return (
<View style={styles.container}>
<Modal
animationType="slide"
visible={modifyChosenModal}
onRequestClose={() => {
    setModifyChosenModal(false);
}}>
    <Button title='exit'
     onPress={()=>{
      setModifyChosenModal(false)
     }}
    />
    <View style={{flexDirection:"row",justifyContent:"center"}}>
              
        <Text style={{fontSize:30}}>
        old quantity   :{Theproduct.quantity}   </Text>   
                          <TextInput  onChangeText={(t)=>Setquantity(t)} 
                          keyboardType="number-pad"
                            placeholder="new Name" style={{fontSize:30}}/>
                
                    </View>
                     
         <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                 <Button title='cancel'
    
                  onPress={()=>{
                    setModifyChosenModal(false)
                  }}
                 />
                 
                 <Button title='OK'
                  onPress={()=>{
                    onUpdateTheChosenQuant()
                    setModifyChosenModal(false)
                    Setquantity(1)
                  }}
                   />
         </View>
</Modal> 

</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ModifyChosen;
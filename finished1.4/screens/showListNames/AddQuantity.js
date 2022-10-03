import React from 'react';
import { StyleSheet, View,Modal,TextInput,Button } from 'react-native';

function AddQuantity({
    chosenmodal,
    Setchosenmodal,
    Setquantity,
    onunselected
}) {
return (
<View style={styles.container}>
<Modal
animationType="slide"
visible={chosenmodal}
onRequestClose={() => {
    Setchosenmodal(false);
}}
> 
<View style={{
              flexDirection:"row",justifyContent:"center"}}>
              {/* <Text style={{paddingRight:20,fontSize:30}}>listName</Text> */}
            <TextInput
            keyboardType="number-pad" 
              onChangeText={(t)=>Setquantity(t)}
            placeholder="quantity" style={{fontSize:30}}/>

            </View>
     
            <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
            <Button title='cancel'

             onPress={()=>{
                Setchosenmodal(false)
                // Setchosen([])
                // Setproduct([])
                
             }}
            />
            
            <Button title='OK'
             onPress={async()=>{onunselected()}}
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
export default AddQuantity;
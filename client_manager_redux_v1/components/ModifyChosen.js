import React from 'react';
import { StyleSheet, View,Modal,Button,Text,TextInput } from 'react-native';

function ModifyChosen({modifyChosenModal,setModifyChosenModal,
    Setquantity,Theproduct,onUpdateTheChosenQuant,showPrice=false,
    setprice,onDelete,buttonColor,showStock}) {
return (
<View style={styles.container}>
<Modal
animationType="slide"
visible={modifyChosenModal}
onRequestClose={() => {
    setModifyChosenModal(false);
}}>
    <Button title='exit'
    color={buttonColor}
     onPress={()=>{
      setModifyChosenModal(false)
     }}
    />
    <Button title='delete product'
    color={buttonColor}
    style={{fontSize:30}}
     onPress={()=>{
      onDelete()
     }}
    />
    <View style={{flexDirection:"row",justifyContent:"center"}}>
              
        <Text style={{fontSize:30}}>
        old quantity   :{Theproduct.quantity}   </Text>   
                          <TextInput  onChangeText={(t)=>Setquantity(t)} 
                          keyboardType="number-pad"
                            placeholder="new QUANTITY" style={{fontSize:30}}/>
                
                    </View>
    {!showStock&&<View style={{flexDirection:"row",justifyContent:"center"}}>
              
        <Text style={{fontSize:30}}>
        old Price   :{Theproduct.price}   </Text>   
                          <TextInput  onChangeText={(t)=>setprice(t)} 
                          keyboardType="number-pad"
                            placeholder="new price" style={{fontSize:30}}/>
                
                    </View>}
                {showStock&&
                <View style={{flexDirection:"row",justifyContent:"center"}}>
                <Text style={{fontSize:30}}>old Price   :{Theproduct.price}</Text>
                </View>
                }
                     
         <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                 <Button title='cancel'
                 color={buttonColor}
                  onPress={()=>{
                    setModifyChosenModal(false)
                  }}
                 />
                 
                 <Button title='OK'
                 color={buttonColor}
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
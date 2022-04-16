import React from 'react';
import { StyleSheet, View,Modal,TextInput,Button,Text } from 'react-native';

function AddQuantity({
    chosenmodal,
    Setchosenmodal,
    Setquantity,
    Setprice,
    setBenefit,
    showPriceAddQuant=false,
    showBenefit=false,
    showStock=false,
    onAddQuantity,
    buttonColor,
    selectedStock,
    quantity
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
{/* <View style={{flexDirection:"row",justifyContent:"center"}}> */}
              {/* <Text style={{paddingRight:20,fontSize:30}}>listName</Text> */}
            <View style={{flexDirection:"row",justifyContent:"center"}}>
             <Text style={{paddingRight:20,fontSize:30}}>quantity :{quantity}</Text>
            <TextInput
            keyboardType="number-pad" 
              onChangeText={(t)=>Setquantity(t)}
            placeholder="quantity" style={{fontSize:30}}/>
            </View>
            {showStock&&<View>
                     <View style={{flexDirection:"row",justifyContent:"center"}}>
                {selectedStock.length==0&&<Text 
                style={{paddingRight:20,fontSize:30}}>stock doesn't exist</Text>}
                     </View>
                     <View style={{flexDirection:"row",justifyContent:"center"}}>
                {selectedStock.length!==0&&<Text 
                style={{paddingRight:20,fontSize:30}}>stockPrice: {selectedStock[0].sellPrice}</Text>}
                     </View>
                     <View style={{flexDirection:"row",justifyContent:"center"}}>
                       {selectedStock.length!==0&&<Text 
                       style={{paddingRight:20,fontSize:30}}>stockQuantity: {selectedStock[0].quantity}</Text>}
                   </View>

</View>}
           
            {showPriceAddQuant&&<View style={{flexDirection:"row",justifyContent:"center"}}>
             <Text style={{paddingRight:20,fontSize:30}}>price :</Text>
           <TextInput
            keyboardType="number-pad" 
            onChangeText={(t)=>Setprice(t)}
            placeholder="price" style={{fontSize:30}}/>
            </View>}
            {showBenefit&& <View style={{flexDirection:"row",justifyContent:"center"}}>
             <Text style={{paddingRight:20,fontSize:30}}>benefit :</Text>
           <TextInput
            keyboardType="number-pad" 
            onChangeText={(t)=>setBenefit(t)}
            placeholder="benefit" style={{fontSize:30}}/>
            </View>}
            <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
            <Button title='cancel'
            color={buttonColor}
             onPress={()=>{
                Setchosenmodal(false)
                // Setchosen([])
                // Setproduct([])
                
             }}
            />
            <Button title='OK'
            color={buttonColor}
             onPress={()=>{onAddQuantity()}}
              />
          {/* {selectedStock.length==0&&<Button title='OK'
            color={buttonColor}
             onPress={()=>{Setchosenmodal(false)}}
              />}
          {selectedStock.length!==0&&<Button title='OK'
            color={buttonColor}
             onPress={()=>{onAddQuantity()}}
              />} */}
         
          
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
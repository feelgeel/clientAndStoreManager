import React from 'react';
import { StyleSheet, View } from 'react-native';

function ModChosenListOrder({price,setprice,stockAlert,setstockAlert }) {
return (
<View style={styles.container}>
<View style={{flexDirection:"row",justifyContent:"center"}}>
              
              <Text style={{fontSize:30}}>
              old price  {price} :   </Text>   
                                <TextInput  onChangeText={(t)=>setprice(t)} 
                                // value={Theproduct.stockprice}
                                keyboardType="number-pad"
                                  placeholder="new price" style={{fontSize:30}}/>
                      
     </View>
<View style={{flexDirection:"row",justifyContent:"center"}}>
              
              <Text style={{fontSize:30}}>
              stockAlert  {stockAlert} :   </Text>   
                                <TextInput  onChangeText={(t)=>setstockAlert(t)} 
                                // value={Theproduct.stockprice}
                                keyboardType="number-pad"
                                  placeholder="stockAlert" style={{fontSize:30}}/>
                      
     </View>
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ModChosenListOrder;
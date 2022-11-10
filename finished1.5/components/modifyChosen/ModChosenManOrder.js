import React from 'react';
import { StyleSheet, View } from 'react-native';

function ModChosenManOrder({price,setprice,benefit,setbenefit,
    stockAlert,setstockAlert,perimationDate,setperimationDate,
    perimationAlert,setperimationAlert
}) {
return (
<View>

{/*                                 byuPrice                       */}
<View style={{flexDirection:"row",justifyContent:"center"}}>
 <Text style={{paddingRight:20,fontSize:30}}>byuPrice :{price}</Text>
<TextInput
keyboardType="number-pad" 
onChangeText={(t)=>setprice(t)}
placeholder="price" style={{fontSize:30}}/>
</View>
{/*                                 benefit                       */}
<View style={{flexDirection:"row",justifyContent:"center"}}>
<Text style={{paddingRight:20,fontSize:30}}>benefit :{benefit}</Text>
<TextInput
keyboardType="number-pad" 
onChangeText={(t)=>setbenefit(t)}
placeholder="benefit" style={{fontSize:30}}/>
</View>
{/*                                 stock alert                       */}
<View style={{flexDirection:"row",justifyContent:"center"}}>
<Text style={{paddingRight:20,fontSize:30}}>stockAlert :{stockAlert}</Text>
<TextInput
keyboardType="number-pad" 
onChangeText={(t)=>setstockAlert(t)}
placeholder="stockAlert" style={{fontSize:30}}/>
</View>
 {/*                                 perimation date                       */}
          <View style={{flexDirection:"row",justifyContent:"center"}}>
            <Text style={{paddingRight:20,fontSize:30}}>perimationDate :{perimationDate}</Text>
           <TextInput
            keyboardType="number-pad" 
            onChangeText={(t)=>setperimationDate(t)}
            placeholder="perimationDate" style={{fontSize:30}}/>
            </View>
{/*                                 perimation date alert                       */}
            <View style={{flexDirection:"row",justifyContent:"center"}}>
            <Text style={{paddingRight:20,fontSize:30}}>primationAlert :{perimationAlert}</Text>
           <TextInput
            keyboardType="number-pad" 
            onChangeText={(t)=>setperimationAlert(t)}
            placeholder="primationAlert" style={{fontSize:30}}/>
            </View>
 <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
    
  </View>
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ModChosenManOrder;
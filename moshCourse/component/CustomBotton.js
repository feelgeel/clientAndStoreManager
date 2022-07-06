import React from 'react';
import { StyleSheet, View,Text,TouchableOpacity } from 'react-native';
import colors from '../config/colors';

function CustomBotton({title,onPress,color="primary"}) {
return (

<TouchableOpacity 
style={[styles.container,{backgroundColor:colors[color]}]}
onPress={()=>onPress()}
>
<Text style={styles.text}>{title}</Text>
</TouchableOpacity>
 );
}
const styles = StyleSheet.create({
container:{
backgroundColor:colors.primary,
borderRadius:25,
justifyContent:"center",
alignItems:"center",
padding:15,
width:"100%",
marginVertical:10
},

text:{
    color:colors.white,
    fontSize:18,
    textTransform:"uppercase",
    fontWeight:"bold"
}
})
export default CustomBotton;
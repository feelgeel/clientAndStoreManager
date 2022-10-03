import React from 'react';
import { StyleSheet, View,TextInput } from 'react-native';
import  {MaterialCommunityIcons} from "@expo/vector-icons"
import colors from '../config/colors';


function C_TextInput({icon,...otherProps}) {
return (
<View style={styles.container}>
 {icon && <MaterialCommunityIcons 
 size={30} 
 name={icon}
 color={colors.medium}
 style={styles.icon}
  />}
 <TextInput style={styles.TextInput} {...otherProps}/>
</View>
 );
}
const styles = StyleSheet.create({
container:{
backgroundColor: colors.light,
borderRadius:25,
flexDirection: "row",
width:"90%",
padding:15,
marginVertical: 10,
marginHorizontal: 30,
alignItems: "center",
// justifyContent: "space-around",
},
TextInput:{
  fontSize: 18,  
},
icon:{
  padding:10

}
})
export default C_TextInput;
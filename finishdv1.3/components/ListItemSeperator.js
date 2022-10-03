import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from "../config/colors"
function ListItemSeperator({children,style}) {
return (
<View style={styles.container}>

</View>
 );
}
const styles = StyleSheet.create({
container:{
width: "100%",
height: 1,
backgroundColor: Colors.light,
}
})
export default ListItemSeperator;
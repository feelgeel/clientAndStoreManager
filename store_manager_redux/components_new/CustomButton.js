import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomColors from "../config/colors";
function CustomButton({title,onPress,color="primary"}) {
    return (
        <TouchableOpacity 
        style={
        [styles.button,
            {backgroundColor:CustomColors[color]}]}
         onPress={onPress}>
            <Text style={styles.text}>
                {title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button:{
       backgroundColor:CustomColors.primary,
      borderRadius:25,
      justifyContent:"center",
      alignItems:"center",
      width:"100%",
      padding:15,
      marginVertical:10,
    },
    text:{
        color:CustomColors.white,
        fontSize:18,
        textTransform:"uppercase",
        fontWeight:"bold"
    }
})
export default CustomButton;
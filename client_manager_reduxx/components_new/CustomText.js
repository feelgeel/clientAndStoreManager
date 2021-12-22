import React from 'react';
import { StyleSheet, Text } from 'react-native';

import defaultStyle from "../config/styles";
function CustomText({ children,style,...otherProps }) {
    return (
        <Text 
        style={[defaultStyle.text,style]}
         {...otherProps}>
          {children}
        </Text>
    );
}
const styles = StyleSheet.create({
    text:{
    //    color:"black",
       fontSize:18,
       fontFamily:Platform.OS==="android"?"Roboto":"Avenir"
    }
})
export default CustomText;
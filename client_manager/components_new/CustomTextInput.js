import React from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import CustomScreen from './CustomScreen';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import CustomColors from '../config/colors';
import defaultStyle from "../config/styles";
function CustomTextInput({icon,placeholder,customwidth="100%",...otherProps}) {
    return (
        <View style={[styles.container,{width:customwidth}]}>
           {icon&& <MaterialCommunityIcons
            name={icon}
            size={30}
            style={styles.icon}
            color={CustomColors.medium}
            />}
            <TextInput
            placeholderTextColor={CustomColors.medium}
            {...otherProps}
             placeholder={placeholder}
             style={defaultStyle.text}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:CustomColors.light,
        borderRadius:25,
        flexDirection:"row",
        padding:15,
        marginVertical:10

    },
    icon:{
        marginRight:10,
        
    },
    textInput:{
        color:CustomColors.dark,
        fontSize:18,
        fontFamily:Platform.OS==="android"?"Roboto":"Avenir",

    }
})
export default CustomTextInput;
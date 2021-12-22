import React from 'react';
import { StyleSheet, View } from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons"
function CustomIcone({name,
                    size=40,
                    backgroundColor="black",
                    color="white"}) {
    return (
        <View style={{
            width:size,
            height:size,
            borderRadius:size/2,
            backgroundColor,
            justifyContent:"center",
            alignItems:"center"
        }}>
            <MaterialCommunityIcons
             name={name}
             color={color}
             size={size*0.5}/>
        </View>
    );
}
const styles = StyleSheet.create({
  
})
export default CustomIcone;
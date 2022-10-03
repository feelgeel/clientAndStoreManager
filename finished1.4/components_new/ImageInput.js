import React, { useEffect } from 'react';
import { Alert, Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import CustomColors from '../config/CustomColors';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
function ImageInput({imageUri,onChangeImage}) {
    const requestPermition=async()=>{
        const {granted}=ImagePicker.requestCameraPermissionsAsync();
        if(!granted) alert("u need perm")
    }
    useEffect(()=>{
        // requestPermition()
    },[]);
    const handlepress=()=>{
        if(!imageUri) selectImage();
        else Alert.alert("delete","are  u sure",[
            {text:"yes",onPress:()=>onChangeImage(null)},
            {text:"no"},
        ])
    }
    const selectImage=async()=>{
        try {
          const result=await ImagePicker.launchImageLibraryAsync();
          if(!result.cancelled)
            onChangeImage(result.uri)
          result.c
        } catch (error) {
          console.log(error);
        }
        
    }
return (
    <TouchableWithoutFeedback onPress={handlepress}>

        <View style={styles.container}>
            {!imageUri&&(<MaterialCommunityIcons
            color={CustomColors.medium} name="camera"
            // style={{}}
            size={40}
            />)}
            {imageUri&&(<Image source={{uri:imageUri}} 
            style={styles.image}
            />)}
        </View>
    </TouchableWithoutFeedback>
 );
}
const styles = StyleSheet.create({
container:{
    alignItems:"center",
    backgroundColor:CustomColors.light,
    height:100,
    width:100,
    borderRadius:15,
    justifyContent:"center",
    overflow:"hidden"
},
image:{
  width:"100%",
  height:"100%"
}
})
export default ImageInput;
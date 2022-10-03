import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import *as ImagePicker from "expo-image-picker"
import *as Permissions from "expo-permissions"
import C_Button from '../components/C_Button';
import Screen from '../components/Screen';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ImageInput from '../components/ImageInput';

function ImgPlay({children,style}) {
    [imageUri,setimageUri]=useState("")
    const imgPermition=async()=>{
        const {granted}=await ImagePicker.requestCameraRollPermissionsAsync()
        if(!granted){
            alert("you need permition")
        }
    
    }
    const selectImage=async()=>{
        const result=await ImagePicker.launchCameraAsync()
        console.log(result)
    
    }
 const getImage=(img)=>{
    setimageUri(img)
    //  console.log(img)
 
 }
    useEffect(()=>{
        imgPermition()
    },[])
return (
<Screen style={styles.container}>
<ImageInput 
onChangeImage={getImage}
imageUri={imageUri}
/>
</Screen>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ImgPlay;
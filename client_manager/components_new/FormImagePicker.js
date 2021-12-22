import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ErrMessage from './ErrMessage';
import InputImageList from './InputImageList';

function FormImagePicker({name}) {
    const {setFieldTouched,handleChange,setFieldValue,
        errors,touched,values}=useFormikContext();
        const imgUri=values.[name]
 const handleAdd=(uri)=>{
     setFieldValue(name,[...imgUri,uri])
       }
     const   handleRemove=(uri)=>{
        setFieldValue(name,imgUri.filter(imageUri=>imageUri!==uri))
       }
return (
<View style={styles.container}>
    <InputImageList 
    imageUris={imgUri}
    onAddImage={handleAdd}
    onremoveImage={handleRemove}
    />
    <ErrMessage visible={touched[name]}
    err={errors[name]}
    />
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default FormImagePicker;
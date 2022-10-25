import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFormikContext } from 'formik';
import C_ErrorMessage from './C_ErrorMessage';
import C_TextInput from './C_TextInput';
import *as formikPropsActions from '../redux/FormikProps';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
function C_FormField({name,...otherProps}) {
    const dispatch=useDispatch();
    const {setFieldTouched,handleChange,errors,touched,getFieldProps}=useFormikContext()
    let getProps=getFieldProps()
    getProps=getProps.value;
    const formikProps=useSelector(state=>state.entities.formikProps)
    dispatch(formikPropsActions.changeFormikProps(getProps));
    // console.log("getFieldProps",listNames)
return (
<View style={styles.container}>
<C_TextInput
onChangeText={handleChange(name)}
onBlur={() => setFieldTouched(name)}
{...otherProps}
/>
{<C_ErrorMessage 
 error={errors[name]} 
 visible={touched[name]}/>}
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default C_FormField;
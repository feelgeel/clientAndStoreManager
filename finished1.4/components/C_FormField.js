import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFormikContext } from 'formik';
import C_ErrorMessage from './C_ErrorMessage';
import C_TextInput from './C_TextInput';

function C_FormField({name,...otherProps}) {
    const {setFieldTouched,handleChange,errors,touched}=useFormikContext()
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
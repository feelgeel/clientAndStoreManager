import React from 'react';
import { useFormikContext } from 'formik';
import { StyleSheet, View } from 'react-native';
import C_Button from './C_Button';

function C_SubmitButton({title}) {
const {handleSubmit}=useFormikContext()

return (
<C_Button title={title} onPress={handleSubmit}/>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default C_SubmitButton;
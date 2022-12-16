import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from "yup"
import C_Form from '../C_Form';
import C_FormField from '../C_FormField';
import C_SubmitButton from '../C_SubmitButton';
import { useFormikContext } from 'formik';
const listOrderValidSchema = Yup.object().shape({
    quantity: Yup.number().required().label("quantity"),
  })
function FormClient({setquantity,onAddQuantity}) {
  const {values}=useFormikContext()
  // console.log("FormClient values",values)
return (
<View style={styles.container}>
<C_Form
    initialValues={{quantity:""}}
    onSubmit={(values)=>{
      setquantity(values.quantity)
      onAddQuantity(values)
    }}
    validationSchema={listOrderValidSchema}
    >
    <C_FormField
        name="quantity"
        //  icon="email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="number-pad"
        placeholder="qunatity"
        />
    <C_SubmitButton title='submit' />
    </C_Form>
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default FormClient;
import React from 'react';
import { StyleSheet, View } from 'react-native';
import C_DatePicker from '../C_DatePicker';
import C_Form from '../C_Form';
import C_FormField from '../C_FormField';
import C_SubmitButton from '../C_SubmitButton';
import * as Yup from "yup"
const selfServingValidSchema = Yup.object().shape({
    quantity: Yup.number().required().label("quantity"),
    ByuPrice: Yup.number().required().label("ByuPrice"),
    perimationDate: Yup.string().required().label("perimationDate"),
    stockAlert: Yup.number().required().label("stockAlert"),
    perimationAlert: Yup.number().required().label("perimationAlert"),
  })
function FormSelfServe({setquantity,onAddQuantity}) {
return (
<View style={styles.container}>
<C_Form
           initialValues={{
             quantity:"",
             ByuPrice:"",
             stockAlert:"",
              perimationDate:"",
             perimationAlert:""
            }}
           onSubmit={(values)=>{
             setquantity(values.quantity)
             onAddQuantity(values)
           }}
           validationSchema={selfServingValidSchema}
           >
           <C_FormFieldld
               name="quantity"
               //  icon="email"
               autoCapitalize="none"
               autoCorrect={false}
               keyboardType="number-pad"
               placeholder="qunatity"
               />
            <C_FormField
             name="ByuPrice"
            //  icon="email"
             autoCapitalize="none"
             autoCorrect={false}
             keyboardType="number-pad"
             placeholder="ByuPrice"
             />
             <C_FormField
             name="stockAlert"
            //  icon="email"
             autoCapitalize="none"
             autoCorrect={false}
             keyboardType="number-pad"
             placeholder="stockAlert"
             />
         <C_DatePicker
             name="perimationDate"
             />
         <C_FormField
             name="perimationAlert"
            //  icon="email"
             autoCapitalize="none"
             autoCorrect={false}
             keyboardType="number-pad"
             placeholder="perimationAlert"
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
export default FormSelfServe;
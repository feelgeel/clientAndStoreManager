import React, { useState } from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import C_DatePicker from '../C_DatePicker';
import C_Form from '../C_Form';
import C_FormField from '../C_FormField';
import C_SubmitButton from '../C_SubmitButton';
import * as Yup from "yup"
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';

const manualOrderValidSchema = Yup.object().shape({
    quantity: Yup.number().required().label("quantity"),
    ByuPrice: Yup.number().required().label("ByuPrice"),
    benefit: Yup.number().required().label("benefit"),
    perimationDate: Yup.string().required().label("perimationDate"),
    stockAlert: Yup.number().required().label("stockAlert"),
    perimationAlert: Yup.number().required().label("perimationAlert"),
  })
function AddQuantManOrder({onAddQuantity}) {
    const [formProp,setformprop]=useState({})
    const [calcPrice,setcalcPrice]=useState(0)
    const formikProps=useSelector(state=>state.entities.formikProps.formikProps)
    useEffect(()=>{
        setformprop(formikProps)
        let dabenefit=(formikProps.benefit/100)+1
        setcalcPrice(formikProps.ByuPrice*dabenefit)
    },[formikProps])
    //  const {getFieldProps}=useFormikContext()
    // let getProps=getFieldProps("quantity")
    // console.log("getFieldProps",getProps.value)
    // const {values}=useFormikContext()
    console.log("values",calcPrice)
    return (
        <ScrollView style={styles.container}>
            <C_Form
                initialValues={{
                    quantity: "",
                    ByuPrice: 0,
                    benefit: 0,
                    sell_price: 0,
                    stockAlert: "",
                    perimationDate: "",
                    perimationAlert: ""
                }}
                onSubmit={(values) => {
                    //  setquantity(values.quantity)
                    onAddQuantity(values)
                    //  console.log(values)
                }}
                validationSchema={manualOrderValidSchema}
            >
                <Text>{calcPrice}hello</Text>
               <C_FormField
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
                    name="benefit"
                    //  icon="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    placeholder="benefit"
                />
                <Text style={{fontSize:25}}>calculated price:{calcPrice}</Text>
                
                <C_FormField
                    name="sell_price"
                    //  icon="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    placeholder="sell_price"
                />
                {/* <Text>{values.ByuPrice}</Text> */}
               
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
        
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {

    }
})
export default AddQuantManOrder;
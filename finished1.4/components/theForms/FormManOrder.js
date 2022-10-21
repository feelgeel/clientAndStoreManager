import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import C_DatePicker from '../C_DatePicker';
import C_Form from '../C_Form';
import C_FormField from '../C_FormField';
import C_SubmitButton from '../C_SubmitButton';
import * as Yup from "yup"
const manualOrderValidSchema = Yup.object().shape({
    quantity: Yup.number().required().label("quantity"),
    ByuPrice: Yup.number().required().label("ByuPrice"),
    benefit: Yup.number().required().label("benefit"),
    perimationDate: Yup.string().required().label("perimationDate"),
    stockAlert: Yup.number().required().label("stockAlert"),
    perimationAlert: Yup.number().required().label("perimationAlert"),
  })
function AddQuantManOrder({onAddQuantity}) {
    return (
        <View style={styles.container}>
            <C_Form
                initialValues={{
                    quantity: "",
                    ByuPrice: 0,
                    sell_price: 0,
                    benefit: "",
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
                    name="sell_price"
                    //  icon="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    placeholder="sell_price"
                />
                <Text>hello</Text>
                <C_FormField
                    name="benefit"
                    //  icon="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    placeholder="benefit"
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
    container: {

    }
})
export default AddQuantManOrder;
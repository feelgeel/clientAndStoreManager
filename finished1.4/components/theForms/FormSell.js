import React from 'react';
import { StyleSheet, View } from 'react-native';
import C_Card from '../C_Card';
import C_Form from '../C_Form';
import C_FormField from '../C_FormField';
import C_SubmitButton from '../C_SubmitButton';
import * as Yup from "yup"
const sellValidationSchema = Yup.object().shape({
    quantity: Yup.number().required().label("quantity"),
  })
function FormSell({ onAddQuantity,selectedStock}) {
    return (
        <View style={styles.container}>
            <C_Card
                image={{ uri: selectedStock.image_front_url || "https://unsplash.com/photos/JpTY4gUviJM" }}
                title={"brand: " + selectedStock.brands + " quantity :" + selectedStock.quantity +
                    " gting :" + selectedStock.Gting + "||sellPrice :" + selectedStock.sellPrice}
                onPress={() => onUnselected(item)}
            />
            <C_Form
                initialValues={{
                    quantity: "",
                }}
                onSubmit={(values) => {
                    //  setquantity(values.quantity)
                    onAddQuantity(values)
                    //  console.log(values)
                }}
                validationSchema={sellValidationSchema}
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
    container: {

    }
})
export default FormSell;
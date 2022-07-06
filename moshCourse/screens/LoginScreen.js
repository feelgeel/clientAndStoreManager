import React from 'react';
import { StyleSheet, View,Image} from 'react-native';
import * as Yup from "yup"
import C_FormField from '../component/C_FormField';
import C_SubmitButton from '../component/C_SubmitButton';
import C_Form from '../component/C_Form';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
})
function LoginScreen({children,style}) {
return (
<View >
<Image
style={styles.logo}
source={require("../assets/logo-red.png")}
/>
<C_Form
initialValues={{email:"",password:""}}
onSubmit={(values)=>console.log(values)}
validationSchema={validationSchema}
>
<C_FormField
    name="email"
    icon="email"
    autoCapitalize="none"
    autoCorrect={false}
    keyboardType="email-address"
    placeholder="email"
    />
    <C_FormField
    name="password"
    icon="lock"
    autoCapitalize="none"
    autoCorrect={false}
    textContentType="password"
placeholder="password"
secureTextEntry
    />    
<C_SubmitButton title='submit' />
</C_Form>
</View>
 );
}
const styles = StyleSheet.create({
logo:{
width:80,
height:80,
alignSelf:"center",
marginTop:20
}
})
export default LoginScreen;
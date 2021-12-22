import React, { useContext } from 'react';
import { Image, StyleSheet} from 'react-native';
import CustomScreen from '../components_new/CustomScreen';
import * as Yup from "yup";
import CustomFormField from '../components_new/CustomFormField';
import CustomForm from '../components_new/CustomForm';
import SubmitButton from '../components_new/SubmitButton';
import authApi from "../api/auth";
import ErrMessage from '../components_new/ErrMessage';
import { useState } from 'react';

import listContext from '../list_context/list-context';
import { tokenDecode } from '../utility/jwtDecode';
const validationSchema=Yup.object().shape({
    email:Yup.string().required().email().label("Email"),
    password:Yup.string().required().min(5).label("Password")
})
function LoginScreen(props) {
  const context=useContext(listContext)
const[loginFailed,setloginFailed]=useState(false)
    const handleSubmit=async(data)=>{
            const result=await authApi.login(data);
            if(!result.ok) return setloginFailed(true); 
            setloginFailed(false); 
            await context.setToken(result.data)
            const user_obj=tokenDecode(result.data)
            await context.setUser(user_obj)
            // console.log("data",context.User);
    }
    
    return (
        <CustomScreen>
            <Image
            style={styles.logo}
             source={require("../assets/logo-red.png")} />
             <ErrMessage visible={loginFailed} 
            err="invalid email or pass" />
           <CustomForm
           validationSchema={validationSchema}
           initialValues={
               {
                   email:"",
                   password:"",
               }
           }
           onSubmit={handleSubmit}
           >
              
               <CustomFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                placeholder="Email"
                textContentType="emailAddress"
               />
               <CustomFormField
                 autoCapitalize="none"
                 autoCorrect={false}
                 icon="lock"
                 name="password"
                 placeholder="Password"
                 secureTextEntry
                 textContentType="password"
               />
               <SubmitButton title="Login" />
           </CustomForm>
        </CustomScreen>
    );
}
const styles = StyleSheet.create({
    logo:{
        width:80,
        height:80,
        alignSelf:"center",
        marginTop:50,
        marginBottom:20
    },
    errors:{
        color:"red"
    }
})
export default LoginScreen;
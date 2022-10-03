import React, { useContext } from 'react';
import { Image, StyleSheet} from 'react-native';
import * as Yup from "yup";
// import CustomFormField from '../components_new/CustomFormField';
// import CustomForm from '../components_new/CustomForm';
// import SubmitButton from '../components_new/SubmitButton';
import authApi from "../api/auth";
import { useState } from 'react';
import { tokenDecode } from '../utility/jwtDecode';
import *as userAction from '../redux/users';
import { useSelector, useDispatch } from "react-redux";
const validationSchema=Yup.object().shape({
    email:Yup.string().required().email().label("Email"),
    password:Yup.string().required().min(5).label("Password")
})
function LoginScreen(props) {
  const user=useSelector(state=>state)
  const dispatch=useDispatch();
  console.log(user);
  
const[loginFailed,setloginFailed]=useState(false)
    const handleSubmit=async(data)=>{
        const result=await authApi.login(data);
        if(!result.ok) return setloginFailed(true); 
        setloginFailed(false); 
        await context.setToken(result.data)
        const user_obj=tokenDecode(result.data)
        dispatch(userAction.userloggedIn({...user_obj,token:result.data}))
            await context.setUser(user_obj)
            // console.log("data",context.User);
    }
    
    return (
        // <CustomScreen>
            <Image
            style={styles.logo}
             source={require("../assets/logo-red.png")} />
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
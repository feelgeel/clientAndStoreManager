import React, { useContext, useState } from 'react';
import { StyleSheet, View ,Image} from 'react-native';
import * as Yup from "yup";
// import CustomFormField from '../components_new/CustomFormField';
// import CustomForm from '../components_new/CustomForm';
// import SubmitButton from '../components_new/SubmitButton';
// import CustomScreen from '../components_new/CustomScreen';
// import ErrMessage from '../components_new/ErrMessage';
import {register} from '../api/users';
import {login} from '../api/auth';
import { tokenDecode } from '../utility/jwtDecode';
import *as userAction from '../redux/users';
import configureStore from '../redux/configureStore';
const store=configureStore()
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("firstName"),
  lastName: Yup.string().required().label("lastName"),
  userName: Yup.string().required().label("userName"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  // type: Yup.string().required().label("type"),
});
function RegisterScreen() {
  const [error, setError] = useState();
  const handleSubmit = async (userInfo) => {
    // userInfo.cash=0;
    console.log(userInfo);
      const result = await register(userInfo)
      console.log(result);
      if (!result.ok) {
        if (result.data) setError(result.data.error);
        else {
          setError("An unexpected error occurred.");
          // console.log(result);
        }
        return;
      }
      const loginObj={ 
          email:userInfo.email,
          password:userInfo.password};
          // console.log(loginObj);
      const { data: authToken } = await login(loginObj);
      console.log(authToken)
      // await context.setToken(authToken)
      //       const user_obj=tokenDecode(authToken)
      //       store.dispatch(userAction.userloggedIn({...user_obj,token:authToken}))
      //       await context.setUser(user_obj)
    };
return (
  <Image
  style={styles.logo}
   source={require("../assets/logo-red.png")} />
  

   
)
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
export default RegisterScreen;

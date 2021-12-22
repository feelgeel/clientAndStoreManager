import React, { useContext, useState } from 'react';
import { StyleSheet, View ,Image} from 'react-native';
import * as Yup from "yup";
import CustomFormField from '../components_new/CustomFormField';
import CustomForm from '../components_new/CustomForm';
import SubmitButton from '../components_new/SubmitButton';
import CustomScreen from '../components_new/CustomScreen';
import ErrMessage from '../components_new/ErrMessage';
import user from '../api/users';
import loginApi from '../api/auth';
import listContext from '../list_context/list-context';
import { tokenDecode } from '../utility/jwtDecode';
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("firstName"),
  lastName: Yup.string().required().label("lastName"),
  userName: Yup.string().required().label("userName"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  type: Yup.string().required().label("type"),
});
function RegisterScreen() {
  const context=useContext(listContext)
  const [error, setError] = useState();
  const handleSubmit = async (userInfo) => {
    userInfo.cash=0;
      const result = await user.register(userInfo)
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
      const { data: authToken } = await loginApi.login(loginObj);
      console.log("authtok",authToken);
      await context.setToken(authToken)
            const user_obj=tokenDecode(authToken)
            await context.setUser(user_obj)
    };
return (
  <CustomScreen>
  <Image
  style={styles.logo}
   source={require("../assets/logo-red.png")} />
    <ErrMessage visible={error} 
          err={error} />
 <CustomForm
 validationSchema={validationSchema}
 initialValues={
     {
         firstName:"",
         lastName:"",
         userName:"",
         email:"",
         password:"",
         type:"",
     }
 }
 onSubmit={handleSubmit}
 >
     
     
     <CustomFormField
       autoCorrect={false}
       icon="account"
       name="firstName"
       placeholder="firstName"
     />
     <CustomFormField
       autoCorrect={false}
       icon="account"
       name="lastName"
       placeholder="lastName"
     />
     <CustomFormField
       autoCorrect={false}
       icon="account"
       name="userName"
       placeholder="userName"
     />
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
     <CustomFormField
       autoCorrect={false}
       icon="account"
       name="type"
       placeholder="type"
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
export default RegisterScreen;

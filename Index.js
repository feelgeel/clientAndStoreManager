
import React, {useContext, useEffect, useState } from 'react';
import { StyleSheet,View,TextInput } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import *as userAction from "./finished1.4/redux/users";
import { NavigationContainer} from "@react-navigation/native";
import AuthNavigator from './finished1.4/navigation/AuthNavigator';
import navigationTheme from './finished1.4/navigation/navigationTheme';
import AppNavigator from './finished1.4/navigation/AppNavigator';
import FormManOrder from './finished1.4/components/theForms/FormManOrder';
import GrossNavigator from './finished1.5/navigation/GrossNavigator';

export default function Index() {

    // const dispatch=useDispatch();
    // const user=useSelector(state=>state.entities.users.list)
  const savedtoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTgxODI2ZmZjZGJhODE5NjRmZmJhYjciLCJlbWFpbCI6ImNpc2NvQGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiY2lzY2RhYmVzdCIsImNhc2giOjAsImlhdCI6MTYzNTg3NzQ4N30.BSy4caxsfYcnwt6hDw__KN38UO1uxy6fZd8YYz5jUv0"
//   const savedUSer=
//   {userId: "6181826ffcdba81964ffbab7",
//   email: "cisco@gmail.com",
//   userName: "ciscoDabest",
//   cash: 5000,
//   iat: 1628504935,
//   mode:"store",
//   gender:"female"
// }
  const savedUSer=
  {userId: "625afc18923af92368524f40",
  email: "cisco@gmail.com",
  userName: "ciscoDabest",
  cash: 5000,
  iat: 1628504935,
  mode:"store",
  gender:"male"
}


    // const tempLogin=async(token,user)=>{
    //   dispatch(userAction.userloggedIn({...user,token}))
    // }
    // const [category,setcategory]=useState()
    // useEffect(()=>{
    //   tempLogin(savedtoken,savedUSer)
    // },[])
    // const categories=[
    //   {label:"milk",_id:1},
    //   {label:"sugar",_id:2},
    //   {label:"coffee",_id:3}
    // ]
  return(
    // <FormManOrder/>
         <NavigationContainer theme={navigationTheme}>
          <GrossNavigator/>
         {/* {user?<GrossNavigator/>:<AuthNavigator/>}  */}
     </NavigationContainer> 
       
  
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor:"#f8f4f4",
    // padding:20,
    // paddingTop:100
  
  },
});

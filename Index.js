
import React, {useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer} from "@react-navigation/native";
import navigationTheme from './client_manager_redux_v1/navigation/navigationTheme';
import AppNavigator from './client_manager_redux_v1/navigation/AppNavigator';
import AuthNavigator from './client_manager_redux_v1/navigation/AuthNavigator';
import listContext from './client_manager_redux_v1/list_context/list-context';
import Screen from './client_manager_redux_v1/components/Screen';
import AddGtingsScreen from './client_manager_redux_v1/screens/AddGtingsScreen';
import AddGtingsScreen1 from './client_manager_redux_v1/screens/AddGtingsScreen.1';
import ListFilter from './client_manager_redux_v1/components/lists/ListFilter';
import ListChoosingScreen from './client_manager_redux_v1/screens/ListChoosingScreen';
import { useSelector, useDispatch } from "react-redux";
import *as userAction from './client_manager_redux_v1/redux/users';


// store.dispatch(bugsAction.addBug({description:"bug5"}))
/*
transaction={
    _id:"dzzeerg56ef5",
    prodId:"dydkkubl,dffu4772f5",
    price:20,
    quantity:2,
    store:grossery,
    buyerId:"hydkd152fhy,schhc",
    sellerId:"hrydjof45ijg75",
    categ:"milk",
}
list={
    _id:"fjjf45fhykvifh",
    listName:"grossery",
    userId:"jd45vukdh",
    mode:"client"
}
prod={
    _id:"fhkdsvh85vue",
    productId:"hfdtjksf484f"
    listId:"hfyj815",
    userId:"jvjds4855dvhyd"
    quantity:5,
    status:"true",
    modes:"client",
}
*/ 
export default function Index() {

    const dispatch=useDispatch();
    const user=useSelector(state=>state.entities.users.list)
  // const context=useContext(listContext)
  // const token=context.Token;
  const savedtoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTgxODI2ZmZjZGJhODE5NjRmZmJhYjciLCJlbWFpbCI6ImNpc2NvQGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiY2lzY2RhYmVzdCIsImNhc2giOjAsImlhdCI6MTYzNTg3NzQ4N30.BSy4caxsfYcnwt6hDw__KN38UO1uxy6fZd8YYz5jUv0"
  const savedUSer=
  {userId: "6181826ffcdba81964ffbab7",
  email: "cisco@gmail.com",
  userName: "ciscoDabest",
  cash: 0,
  iat: 1628504935,
  mode:"store"
}
// store.dispatch(()=>{
//   if(!list.userId){
//     store.dispatch(usersAction.userloggedIn({...savedUSer,token}))

//   }
// })


    const tempLogin=async(token,user)=>{
      // await context.setToken(token)
      // await context.setUser(user)
      dispatch(userAction.userloggedIn({...user,token}))
      
    }
    // console.log("token",context.Token);
    // console.log("User",context.User);
    useEffect(()=>{
      tempLogin(savedtoken,savedUSer)
    },[])
  return(
    // <Screen>
    //  <AddGtingsScreen1/>
    // </Screen>
        <NavigationContainer theme={navigationTheme}>
            {user?<AppNavigator/>:<AuthNavigator/>}
        </NavigationContainer>
       
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"red"
  
  },
});

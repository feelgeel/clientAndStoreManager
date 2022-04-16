import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import queryStringFunc from "../utility/queryStringFunc";
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"client_listNames",
     initialState:{
        list: [],
        theList:{},
        theProd:{},
        listproducts:[],
        transMode:'modeScreen',
        loading:false,
        lastFetch:null
        },
     reducers:{
         loadListNames:(listName,action)=>{
             console.log("listname added",action.payload);
             
             listName.list=action.payload
            //  return listName
        },
         setlistProds:(listName,action)=>{
            //  console.log("listname added",action.payload);
             listName.listproducts.push(action.payload)
            //  return listName
        },
         setlistProd1:(listName,action)=>{
            //  console.log("listname added",action.payload);
             listName.listproducts=action.payload
            //  return listName
        },
         setTransMode:(listName,action)=>{
             console.log("listname added",action.payload);
             
             listName.transMode=action.payload
            //  return listName
        },
         setTheListName:(listName,action)=>{
            //  console.log("listname added",action.payload);
             
             listName.theList=action.payload
            //  return listName
        },
         setTheproduct:(listName,action)=>{
            //  console.log("listname added",action.payload);
             
             listName.theProd=action.payload
            //  return listName
        },
         addListName:(listName,action)=>{
             console.log("listname added",action.payload);
             
             listName.list.push(action.payload)
            //  return listName
        },
         editListName:(listName,action)=>{
             console.log("listname added",action.payload);
             
             listName.list=action.payload
            //  return listName
        },
        loginRequested:(user,action)=>{
            user.loading=true;
            
        },
        loginFailed:(user,action)=>{
            user.loading=false;
            
        },
          userRegistered:(user,action)=>{
             user.list=action.payload
         },
         registerRequested:(user,action)=>{
            user.loading=true;
            
        },
        registerFailed:(user,action)=>{
            user.loading=false;
            
        },
     }
 })

export default  slice.reducer;
export const {loadListNames,setlistProd1,setTheproduct,setlistProds,addListName,editListName,setTransMode,setTheListName,userRegistered,loginRequested,loginFailed,registerRequested,registerFailed}=slice.actions;
export const loginUser=userData=>
{
    const newData=queryStringFunc(userData)

    return actions.apiCallBegan({
    url:"/auth",
    method:"post",
    data:newData,
    headers:{"Content-Type": "application/x-www-form-urlencoded" },
    onStart:loginRequested.type,
    onError:loginFailed.type,
    onSuccess:userloggedIn.type,
    })
}
export const registerUser=userData=>{
    const newData=queryStringFunc(userData)
    console.log(newData);
    
    return actions.apiCallBegan({
    url:"/users",
    method:"post",
    data:newData,
    headers:{"Content-Type": "application/x-www-form-urlencoded" },
    onStart:registerRequested.type,
    onError:registerFailed.type,
    onSuccess:userRegistered.type,
    })}
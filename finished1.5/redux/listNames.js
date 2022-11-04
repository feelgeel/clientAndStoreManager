import {createSlice } from "@reduxjs/toolkit";

 //create slice
 const slice=createSlice({
     name:"listNames",
     initialState:{
        list: [],
        theList:{},
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
        registerFailed:(user ,action)=>{
            user.loading=false;
            
        },
     }
 })

export default  slice.reducer;
export const {loadListNames,addListName,editListName,
    setTransMode,setTheListName,userRegistered,loginRequested,
    loginFailed,registerRequested,registerFailed}=slice.actions;

import {createSlice } from "@reduxjs/toolkit";
 //create slice
 const slice=createSlice({
     name:"client_products",
     initialState:{
        list: [],
        theList:{},
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
       
     }
 })

export default  slice.reducer;
export const {loadListNames,setlistProds}=slice.actions;

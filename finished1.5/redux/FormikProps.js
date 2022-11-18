import {createSlice } from "@reduxjs/toolkit";



 //create slice
 const slice=createSlice({
     name:"formik props",
     initialState:{
        formikProps:{},
        },
     reducers:{
         changeFormikProps:(listName,action)=>{
             listName.formikProps=action.payload
        },
         
        
     }
 })

export default  slice.reducer;
export const {changeFormikProps}=slice.actions;

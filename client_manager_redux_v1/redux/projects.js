import { createSlice } from "@reduxjs/toolkit";
let lastId=0;
const slice=createSlice({
    name:"projects",
    initialState:[],
    reducers:{
        projAdded:(projs,action)=>{
           projs.push({
               id:++lastId,
               name:action.payload.name,
           })
       },
       projremoved:(projs,action)=>{
           projs.filter(proj=>proj.id!==action.payload.id)
       },
       
    }
})
export default  slice.reducer;
export const {projAdded,projremoved}=slice.actions;
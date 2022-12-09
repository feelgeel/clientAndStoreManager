import {createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import *as actions from './api';
import moment from 'moment';
 let lastId=0;


 //create slice
 const slice=createSlice({
     name:"bugs",
     initialState:{
        list: [],
        loading:false,
        lastFetch:null
        },
     reducers:{
         bugsReceived:(bugs,action)=>{
         bugs.list=action.payload;
         bugs.loading=false;
         bugs.lastFetch=Date.now();
        //  return bugs;
        },
         bugsRequested:(bugs,action)=>{
                bugs.loading=true;
            
        },
         bugsRequestedFailed:(bugs,action)=>{
                bugs.loading=false;
            
        },
        bugAssigned:(bugs,action)=>{ 
            const {id,userId}=action.payload;
            // console.log("bugs payload",userId);
            const index=bugs.list.findIndex(bug=>bug.id==id)
            bugs.list[index].userId=userId
        },
         bugAdded:(bugs,action)=>{
            bugs.list.push(action.payload)
        },
        bugRemoved:(bugs,action)=>{
            const index=bugs.findIndex(bug=>bug.id==action.payload.id)
            
           return bugs.list.splice(0,index)
            console.log(trv);
            // bugs.filter(bug=>bug.id!==action.payload.id)
        },
        bugResolved:(bugs,action)=>{
            const index=bugs.list.findIndex(bug=>bug.id==action.payload.id)
            bugs.list[index].resolved=true;
         },
     }
 })

export default  slice.reducer;
 const {
    bugAdded,bugRemoved,
    bugResolved,bugAssigned,
    bugsReceived,bugsRequested,
    bugsRequestedFailed,
}=slice.actions;
const url="/bugs";

export const loadBugs=()=>(dispatch,getState)=>{
const {lastFetch}=getState().entities.bugs;
const diffinminutes=moment().diff(moment(lastFetch),"minutes");
// console.log(lastFetch);

if(diffinminutes<10) return;
dispatch(

    actions.apiCallBegan({
        url,
        onStart:bugsRequested.type,
        onError:bugsRequestedFailed.type,
        onSuccess:bugsReceived.type,
        // onError:actions.apiCallFailed.type
    })
    )
}
export const addBug=bug=>actions.apiCallBegan({
url,
method:"post",
data:bug,
// onStart:bugsRequested.type,
// onError:bugsRequestedFailed.type,
onSuccess:bugAdded.type,
})
export const resolveBug=id=>actions.apiCallBegan({
url:url+"/"+id,
method:"patch",
data:{resolved:true},
// onStart:bugsRequested.type,
// onError:bugsRequestedFailed.type,
onSuccess:bugResolved.type,
})
export const assignAbug=(bugId,userId)=>actions.apiCallBegan({
url:url+"/"+bugId,
method:"patch",
data:{userId},
// onStart:bugsRequested.type,
// onError:bugsRequestedFailed.type,
onSuccess:bugAssigned.type,
})
export  const getUnresolvedbugs=createSelector(
state=>state.entities.bugs,
bugs=>bugs.filter(bug=>!bug.resolved)
);

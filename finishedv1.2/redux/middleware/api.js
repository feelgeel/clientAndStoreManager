// import axios from 'axios';
// import *as actions from '../api';
// import *as bugsAction from '../bugs';
// import authApi from "../../api/auth";
// const action={
//     type:"apiCallBegan",
//     payload:{
//         url:"/bugs",
//         method:"get",
//         data:{},
//         onSuccess:"bugsReceived",
//         onError:"apirequestfailed"
//     }
// }
// const api=param=>({dispatch,getState})=>next=>async action=>{
//     if(action.type!==actions.apiCallBegan.type)return next(action)
    
//     const {url,method,data,onError,onSuccess,onStart,headers}=action.payload;
//     {onStart&&dispatch({type:onStart})}
    
//     next(action)
//     // const result=await authApi.login(data);
//     // if(!result.ok) return setloginFailed(true); 
// try {
//     const response= await axios.request({
//         baseURL:"http://localhost:9000/api",
//         url,
//         headers,
//         method,
//         data
//     });
//     dispatch(actions.apiCallSuccess(response.data))
//    {onSuccess&& dispatch({type:onSuccess,payload:response.data})}
// } catch (error) {
//     console.log(error);
    
//     dispatch(actions.apiCallFailed(error.message))
//     {onError && dispatch({type:onError,payload:error.message})}
// }
// // console.log(url);  

// }
// export default api
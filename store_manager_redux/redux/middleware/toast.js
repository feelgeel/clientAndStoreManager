import  {userAdded} from '../users';
const toast=param=>({dispatche,getState})=>next=>action=>{
// if(action.type===userAdded.type){
//     const list=getState().entities.users.list
    // console.log(getState().entities.users.list)
// if(list.userId) return next(action);

// if(getState().entities.users.list) console.log()
// }
// console.log("tostified",getState())
next(action)
}
export default toast
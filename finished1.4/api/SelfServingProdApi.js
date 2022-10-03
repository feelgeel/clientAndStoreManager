import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";


let endPoint="/self_serving_prod"

export const addSelfServingProd=(data)=>{
    const newData=queryStringFunc(data)
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
}
export const getSelfServingProd=(listId)=>{
    return Client.get(endPoint+"/"+listId);
}
export const updateSelfServingProd=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const removeSelfServingProd=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete(endPoint+"/remove/"+id);

}
import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";

let endPoint="/products"


export const addProducts=(data)=>{
    const newData=queryStringFunc(data)
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
}
export const loadProducts=(listId)=>{
    return Client.get(endPoint+"/"+listId);
}
export const updateProducts=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const removeProducts=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.put(endPoint+"/remove/"+id);

}
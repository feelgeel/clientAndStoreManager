import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";

let endPoint="/st_products"


export const storeAddProducts=(data)=>{
    const newData=queryStringFunc(data)
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
}
export const storeLoadProducts=(listId)=>{
    return Client.get(endPoint+"/"+listId);
}
export const storeUpdateProducts=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const storeRemoveProducts=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.put(endPoint+"/remove/"+id);

}
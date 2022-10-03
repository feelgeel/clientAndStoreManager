import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";

let endPoint="/client_products"

export const clientAddProduct=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const clientLoadProducts=(userId,listId)=> {
    // const newData=queryStringFunc(data)
    return Client.get(endPoint+"/"+userId+"/"+listId);

}
export const clientLoadOneProduct=(userId,listId,productId)=> {
    // const newData=queryStringFunc(data)
    return Client.get(endPoint+"/"+userId+"/"+listId+"/"+productId);

}
export const clientUpdateproduct=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
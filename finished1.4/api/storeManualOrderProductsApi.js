import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";

let endPoint="/st_man_order_products"


export const AddManualorderProd=(data)=>{
    const newData=queryStringFunc(data)
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
}
export const storeLoadProducts=(listId)=>{
    return Client.get(endPoint+"/"+listId);
}
export const UpdateManualorderProd=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const RemoveManualorderProd=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete(endPoint+"/remove/"+id);

}
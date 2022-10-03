import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";


let endPoint="/st_order_products"

export const AddOrderProd=(data)=>{
    const newData=queryStringFunc(data)
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
}
export const storeListProducts=(listId)=>{
    return Client.get(endPoint+"/"+listId);
}
export const UpdateListOrderProd=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const RemoveListOrderProd=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete(endPoint+"/remove/"+id);

}
import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";



export const AddOrderProd=(data)=>{
    const newData=queryStringFunc(data)
    return Client.post("/st_order_products",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
}
export const storeListProducts=(listId)=>{
    return Client.get("/st_order_products/"+listId);
}
export const UpdateListOrderProd=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put("/st_order_products/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const RemoveListOrderProd=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete("/st_order_products/remove/"+id);

}
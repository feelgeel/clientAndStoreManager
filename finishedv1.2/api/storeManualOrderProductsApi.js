import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";



export const AddManualorderProd=(data)=>{
    const newData=queryStringFunc(data)
    return Client.post("/st_man_order_products",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
}
export const storeLoadProducts=(listId)=>{
    return Client.get("/st_man_order_products/"+listId);
}
export const UpdateManualorderProd=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put("/st_man_order_products/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const RemoveManualorderProd=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete("/st_man_order_products/remove/"+id);

}
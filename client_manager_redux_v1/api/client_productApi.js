import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";
export const clientAddProduct=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post("/client_products",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const clientLoadProducts=(userId,listId)=> {
    // const newData=queryStringFunc(data)
    return Client.get("/client_products/"+userId+"/"+listId);

}
export const clientLoadOneProduct=(userId,listId,productId)=> {
    // const newData=queryStringFunc(data)
    return Client.get("/client_products/"+userId+"/"+listId+"/"+productId);

}
export const clientUpdateproduct=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put("/client_products/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const storeRemoveproduct=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete("/product/"+id);

}
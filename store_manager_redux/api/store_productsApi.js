import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";



export const storeAddProducts=(data)=>{
    const newData=queryStringFunc(data)
    return Client.post("/st_products",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
}
export const storeLoadProducts=(listId)=>{
    return Client.get("/st_products/"+listId);
}
export const storeUpdateProducts=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put("/st_products/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const storeRemoveProducts=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.put("/st_products/remove/"+id);

}
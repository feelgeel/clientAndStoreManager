import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";



export const addProducts=(data)=>{
    const newData=queryStringFunc(data)
    return Client.post("/products",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
}
export const loadProducts=(listId)=>{
    return Client.get("/products/"+listId);
}
export const updateProducts=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put("/products/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const removeProducts=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.put("/products/remove/"+id);

}
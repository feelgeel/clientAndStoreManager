import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";


let endPoint="/sell_products"

// const register = (userInfo) => client.post("/users", userInfo,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
export const addProductSell=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post(endPoint,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const loadSellListNames=(userId)=> {
    // const newData=queryStringFunc(data)
    return Client.get(endPoint+"/"+userId);

}
export const updateListNames=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const removeListNames=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete(endPoint+"/"+id);

}

import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";
// const register = (userInfo) => client.post("/users", userInfo,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
export const addProductSell=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post("/sell_products",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const loadSellListNames=(userId)=> {
    // const newData=queryStringFunc(data)
    return Client.get("/sell_listNames/"+userId);

}
export const updateListNames=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put("/sell_listNames/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const removeListNames=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete("/sell_listNames/"+id);

}

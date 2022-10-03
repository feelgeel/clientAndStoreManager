import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";
// const register = (userInfo) => client.post("/users", userInfo,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
export const addListOrder=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post("/st_order_list",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const loadListNames=(userId)=> {
    // const newData=queryStringFunc(data)
    return Client.get("/st_order_list/"+userId);

}
export const updateListOrder=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put("/st_order_list/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const removeListOrder=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete("/st_order_list/"+id);

}

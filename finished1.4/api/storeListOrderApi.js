import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";

let endPoint="/st_order_list"

// const register = (userInfo) => client.post("/users", userInfo,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
export const addListOrder=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const loadListNames=(userId)=> {
    // const newData=queryStringFunc(data)
    return Client.get(endPoint+"/"+userId);

}
export const updateListOrder=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const removeListOrder=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete(endPoint+"/"+id);

}

import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";
// const register = (userInfo) => client.post("/users", userInfo,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
export const addListNameSell=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post("/sell_listNames",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const loadListNames=(userId)=> {
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

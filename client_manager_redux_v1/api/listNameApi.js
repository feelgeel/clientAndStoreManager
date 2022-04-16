import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";
// const register = (userInfo) => client.post("/users", userInfo,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
export const addListName=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post("/listNames",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const loadListNames=(userId)=> {
    // const newData=queryStringFunc(data)
    return Client.get("/listNames/"+userId);

}
export const updateListNames=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put("/listNames/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const removeListNames=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete("/listNames/"+id);

}

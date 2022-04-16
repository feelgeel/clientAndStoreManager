import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";
// const register = (userInfo) => client.post("/users", userInfo,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
export const register=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post("/users",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const updateProducts=(id,obj)=> {
    // const newData=queryStringFunc(data)
    return Client.put("/products/"+id,obj);

}
export const removeProducts=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete("/products/"+id);

}
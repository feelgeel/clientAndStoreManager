import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";
// const register = (userInfo) => client.post("/users", userInfo,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
export const register=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post("/users",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const updateUser=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put("/users/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const getAUser=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.get("/users/"+id);

}
export const removeProducts=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete("/products/"+id);

}
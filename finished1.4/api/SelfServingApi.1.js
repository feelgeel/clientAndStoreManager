import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";
let endPoint="/self_serving"

// const register = (userInfo) => client.post("/users", userInfo,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
export const addSelfservingList=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const loadSelfServingList=(userId)=> {
    // const newData=queryStringFunc(data)
    return Client.get(endPoint+"/"+userId);

}
export const updateSelfServingList=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const removeSelfServingList=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete(endPoint+"/"+id);

}

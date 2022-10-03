import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";
// const register = (userInfo) => client.post("/users", userInfo,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
export const addSelfservingList=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post("/self_serving",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const loadSelfServingList=(userId)=> {
    // const newData=queryStringFunc(data)
    return Client.get("/self_serving/"+userId);

}
export const updateSelfServingList=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put("/self_serving/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const removeSelfServingList=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete("/self_serving/"+id);

}

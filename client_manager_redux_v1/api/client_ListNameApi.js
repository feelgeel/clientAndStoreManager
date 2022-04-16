import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";
export const clientAddListName=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post("/client_listNames",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const clientLoadListNames=(userId)=> {
    // const newData=queryStringFunc(data)
    return Client.get("/client_listNames/"+userId);

}
export const clientUpdateListNames=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put("/client_listNames/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const storeRemoveListNames=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete("/listNames/"+id);

}
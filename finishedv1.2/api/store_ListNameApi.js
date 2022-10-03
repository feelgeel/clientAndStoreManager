import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";
export const storeAddListName=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post("/st_listNames",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const storeLoadListNames=(userId)=> {
    // const newData=queryStringFunc(data)
    return Client.get("/st_listNames/"+userId);

}
export const storeUpdateListNames=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put("/listNames/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const storeRemoveListNames=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete("/listNames/"+id);

}
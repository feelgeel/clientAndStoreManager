import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";
let endPoint="/st_listNames"

export const storeAddListName=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const storeLoadListNames=(userId)=> {
    // const newData=queryStringFunc(data)
    return Client.get(endPoint+"/"+userId);

}
export const storeUpdateListNames=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const storeRemoveListNames=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete(endPoint+"/"+id);

}
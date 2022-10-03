import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";


let endPoint="/client_listNames"

export const clientAddListName=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const clientLoadListNames=(userId)=> {
    // const newData=queryStringFunc(data)
    return Client.get(endPoint+"/"+userId);

}
export const loadClientListByFamId=(familyId)=> {
    // const newData=queryStringFunc(data)
    return Client.get(endPoint+"/familyId/"+familyId);

}

export const loadClientList=(userId,listId)=> {
    // const newData=queryStringFunc(data)
    return Client.get(endPoint+"/"+userId+"/"+listId);

}
export const clientUpdateListNames=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}

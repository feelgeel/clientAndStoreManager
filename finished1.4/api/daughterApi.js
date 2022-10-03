import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";


let endPoint="/daughter"

export function getowners(userId,gting,productId) {
    return Client.get(endPoint+"/"+userId+"/"+gting+"/"+productId+"/");
    
  }
export function getdaughterByUserId(userId) {
    return Client.get(endPoint+"/"+userId);
    
  }

export function addDaughter(data) {
  const newData=queryStringFunc(data)
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }
 

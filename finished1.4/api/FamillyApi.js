import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";



let endPoint="/family"

export function getowners(userId,gting,productId) {
    return Client.get(endPoint+"/"+userId+"/"+gting+"/"+productId+"/");
    
  }
export function getFamilyById(id) {
    return Client.get(endPoint+"/"+id);
    
  }

export function updateFamilyById(id,data) {
  const newData=queryStringFunc(data)
  return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }
export function addFamily(data) {
  const newData=queryStringFunc(data)
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }

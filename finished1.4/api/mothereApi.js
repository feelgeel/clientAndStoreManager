import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";


let endPoint="/mother"


export function getowners(userId,gting,productId) {
    return Client.get(endPoint+"/"+userId+"/"+gting+"/"+productId+"/");
    
  }
export function getMotherByUserId(userId) {
    return Client.get(endPoint+"/"+userId);
    
  }
export function addMother(data) {
  const newData=queryStringFunc(data)
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }}); 
  }

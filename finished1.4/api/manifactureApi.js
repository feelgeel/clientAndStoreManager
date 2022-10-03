import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";


let endPoint="/manifacture"


export function getStores(userId,gting,productId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get(endPoint+"/"+userId+"/"+gting+"/"+productId+"/");
    
  }
export function getManifactureByUserId(userId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get(endPoint+"/"+userId);
    
  }
export function addManifacture(data) {
  const newData=queryStringFunc(data)
    
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }

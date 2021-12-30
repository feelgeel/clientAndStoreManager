import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";




export function getStock(userId,gting,productId) {
  
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.get("storeStock/"+userId+"/"+gting+"/"+productId);
    
  }
export function addStock(data) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post("/storeStock",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }
  export function updateStock(userId,gting) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+userId,gting+"/categ");
    return Client.put("storeStock/"+userId+"/"+gting);
  }

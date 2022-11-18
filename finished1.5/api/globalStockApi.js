import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";


let endPoint="/st_global_stock"


export function getGlobalStock(userId,gting,productId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get(endPoint+"/"+userId+"/"+gting+"/"+productId+"/");
    
  }

export function getGlobalStockByProdId(userId,productId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,productId,productId)
    return Client.get(endPoint+"/productId"+"/"+userId+"/"+productId);
    
  }


export function addGlobalStock(data) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }
  export function updateGlobalStock(Id,data) {
    const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+userId,gting+"/categ");
    return Client.put(endPoint+"/"+Id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }

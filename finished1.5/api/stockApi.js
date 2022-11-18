import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";


let endPoint="/storeStock"


export function getStock(userId,gting,productId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get(endPoint+"/"+userId+"/"+gting+"/"+productId+"/");
    
  }
export function getUserStock(userId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get(endPoint+"/"+userId);
    
  }
export function getStockByGting(userId,Gting) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get(endPoint+"/"+userId+"/"+Gting);
    
  }
export function getStockByProdId(userId,productId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,productId,productId)
    return Client.get(endPoint+"/productId/"+userId+"/"+productId);
    
  }
export function getStockById(userId,_id) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,productId,productId)
    return Client.get(endPoint+"/id/"+userId+"/"+_id);
    
  }
export function getManualorderStock(userId,listId,productId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,listId,productId)
    return Client.get(endPoint+"/manual_order/"+userId+"/"+listId+"/"+productId+"/");
    
  }
export function addStock(data) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }
  export function updateStock(Id,data) {
    const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+userId,gting+"/categ");
    return Client.put(endPoint+"/"+Id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }
  export function deleteStock(Id) {
    // const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+userId,gting+"/categ");
    return Client.delete(endPoint+"/"+Id,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }

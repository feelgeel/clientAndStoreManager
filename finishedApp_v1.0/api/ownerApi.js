import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";




export function getowners(userId,gting,productId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get("/st_owner/"+userId+"/"+gting+"/"+productId+"/");
    
  }
export function getownerByUserId(userId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get("/st_owner/"+userId);
    
  }
export function getStockByGting(userId,Gting) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get("/storeStock/"+userId+"/"+Gting);
    
  }
export function getStockByProdId(userId,productId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,productId,productId)
    return Client.get("/storeStock/productId/"+userId+"/"+productId);
    
  }
export function getStockById(userId,_id) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,productId,productId)
    return Client.get("/storeStock/id/"+userId+"/"+_id);
    
  }
export function getManualorderStock(userId,listId,productId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,listId,productId)
    return Client.get("/storeStock/manual_order/"+userId+"/"+listId+"/"+productId+"/");
    
  }
export function addOwner(data) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post("/st_owner",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }
  export function updateStock(Id,data) {
    const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+userId,gting+"/categ");
    return Client.put("/storeStock/"+Id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }
  export function deleteStock(Id) {
    // const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+userId,gting+"/categ");
    return Client.delete("/storeStock/"+Id,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }

import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";




export function getGlobalStock(userId,gting,productId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get("/st_global_stock/"+userId+"/"+gting+"/"+productId+"/");
    
  }
export function getUserGlobalStock(userId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get("/storeStock/"+userId);
    
  }
export function getStockByGting(userId,Gting) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get("/storeStock/"+userId+"/"+Gting);
    
  }
export function getGlobalStockByProdId(userId,productId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,productId,productId)
    return Client.get("/st_global_stock/productId/"+userId+"/"+productId);
    
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
export function addGlobalStock(data) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post("/st_global_stock",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }
  export function updateGlobalStock(Id,data) {
    const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+userId,gting+"/categ");
    return Client.put("/st_global_stock/"+Id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }
  export function deleteStock(Id) {
    // const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+userId,gting+"/categ");
    return Client.delete("/storeStock/"+Id,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }

import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";




export function getClientStock(userId,productId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get("/client_stock/"+userId+"/"+productId+"/");
    
  }
export function getAllClientStock(userId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get("/client_stock/"+userId+"/");
    
  }
export function getManualorderStock(userId,listId,productId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,listId,productId)
    return Client.get("/storeStock/manual_order/"+userId+"/"+listId+"/"+productId+"/");
    
  }
export function addStock(data) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post("/client_stock",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }
  export function updateStock(Id,data) {
    const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+userId,gting+"/categ");
    return Client.put("/client_stock/"+Id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }
  export function deleteStock(Id) {
    // const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+userId,gting+"/categ");
    return Client.delete("/client_stock/"+Id,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }

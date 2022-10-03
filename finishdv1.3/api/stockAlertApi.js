import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";




export function getStockAlert(userId) {
    return Client.get("/st_stock_alert/"+userId+"/");
    
  }
export function getStockAlertByUser(userId) {
    return Client.get("/storeStock/"+userId);
    
  }
export function getStockByGting(userId,Gting) {
    return Client.get("/storeStock/"+userId+"/"+Gting);
    
  }
export function getStockByProdId(userId,productId) {
    return Client.get("/storeStock/productId/"+userId+"/"+productId);
    
  }
export function getManualorderStock(userId,listId,productId) {
    return Client.get("/storeStock/manual_order/"+userId+"/"+listId+"/"+productId+"/");
    
  }
export function addStockAlert(data) {
  const newData=queryStringFunc(data)
    return Client.post("/st_stock_alert",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }
  export function updateStock(Id,data) {
    const newData=queryStringFunc(data)
    return Client.put("/storeStock/"+Id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }
  export function deleteStock(Id) {
    return Client.delete("/storeStock/"+Id,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }

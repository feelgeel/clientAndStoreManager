import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";



let endPoint="/storeWorker"

export function getowners(userId,gting,productId) {
    return Client.get(endPoint+"/"+userId+"/"+gting+"/"+productId+"/");
    
  }
export function getStoreWorkerByUserId(id) {
    return Client.get(endPoint+"/"+id);
    
  }
export function getStockByGting(userId,Gting) {
    return Client.get(endPoint+"/"+userId+"/"+Gting);
    
  }
export function getStockByProdId(userId,productId) {
    return Client.get(endPoint+"/productId/"+userId+"/"+productId);
    
  }
export function updateFamilyById(id,data) {
  const newData=queryStringFunc(data)
  return Client.put("/family/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }
export function addStoreWorker(data) {
  const newData=queryStringFunc(data)
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }

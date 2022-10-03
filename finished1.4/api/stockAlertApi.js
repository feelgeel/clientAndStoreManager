import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";


let endPoint="/st_stock_alert"


export function getStockAlert(userId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get(endPoint+"/"+userId+"/");
    
  }
export function getStockAlertByUser(userId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get(endPoint+"/"+userId);
    
  }

export function addStockAlert(data) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }

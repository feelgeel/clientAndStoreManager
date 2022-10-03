import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";



let endPoint="/manifactureOwner"

export function getStores(userId,gting,productId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get("/store/"+userId+"/"+gting+"/"+productId+"/");
    
  }
export function getManOwnerByUserId(userId) {
    return Client.get(endPoint+"/"+userId);
    
  }
export function getStockByGting(userId,Gting) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get(endPoint+"/"+userId+"/"+Gting);
    
  }
export function AddManifactureOwner(data) {
  const newData=queryStringFunc(data)
    
    return Client.post(endPoint,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }

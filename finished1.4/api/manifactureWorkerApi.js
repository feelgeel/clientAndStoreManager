import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";


let endPoint="/manifactureWorker"


export function getStores(userId,gting,productId) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // console.log(userId,gting,productId)
    return Client.get("/store/"+userId+"/"+gting+"/"+productId+"/");
    
  }
export function getManWorkerByUserId(userId) {
    return Client.get(endPoint+"/"+userId);
    
  }
export function AddManifactureWorker(data) {
  const newData=queryStringFunc(data)
    
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    
  }

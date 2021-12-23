import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";




export function getStock(userId,gting,productid) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.get("storeStock/"+userId+"/"+gting+"/"+productid);
  }
export function addStock() {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post("storeStock/");
  }
  export function updateStock(userId,gting) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+userId,gting+"/categ");
    return Client.put("storeStock/"+userId+"/"+gting);
  }

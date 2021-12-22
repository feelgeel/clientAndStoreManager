import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";




export function getStock(userId,gting) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.get("stock/"+userId+"/"+gting);
  }
export function addStock() {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post("stock/");
  }
  export function updateStock(userId,gting) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+userId,gting+"/categ");
    return Client.put("stock/"+userId+"/"+gting);
  }

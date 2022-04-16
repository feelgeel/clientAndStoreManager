import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";




export function addtransaction(data) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post("/st_trans",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }
  export function updatest_trans(item) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+item+"/categ");
    return Client.put("st_trans/"+item);
  }

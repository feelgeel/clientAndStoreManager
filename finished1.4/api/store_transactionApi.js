import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";





let endPoint="/st_trans"

export function addtransaction(data) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }
export function GetTransactions(id) {
  // const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.get(endPoint,id,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }
  export function updatest_trans(item) {
    //play around with git 
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+item+"/categ");
    return Client.put(endPoint+item);
  }

import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";



let endPoint="/st_trans_prod"

export function addtransactionProd(data) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }

export function getTransactionProd(transId) {
  // const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.get(endPoint+"/"+transId);
  }
  export function updatestTransProd(id,data) {
    const newData=queryStringFunc(data)
    return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }

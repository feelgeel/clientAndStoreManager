import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";




export function addtransactionProd(data) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post("/st_trans_prod",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }

export function getTransactionProd(transId) {
  // const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.get("/st_trans_prod/"+transId);
  }
  export function updatestTransProd(id,data) {
    const newData=queryStringFunc(data)
    return Client.put("/st_trans_prod/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }

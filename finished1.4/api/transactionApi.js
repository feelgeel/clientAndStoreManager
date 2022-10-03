import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";


let endPoint="/st_trans"


export function addtransaction(data) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }
export function getTransClientNotDone(id) {
  // const newData=queryStringFunc(id)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.get(endPoint+"/client_not_done/"+id);
  }
export function getTransStoreNotDone(id) {
  // const newData=queryStringFunc(id)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.get(endPoint+"/store_not_done/"+id);
  }
  export function GetTransactions(id) {
    // const newData=queryStringFunc(data)
      // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
      return Client.get(endPoint,id,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    }
  export function updatest_trans(id,data) {
    const newData=queryStringFunc(data)
    return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

  }

import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";




export function addtransaction(data) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post("/st_trans",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }
export function getTransClientNotDone(id) {
  // const newData=queryStringFunc(id)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.get("/st_trans/client_not_done/"+id);
  }
export function getTransStoreNotDone(id) {
  // const newData=queryStringFunc(id)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.get("/st_trans/store_not_done/"+id);
  }
  export function GetTransactions(id) {
    // const newData=queryStringFunc(data)
      // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
      return Client.get("/st_trans",id,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
    }
  export function updatest_trans(id,data) {
    const newData=queryStringFunc(data)
    return Client.put("/st_trans/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

  }

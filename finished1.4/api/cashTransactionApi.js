import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";


let endPoint="/cash_trans"


export function addcashtransaction(data) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }
export function getcashtransaction(id) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.get(endPoint+"/"+id);
  }
  export function updatest_trans(id,data) {
    const newData=queryStringFunc(data)
    return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

  }

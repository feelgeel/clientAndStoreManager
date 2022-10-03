import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";




export function addcashtransaction(data) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.post("/cash_trans",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
  }
export function getcashtransaction(id) {
  const newData=queryStringFunc(data)
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.get("/cash_trans/"+id);
  }
  export function updatest_trans(id,data) {
    const newData=queryStringFunc(data)
    return Client.put("/cash_trans/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

  }

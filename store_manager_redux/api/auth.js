import queryStringFunc from "../utility/queryStringFunc";
import Client from "./client";
//{ headers: {"Content-Type": "application/x-www-form-urlencoded" }}
export const login=(data)=> 
{
    const newData=queryStringFunc(data)
return Client.post("/auth",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}

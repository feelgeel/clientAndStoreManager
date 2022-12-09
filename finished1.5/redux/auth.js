import queryStringFunc from "../utility/queryStringFunc";
import Client from "./client";
let endPoint="/auth"

//{ headers: {"Content-Type": "application/x-www-form-urlencoded" }}
export const login=(data)=> 
{
    const newData=queryStringFunc(data)
return Client.post(endPoint,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}

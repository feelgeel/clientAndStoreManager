import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";
// const register = (userInfo) => client.post("/users", userInfo,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
const register=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post("/users",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export default { register };
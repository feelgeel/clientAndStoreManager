import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";



let endPoint="/users"

// const register = (userInfo) => client.post("/users", userInfo,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
export const register=(register)=> {
    const data=new FormData();
    data.append("firstName",register.firstName)
    data.append("lastName",register.lastName)
    data.append("userName",register.userName)
    data.append("email",register.email)
    data.append("password",register.password)
    // const newData=queryStringFunc(data)
    register.images.forEach((image,index)=> {
        let imgData=image.split(".")
        imgData=imgData[imgData.length-1]
        data.append("images",{
          name: 'user',
          type:"image/"+imgData,
          uri:image
      })
    });
    return Client.post(endPoint,data,
        // { headers: {"Content-Type": "application/x-www-form-urlencoded" }}
        { headers: {"Content-Type": "multipart/form-data"}}
        );

}
export const updateUser=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put(endPoint+"/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const getAUser=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.get(endPoint+"/"+id);

}
export const removeProducts=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete(endPoint+"/"+id);

}
import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";



export const addSelfServingProd=(data)=>{
    const newData=queryStringFunc(data)
    return Client.post("/self_serving_prod",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
}
export const getSelfServingProd=(listId)=>{
    return Client.get("/self_serving_prod/"+listId);
}
export const updateSelfServingProd=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put("/self_serving_prod/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const removeSelfServingProd=(id)=> {
    // const newData=queryStringFunc(data)
    return Client.delete("/self_serving_prod/remove/"+id);

}
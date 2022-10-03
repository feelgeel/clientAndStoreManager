import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";
export const addManualOrderList=(data)=> {
    const newData=queryStringFunc(data)
    return Client.post("/st_man_order_list",newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});
}
export const loadListNames=(userId)=> {
    return Client.get("/st_man_order_list/"+userId);
}
export const updateListNames=(id,data)=> {
    const newData=queryStringFunc(data)
    return Client.put("/st_man_order_list/"+id,newData,{ headers: {"Content-Type": "application/x-www-form-urlencoded" }});

}
export const removeListNames=(id)=> {
    return Client.delete("/st_man_order_list/"+id);

}

import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";




export function getgrossery() {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.get("grosseries/");
  }
  export function getCategory(item) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+item+"/categ");
    return Client.get(""+item+"/categories");
  }
  export function getGrosseryByName(name) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery/"+name+"/");
    return Client.get("grosseries/"+name+"/");
  }
export function getGrosseryByGting(id) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery/"+name+"/");
    return Client.get("grossery/gting/"+id+"/");
  }
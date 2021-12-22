import http from "./httpServerses";


export function getgrossery() {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return http.get("http://192.168.1.34:9000/api/grosseries");
  }
export function getCategory(item) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+item+"/categ");
    return http.get("http://192.168.1.34:9000/api/"+item+"/categories");
  }
export function getGrosseryByName(name) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery/"+name+"/");
    return http.get("http://192.168.1.34:9000/api/grosseries/"+name+"/");
  }
export function getGrosseryByGting(id) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery/"+name+"/");
    return http.get("http://192.168.1.34:9000/api/grossery/"+id+"/");
  }
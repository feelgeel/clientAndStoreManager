import http from "./httpServerses";


export function getgrossery() {
    return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    // return http.get("http://localhost:9000/api/grossery");
  }
export function getCategory() {
    return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery/categ");
    // return http.get("http://localhost:9000/api/grossery/categ");
  }
export function getGrosseryByName(name) {
    return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery/"+name+"/");
    // return http.get("http://localhost:9000/api/grossery/"+name+"/");
  }
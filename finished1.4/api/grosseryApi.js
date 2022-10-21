import Client from "./client";
import queryStringFunc from "../utility/queryStringFunc";


let endPoint="/grosseries"


export function getgrossery() {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery");
    return Client.get(endPoint);
  }
  export const addGrosseries=(grossobj)=>{
    let newgting=grossobj.Gting.familyMemberId
    let newCateg=grossobj.categ.name
    let newMainCateg=grossobj.categ.main_categ
    const data=new FormData();
    data.append("Gting",newgting)
    data.append("product_name",grossobj.product_name)
    data.append("brand",grossobj.brand)
    data.append("categ",newCateg)
    data.append("main_categ",newMainCateg)
    grossobj.images.forEach((image,index)=> {
      let imgData=image.split(".")
      imgData=imgData[imgData.length-1]
      data.append("images",{
        name: 'grossery',
        type:"image/"+imgData,
        uri:image
    })
  });
      // data.images=img
      console.log(data)
  
    // const newData=queryStringFunc(data)
    return Client.post("/grosseries_temp",data,
    // { headers: {"Content-Type": "application/x-www-form-urlencoded" }}
    { headers: {"Content-Type": "multipart/form-data"}}
    );
    console.log(data)
  }
  export function getCategory(item) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/"+item+"/categ");
    return Client.get("/"+item+"/categories");
  }
  export function getGrosseryByName(name) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery/"+name+"/");
    return Client.get(endPoint+"/"+name+"/");
  }
  export function getProductByName(store,categ) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery/"+name+"/");
    return Client.get("/"+store+"/"+categ+"/");
  }
export function getGrosseryByGting(id) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery/"+name+"/");
    return Client.get("grossery"+"/gting/"+id+"/");
  }
export function getGrosseryById(id) {
    // return http.get("https://evening-plateau-98989.herokuapp.com/api/grossery/"+name+"/");
    return Client.get("grossery/"+id+"/");
  }
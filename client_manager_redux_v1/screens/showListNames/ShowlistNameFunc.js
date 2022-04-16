import *as clientListnamesAction from "../../redux/client_listNames";
import *as clientProductsAction from "../../redux/client_products";
import { clientAddListName,clientUpdateListNames } from "../../api/client_ListNameApi";
import { getProductByName } from "../../api/grosseryApi";
import { clientAddProduct,clientLoadProducts,clientUpdateproduct } from "../../api/client_productApi";
import moment from 'moment';

  {/*                 handleSaveList                 */}
export const handleSaveList=async(
    listName,
    dispatch,
    SetlistModal,
    user,
    SettheListNames,
    theListNames)=>{

        let newTheListName=[...theListNames]
    let listNameObj={
        listName,
        timestamp:Date.now(),
        totalQuantity:0,
        userId:user.userId,
        unfinished:0,
        totalPrice:0,
        finished:0,
        status:false, 

    }
    const {data:clientlistName}=await clientAddListName(listNameObj)
    newTheListName.push(clientlistName)
    SettheListNames(newTheListName)
    dispatch(clientListnamesAction.loadListNames(newTheListName));
    dispatch(clientListnamesAction.setTheListName(clientlistName));
    SetlistModal(false)
// console.log(clientlistName)
}
 {/*                 handleDuplicateClientList                 */}
 export const handleDuplicateClientList=async(chosen,listName,user,
  theListNames,dispatch,SettheListNames,setDuplicationmodal,
  SetlistlongPressModal)=>{
  let newTheListName=[...theListNames]
  let name=moment().format('D/M/YY,h:m:s a')
  let newName=listName===""?name:listName
  let listNameObj={
    listName:newName,
    timestamp:Date.now(),
    totalQuantity:0,
    userId:user.userId,
    unfinished:0,
    totalPrice:0,
    finished:0,
    status:false, 
}
const {data:clientlistName}=await clientAddListName(listNameObj)
newTheListName.push(clientlistName)
dispatch(clientListnamesAction.loadListNames(newTheListName));
dispatch(clientListnamesAction.setTheListName(clientlistName));
SettheListNames(newTheListName)
chosen.map(async(ch)=>{
  let newDt={
    timestamp:Date.now(),
    Gting:ch.Gting,
    userId:user.userId,
    productId:ch._id,
    listId:clientlistName._id,
    image_front_url:ch.image_front_url,
    brands:ch.brands,
    quantity:ch.quantity,
}
  const {data:clientproduct}=await clientAddProduct(newDt)
  let newClientProd={...clientproduct};
              newClientProd.image_front_url=ch.image_front_url
            newClientProd.brands=ch.brands
  dispatch(clientListnamesAction.setlistProds(newClientProd));
})
  // console.log(newTheListName)
  setDuplicationmodal(false)
  SetlistlongPressModal(false)
  }

  {/*                 handleAddproducts                 */}
export const handleAddproducts=async(store,categ,Setproduct,chosen)=>{
    const {data:prod}=await getProductByName(store,categ);
    let finishedprod=[...prod];
    chosen.map(prodDt=>{
      let index=prod.findIndex(dt=>dt._id===prodDt.productId)
      finishedprod.splice(index,1)
      // console.log(index)
    })
    Setproduct(finishedprod)
  }
  {/*                 handleSaveChosen                 */}
  export const handleSaveChosen=async(dispatch,chosen,
    Setchosen,user,SelectedlistName,SetProdModal)=>{
      
      let {data:getProd}=await clientLoadProducts(
        user.userId,SelectedlistName._id)
      let newChosen=[...chosen]
    
        if(getProd.length==0){
          chosen.map(async(ch)=>{
            let newDt={
                timestamp:Date.now(),
                Gting:ch.Gting,
                userId:user.userId,
                productId:ch._id,
                listId:SelectedlistName._id,
                image_front_url:ch.image_front_url,
                brands:ch.brands,
                quantity:ch.quantity,
            }
            const {data:clientproduct}=await clientAddProduct(newDt)
              let newClientProd={...clientproduct};
              newClientProd.image_front_url=ch.image_front_url
            newClientProd.brands=ch.brands
            dispatch(clientListnamesAction.setlistProds(newClientProd));
            // console.log(newClientProd)
          })
            
          }
  else{
          chosen.map(async(chosen)=>{
            getProd.map(async(prodDb)=>{

                if(prodDb.productId!==chosen.productId){
                  const {data:clientproduct}=await clientAddProduct(chosen)
                  let newClientProd1={...clientproduct};
                  newClientProd1.image_front_url=chosen.image_front_url
                  newClientProd1.brands=chosen.brands
                  dispatch(clientListnamesAction.setlistProds(newClientProd1));
                //  console.log(chosen.productId)  
                }
             })
            })
            // console.log("chosen",chosen)
            // console.log("getprod",getProd)
  }
     
      SetProdModal(false)
  // console.log(getProd)
  }
  {/*                 handleunselected                 */}
  export const handleunselected=(
    theChosen,SelectedlistName,
    quantity,Setchosenmodal,
    product,Setproduct,
    chosen,Setchosen,user)=>{
      let newproduct=[...product];
      let newChosen=[...chosen];
      let newThechosen={...theChosen}
      let index=product.findIndex(dt=>dt._id==theChosen._id);
      newThechosen.quantity=quantity
      newThechosen.listId=SelectedlistName._id
      newThechosen.userId=user.userId
      newThechosen.productId=newThechosen._id
      newThechosen.timestamp=Date.now();
      
        newproduct.splice(index,1)
        Setproduct(newproduct)
      newChosen.push(newThechosen);
      Setchosen(newChosen);
      Setchosenmodal(false);
      
//   console.log(newThechosen.listId)
  // console.log(newThechosen)
  }

  {/*                 handleUpdateListName                 */}
  export const handleUpdateListName=async(SelectedlistName,listName,
    theListNames,SettheListNames,dispatch)=>{
    let newclientlist={...SelectedlistName}
    let newTheListName=[...theListNames]
    newclientlist.listName=listName;
    const {data:updatedClientlist}=await clientUpdateListNames(newclientlist._id,newclientlist)
    let index=theListNames.findIndex(dt=>dt._id===newclientlist._id)
    newTheListName[index]=newclientlist;
    SettheListNames(newTheListName)
    dispatch(clientListnamesAction.loadListNames(newTheListName));
    dispatch(clientListnamesAction.setTheListName(newclientlist));
    // console.log(updatedClientlist)
  }

  {/*                 handleChosenClicked                 */}
  export const handleChosenClicked=(selecteditem,selectedChosen,
    setselectedChosen,dispatch,setModifyChosenModal)=>{
    setselectedChosen(selecteditem)
    dispatch(clientListnamesAction.setTheproduct(selecteditem));
    setModifyChosenModal(true)
    // console.log(selecteditem)
  }

  {/*                 handleUpdateTheChosenQuant                 */}
  export const handleUpdateTheChosenQuant=async(quantity,
    dispatch,Theproduct,clientProducts,chosen,Setchosen)=>{
      let newProd={...Theproduct}
      let newReduxClientProd=[...clientProducts]
      let newChosen=[...chosen]
      newProd.quantity=quantity
    let index=newReduxClientProd.findIndex(dt=>dt.productId==newProd.productId)
    if(index==-1){
      let chosen_index=chosen.findIndex(dt=>dt.productId==newProd.productId)
      newChosen[chosen_index]=newProd
      Setchosen(newChosen)
      dispatch(clientListnamesAction.setTheproduct(newProd));
      
    }else{
      newReduxClientProd[index]=newProd;
      let chosen_index=chosen.findIndex(dt=>dt.productId==newProd.productId)
      newChosen[chosen_index]=newProd;
      const {data:updatedProduct}=await clientUpdateproduct(newProd._id,newProd)
      dispatch(clientListnamesAction.setlistProd1(newReduxClientProd));
      Setchosen(newChosen)
      dispatch(clientListnamesAction.setTheproduct(newProd));

      // console.log("update",newProd.productId)
    }
  }
  {/*                 handleUpdateTheChosenQuant for duplication                 */}
  export const handleUpdateTheChosenQuantDuplication=async(theChosen,
    quantity,chosen,Setchosen,dispatch)=>{
    let newProd={...theChosen}
    let newChosen=[...chosen]
    newProd.quantity=quantity
    let index=newChosen.findIndex(dt=>dt.productId==newProd.productId)
    newChosen[index]=newProd
    Setchosen(newChosen)
    dispatch(clientListnamesAction.setTheproduct(newProd));
  console.log("typeof ",index)
  }
    {/*                 handleListNameClick                 */}
    export const handleListNameClick=(item,setSelectedlistName,
      Setchosen,chosen,SetProdModal,clientProducts)=>{
          let selectedlistid=item._id;
          let finishedChosen=[]
          clientProducts.map(chosen=>{
            if(chosen.listId==selectedlistid){
              finishedChosen.push(chosen)
            }
          })
          Setchosen(finishedChosen)
          setSelectedlistName(item)
          SetProdModal(true)
          // console.log(selectedlistid)
    }
    
  {/*                 handleLongPresList                 */}
  export const handleLongPresList=(item,SetlistlongPressModal,
    setSelectedlistName,Setchosen,clientProducts)=>{
      let selectedlistid=item._id;
      let finishedChosen=[]
      clientProducts.map(chosen=>{
        if(chosen.listId==selectedlistid){
          finishedChosen.push(chosen)
        }
      })
      Setchosen(finishedChosen)
      SetlistlongPressModal(true)
      setSelectedlistName(item)
  }
 
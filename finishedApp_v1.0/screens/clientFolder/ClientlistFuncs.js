import { getProductByName, getGrosseryByGting } from "../../api/grosseryApi";
import *as ClientListAction from "../../redux/ClientList";
import *as stockListAction from "../../redux/StoreStock";
import { addListOrder } from "../../api/storeListOrderApi";
import { AddOrderProd } from "../../api/storeListOrderProdApi";
import moment from 'moment';
import { addStock } from "../../api/stockApi";
import { clientAddListName,clientUpdateListNames } from "../../api/client_ListNameApi";
import { clientAddProduct,clientLoadProducts,clientUpdateproduct } from "../../api/client_productApi";
import { getClientStock, getAllClientStock } from "../../api/ClientstockApi";
export const handleUnselected=(dt,setquantityModal,settheChosen,user)=>{
  settheChosen(dt)
  setquantityModal(true);
}
{/*                 handleSaveOrderList                 */}
export const handleSaveClientList=async(chosen,user,setorderList,
    orderList,dispatch,setchosenModal,setchosen,setselectedListName,selectedListName,
    benefit)=>{
      let neworderList=[...orderList]
    let listNameObj={
      listName:moment().format('D/M/YY,h:m:s a'),
      timestamp:Date.now(),
      totalQuantity:0,
      userId:user.userId,
      unfinished:0,
      totalPrice:0,
      finished:0,
      status:false, 
  }
  const {data:st_manual_order_list}=await clientAddListName(listNameObj)
  console.log(st_manual_order_list)
  neworderList.push(st_manual_order_list)
  setselectedListName(neworderList)
  dispatch(ClientListAction.addListName(neworderList));
  dispatch(ClientListAction.setTheList(st_manual_order_list));
  setorderList(neworderList)
//   console.log("st_man_list",st_manual_order_list._id)
     chosen.map(async(chosenDt)=>{
       let sellPrice=chosenDt.price*(1+chosenDt.benefit/100);
      let newchosen={
        "Gting" : chosenDt.Gting,
        "quantity" : chosenDt.quantity,
        "listId" : selectedListName._id,
        "userId" : user.userId,
        "productId" : chosenDt.productId,
        "timestamp" : Date.now(),
    }
      newchosen.listId=st_manual_order_list._id
      const {data:st_manual_order_prod}=await clientAddProduct(newchosen)
      let new_st_manual_order_prod={...st_manual_order_prod};
      new_st_manual_order_prod.image_front_url=chosenDt.image_front_url
      new_st_manual_order_prod.brands=chosenDt.brands
      dispatch(ClientListAction.pushProducts(new_st_manual_order_prod));
  

    })
    setchosenModal(false)
  }
 {/*                 handleChosenClicked                 */}
 export const handleChosenClicked=(selecteditem,settheChosen,
    setModifyChosenModal,dispatch)=>{
      settheChosen(selecteditem)
      dispatch(ClientListAction.setTheProd(selecteditem));
      setModifyChosenModal(true)
      // console.log("hello")
    }
{/*                 handleAddproducts                 */}
export const handleAddproducts=async(store,categ,Setproduct,chosen)=>{
    const {data:prod}=await getProductByName(store,categ);
    let finishedprod=[...prod];
    chosen.map(prodDt=>{
      let index=finishedprod.findIndex(dt=>dt._id===prodDt.productId)
      finishedprod.splice(index,1)
      console.log(prodDt.productId)
    })
    Setproduct(finishedprod)
}
 {/*                 handleScannedGting                 */}
 export const handleScannedGting=async(scannedGting,setscannedProd,
    setscannedProdModel,user,settheChosen,theChosen,chosen,dispatch,setquantity,quantity)=>{
    const {data:prod}=await getGrosseryByGting(scannedGting)
    let newProd={...prod[0]}
    setquantity(1)
    newProd.quantity=quantity;
    newProd.userId=user.userId;
    newProd.productId=newProd._id;
    // newProd.listId=selectedlistName._ids;
    let index=chosen.findIndex(dt=>dt.productId===newProd.productId)
    if(index==-1){
      settheChosen({})
      dispatch(ClientListAction.setTheProd({}));
    }else{
      settheChosen(chosen[index])
      dispatch(ClientListAction.setTheProd(chosen[index]));
      
    }
    setscannedProd(newProd)
    setscannedProdModel(true)
        //  console.log(prod)
    }
 {/*                 handleAddScannedProd                 */}
    export const handleAddScannedProd=async(theChosen,scannedProd,quantity,price,
        setchosen,user,chosen,setproduct,benefit,values)=>{
      let newProd={...scannedProd}
      let newChosen=[...chosen]
      newProd.quantity=values.quantity;
      newProd.userId=user.userId;
      newProd.productId=newProd._id;
      if(theChosen._id){
      let newQuantity=Number(newProd.quantity)+Number(theChosen.quantity)
      newProd.quantity=newQuantity
      // newProd.price=price
      let index=chosen.findIndex(dt=>dt.productId===newProd.productId)
      newChosen[index]=newProd
      setchosen(newChosen)
      }else{
        newChosen.push(newProd)
      }
      setchosen(newChosen)
      setproduct([])
        }
{/*                 handleAddToChosen                 */}
export const handleAddToChosen=(  theChosen,selectedListName,
    quantity,setquantityModal,
    product,setproduct,
    chosen,setchosen,user,values)=>{
        let newproduct=[...product];
        let newChosen=[...chosen];
        let newThechosen={...theChosen}
        let index=product.findIndex(dt=>dt._id==theChosen._id);
        newThechosen.quantity=values.quantity
        newThechosen.listId=selectedListName._id
        newThechosen.userId=user.userId
        newThechosen.productId=newThechosen._id
        newThechosen.timestamp=Date.now();
        
          newproduct.splice(index,1)
          setproduct(newproduct)
        newChosen.push(newThechosen);
        setchosen(newChosen);
        setquantityModal(false);
console.log(values)
}
 {/*                 handleUpdateTheChosenQuant                 */}
 export const handleUpdateTheChosenQuant=(quantity,price,
    settheChosen,chosen,setchosen,theChosen)=>{
      let newProd={...theChosen}
      let newChosen=[...chosen]
         newProd.quantity=quantity
         newProd.price=price
         let index=newChosen.findIndex(dt=>dt.productId==newProd.productId)
         newChosen.[index]=newProd
         setchosen(newChosen)
        //  console.log(index)
    }
 {/*                 handleDeleteProduct                 */}
 export const handleDeleteProduct=async(chosen,theChosen,setchosen,
    setareUSureModal,setModifyChosenModal,setproduct)=>{
    let newChosen=[...chosen];
    let index=newChosen.findIndex(dt=>dt.productId===theChosen.productId);
    newChosen.splice(index,1)
    setchosen(newChosen)
  setproduct([])
    setareUSureModal(false),
    setModifyChosenModal(false),
    console.log(index)
  
    }
    export const handleAddprodStockAlert=async(user,setproduct)=>{
      let {data:stockDb}=await getAllClientStock(user.userId)
      let newStockDb=stockDb.filter(dt=>dt.quantity==dt.stockAlert)
      setproduct(newStockDb)
      // console.log(stockDb)
    
    }
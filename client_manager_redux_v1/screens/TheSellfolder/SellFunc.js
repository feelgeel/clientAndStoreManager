import { getProductByName, getGrosseryByGting } from "../../api/grosseryApi";
import moment from 'moment';
import { addListNameSell } from "../../api/sellApi";
import { addProductSell } from "../../api/sellProductApi";
import { AddManualorderProd, UpdateManualorderProd,
   RemoveManualorderProd } from "../../api/storeManualOrderProductsApi";
import *as storeSellListAction from "../../redux/st_sell";
import *as stockListAction from "../../redux/StoreStock";
import { addStock,getStock, deleteStock, updateStock } from "../../api/stockApi";

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
{/*                 handleunselected                 */}
export const handleUnselected=async(dt,setquantityModal,settheChosen,user,setselectedStock)=>{
  const {data:stockprod}=await getStock(user.userId,dt.Gting,dt._id)
  settheChosen(dt)
  setselectedStock(stockprod)
  setquantityModal(true);
}
{/*                 handleAddToChosen                 */}
export const handleAddToChosen=async(theChosen,selectedListName,
    quantity,setquantityModal,
    product,setproduct,chosen,setchosen,user,
    price,benefit,selectedStock)=>{
        let newproduct=[...product];
        let newChosen=[...chosen];
        let newThechosen={...theChosen}
        let index=product.findIndex(dt=>dt._id==theChosen._id);
        newThechosen.quantity=quantity
        newThechosen.listId=selectedListName._id
        newThechosen.userId=user.userId
        newThechosen.price=selectedStock[0].sellPrice
        newThechosen.productId=newThechosen._id
        newThechosen.timestamp=Date.now();
       
          newproduct.splice(index,1)
          setproduct(newproduct)
        newChosen.push(newThechosen);
        setchosen(newChosen);
        setquantityModal(false);
}
 {/*                 handleChosenClicked                 */}
 export const handleChosenClicked=(selecteditem,settheChosen,
  setModifyChosenModal,dispatch)=>{
    settheChosen(selecteditem)
    dispatch(storeSellListAction.setTheProd(selecteditem));
    setModifyChosenModal(true)
    // console.log("hello")
  }
 {/*                 handleSaveChosen                 */}
 export const handleSaveManualListAndProd=async(chosen,user,setsellList,
  sellList,dispatch,setchosenModal,setchosen,setselectedListName,selectedListName,
  benefit)=>{
    let NewSellList=[...sellList]
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
const {data:listNameSale}=await addListNameSell(listNameObj)
NewSellList.push(listNameSale)
setselectedListName(listNameSale)
dispatch(storeSellListAction.addListName(NewSellList));
dispatch(storeSellListAction.setTheList(listNameSale));
setsellList(NewSellList)
// console.log("st_man_list",st_manual_order_list._id)
   chosen.map(async(chosenDt)=>{
     let sellPrice=chosenDt.price*(1+chosenDt.benefit/100);
    let newchosen={
      "Gting" : chosenDt.Gting,
      "quantity" : chosenDt.quantity,
      "listId" : selectedListName._id,
      "userId" : user.userId,
      "price" : chosenDt.price,
      "productId" : chosenDt.productId,
      "timestamp" : Date.now(),
  }
    newchosen.listId=listNameSale._id
    const {data:st_sell_prod}=await addProductSell(newchosen)
    let new_st_sell_prod={...st_sell_prod};
    new_st_sell_prod.image_front_url=chosenDt.image_front_url
    new_st_sell_prod.brands=chosenDt.brands
    dispatch(storeSellListAction.pushProducts(new_st_sell_prod));
    const {data:stockprod}=await getStock(user.userId,chosenDt.Gting,chosenDt._id)
    let newStockprod={...stockprod[0]}
    let newQuantStock=Number(newStockprod.quantity)-Number(chosenDt.quantity)
    newStockprod.quantity=newQuantStock
    if(newQuantStock==0){
      console.log("delete",newStockprod._id)
    const {data:stockprod}=await deleteStock(newStockprod._id)

    }else{
      console.log("update")
    const {data:stockprod}=await updateStock(newStockprod._id,newStockprod)

    }
    // let stock={
    //   productId:chosenDt.productId,
    //   userId:user.userId,
    //   quantity:chosenDt.quantity,
    //   ByuPrice:chosenDt.price,
    //   sellPrice,
    //   listId:selectedListName._id,
    //   Gting : chosenDt.Gting,
    //   Benefit:chosenDt.benefit,
    // }
    // let {data:stockDb}=await addStock(stock)
    // dispatch(stockListAction.pushStocks(stockDb));

    console.log("benefit",newchosen)
    console.log("selldb",st_sell_prod)
   })
   setchosenModal(false)
   setchosen([])
  //  console.log(newchosen)
  }
 {/*                 handleUpdatemanual list and prod*/}
 export const handleUpdateManualListAndProd=async(chosen,user,setmanualOrderLists,
  manualOrderLists,dispatch,setchosenModal,setchosen,setselectedListName,selectedListName,theChosenRedux)=>{
    let index;
    let newChosenProd=[];
    let newChosen=[...chosen];
    
    theChosenRedux.map(async(dt)=>{
      let newDt={...dt}
       index=chosen.findIndex(ch=>ch.productId==dt.productId)
       if(index!==-1){
         let selectedChosen={...chosen[index]};
         let newChosenObj={...newChosen[index]}
         if(dt.quantity!==selectedChosen.quantity){
            newDt.quantity=selectedChosen.quantity
             const {data:update_manual_order_prod}=
             await UpdateManualorderProd(newDt._id,selectedChosen)      
            }
         if(dt.price!==selectedChosen.price){
            newDt.price=selectedChosen.price
            const {data:update_manual_order_prod}=
             await UpdateManualorderProd(newDt._id,selectedChosen)
         }
        //  console.log("update the server prod",newChosen[index])
       
       }else{
        const {data:delete_manual_order_prod}=await RemoveManualorderProd(dt._id)
      
        //  console.log("delete the prod",newDt)
       }
    })
    chosen.map(async(dt)=>{
      index=theChosenRedux.findIndex(ch=>ch.productId==dt.productId)
      if(index==-1){
        const {data:add_manual_order_prod}=await AddManualorderProd(dt)
        newChosen.push(add_manual_order_prod)
        // console.log("add prod to da server",chosen)
      }
    })
    setchosen(newChosen)
    dispatch(storeSellListAction.addProducts(newChosen));
// console.log("selected listname redux",selectedListName)
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
       console.log(index)
  }
 {/*                 handleScannedGting                 */}
 export const handleScannedGting=async(scannedGting,setscannedProd,
  setscannedProdModel,user,settheChosen,theChosen,chosen,dispatch)=>{
  const {data:prod}=await getGrosseryByGting(scannedGting)
  let newProd={...prod[0]}
  newProd.quantity=1;
  newProd.price=1;
  newProd.userId=user.userId;
  newProd.productId=newProd._id;
  // newProd.listId=selectedlistName._ids;
  let index=chosen.findIndex(dt=>dt.productId===newProd.productId)
  if(index==-1){
    settheChosen({})
    dispatch(storeSellListAction.setTheProd({}));
  }else{
    settheChosen(chosen[index])
    dispatch(storeSellListAction.setTheProd(chosen[index]));
    
  }
  setscannedProd(newProd)
  setscannedProdModel(true)
      //  console.log(prod)
  }
 {/*                 handleAddScannedProd                 */}
 export const handleAddScannedProd=async(theChosen,scannedProd,quantity,price,
  setchosen,user,chosen,setproduct,benefit)=>{
let newProd={...scannedProd}
let newChosen=[...chosen]
newProd.quantity=quantity;
newProd.price=price;
newProd.benefit=benefit;
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
  // console.log("the chosen",theChosen)
  // console.log('scanned prod',scannedProd)
  // console.log('scanned prod',quantity)
  // console.log('scanned prod',price)
  }
  export const handleSetListProducts=(item,setchosen,listproducts,setproduct,dispatch)=>{
  // let newListProd=[...listproducts];
  let selectedlistid=item._id;
  let finishedChosen=[]
  listproducts.map(chosen=>{
    if(chosen.listId==selectedlistid){
      finishedChosen.push(chosen)
    }
    console.log(chosen)
  })
  setchosen(finishedChosen)
  dispatch(storeSellListAction.setTheChosen(finishedChosen));
  setproduct([])
  
  }

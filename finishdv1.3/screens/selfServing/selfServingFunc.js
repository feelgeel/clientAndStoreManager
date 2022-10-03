import { getProductByName, getGrosseryByGting } from "../../api/grosseryApi";
import *as selfServingAction from "../../redux/selfServing";
import *as clientStockActions from "../../redux/clientStock";
import { addSelfservingList } from "../../api/SelfServingApi";
import { addSelfServingProd } from "../../api/SelfServingProdApi";
import { getClientStock,addStock,updateStock } from "../../api/ClientstockApi";
import moment from 'moment';
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
export const handleUnselected=async(dt,setquantityModal,settheChosen)=>{
    settheChosen(dt)
    setquantityModal(true);
    console.log(dt)
  }
  {/*                 handleAddToChosen                 */}
export const handleAddToChosen=(theChosen,
    quantity,setquantityModal,
    product,setproduct,
    chosen,setchosen,user,price,stockAlert)=>{
        let newproduct=[...product];
        let newChosen=[...chosen];
        let newThechosen={...theChosen}
        let index=product.findIndex(dt=>dt._id==theChosen._id);
        newThechosen.quantity=quantity
        newThechosen.userId=user.userId
        newThechosen.ByuPrice=price
        newThechosen.stockAlert=stockAlert
        newThechosen.productId=newThechosen._id
        newThechosen.timestamp=Date.now();
        
          newproduct.splice(index,1)
          setproduct(newproduct)
        newChosen.push(newThechosen);
        setchosen(newChosen);
        setquantityModal(false);
// console.log("handleUnselected",newThechosen.quantity,
// newThechosen.listId,
// newThechosen.userId,
// newThechosen.ByuPrice,
// newThechosen.productId,
// newThechosen.benefit,
// newThechosen.stockAlert,
// newThechosen.timestamp,
// newThechosen.sellPrice
// )
}
 {/*                 handleChosenClicked                 */}
 export const handleChosenClicked=(selecteditem,settheChosen,
  setmodifyChosenModal,dispatch,setprice,setquantity,chosen)=>{
    settheChosen(selecteditem)
    dispatch(selfServingAction.setTheProd(selecteditem));
    setprice(selecteditem.ByuPrice)
    setquantity(selecteditem.quantity)
    setmodifyChosenModal(true)
    // console.log(chosen)
  }
   {/*                 handleUpdateTheChosenQuant                 */}
 export const handleUpdateTheChosenQuant=(quantity,price,
  settheChosen,chosen,setchosen,theChosen,stockAlert)=>{
    let newProd={...theChosen}
    let newChosen=[...chosen]
       newProd.quantity=quantity
       newProd.ByuPrice=price
       newProd.stockAlert=stockAlert
       let index=newChosen.findIndex(dt=>dt.productId==newProd.productId)
       newChosen.[index]=newProd
       setchosen(newChosen)
       console.log(index)
  }
   {/*                 handleDeleteProduct                 */}
 export const handleDeleteProduct=async(chosen,theChosen,setchosen,
  setareUSureModal,setmodifyChosenModal,setproduct)=>{
  let newChosen=[...chosen];
  let index=newChosen.findIndex(dt=>dt.productId===theChosen.productId);
  newChosen.splice(index,1)
  setchosen(newChosen)
setproduct([])
  setareUSureModal(false),
  setmodifyChosenModal(false),
  console.log(index)

  }
   {/*                 handleAddScannedProd                 */}
 export const handleAddScannedProd=async(theChosen,scannedProd,quantity,price,
  setchosen,user,chosen,setproduct)=>{
let newProd={...scannedProd}
let newChosen=[...chosen]
newProd.quantity=quantity;
newProd.ByuPrice=price;
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
  // console.log('scanned prod',stockAlert)
  }
   {/*                 handleScannedGting                 */}
 export const handleScannedGting=async(scannedGting,setscannedProd,
  setscannedProdModel,user,settheChosen,chosen,dispatch)=>{
  const {data:prod}=await getGrosseryByGting(scannedGting)
  let newProd={...prod[0]}
  newProd.quantity=1;
  newProd.ByuPrice=1;
  newProd.stockAlert=0;
  newProd.userId=user.userId;
  newProd.productId=newProd._id;
  // newProd.listId=selectedlistName._ids;
  let index=chosen.findIndex(dt=>dt.productId===newProd.productId)
  if(index==-1){
    settheChosen({})
    dispatch(selfServingAction.setTheProd({}));
  }else{
    settheChosen(chosen[index])
    dispatch(selfServingAction.setTheProd(chosen[index]));
    
  }
  setscannedProd(newProd)
  setscannedProdModel(true)
      //  console.log(prod)
  }
  {/*                 handleSaveChosen                 */}
 export const handleSaveSelfServing=async(chosen,user,setselfServingList,
  selfServingList,dispatch,setselfServingModal,setchosen,setselectedListName
,selectedListName,stockRedux)=>{
    let newselfServingList=[...selfServingList]
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
const {data:self_serving_list}=await addSelfservingList(listNameObj)
// console.log(self_serving_list)
newselfServingList.push(self_serving_list)
setselectedListName(self_serving_list)
dispatch(selfServingAction.addListName(newselfServingList));
dispatch(selfServingAction.setTheList(self_serving_list));
setselfServingList(newselfServingList)
// console.log("st_man_list",st_manual_order_list._id)
   chosen.map(async(chosenDt)=>{
    let newchosen={
      "Gting" : chosenDt.Gting,
      "quantity" : chosenDt.quantity,
      "listId" : selectedListName._id,
      "userId" : user.userId,
      "ByuPrice" : chosenDt.ByuPrice,
      "productId" : chosenDt.productId,
      "timestamp" : Date.now(),
      "stockAlert": chosenDt.stockAlert,
  }
    newchosen.listId=self_serving_list._id
    const {data:self_serving_prod}=await addSelfServingProd(newchosen)
    let newself_serving_prod={...self_serving_prod};
    newself_serving_prod.image_front_url=chosenDt.image_front_url
    newself_serving_prod.brands=chosenDt.brands
    newself_serving_prod.stockAlert=chosenDt.stockAlert
    dispatch(selfServingAction.pushProducts(newself_serving_prod));
    
    
    let {data:stockDb}=await getClientStock(user.userId,chosenDt._id)
    let newStockDb={...stockDb}
    if(stockDb.length===0){
      let stock={
        productId:chosenDt.productId,
        userId:user.userId,
        quantity:chosenDt.quantity,
        ByuPrice:chosenDt.ByuPrice,
        listId:newchosen.listId,
        Gting : chosenDt.Gting,
        stockAlert:chosenDt.stockAlert,
      }
      let {data:addstockdb}=await addStock(stock)
      dispatch(clientStockActions.pushAStock(addstockdb));
      
      console.log("addstockdb",addstockdb)
    }
    else{
      let newStockRedux=[...stockRedux]
      newStockDb.quantity=Number(chosenDt.quantity)+Number(newStockDbquantity)
      
      let {data:updatestockdb}=await updateStock(newStockDb_id,stockDb[0])
      let index=newStockRedux.findIndex(dt=>dt._id==newStockDb_id)
      newStockRedux[index]=updatestockdb
      dispatch(clientStockActions.addAStock(newStockRedux));
      // console.log("stock",updatestockdb)
    }
    // dispatch(stockListAction.pushStocks(stockDb));

   })
   setchosenModal(false)
   setchosen([])
  //  console.log(st_manual_order_list)
  }
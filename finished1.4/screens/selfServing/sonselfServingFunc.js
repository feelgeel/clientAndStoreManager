import { getProductByName, getGrosseryByGting } from "../../api/grosseryApi";
import *as selfServingAction from "../../redux/selfServing";
import *as clientStockActions from "../../redux/clientStock";
import { addSelfservingList } from "../../api/SelfServingApi";
import { addSelfServingProd, getSelfServingProd } from "../../api/SelfServingProdApi";
import { getClientStock,addStock,updateStock } from "../../api/ClientstockApi";
import moment from 'moment';
import { clientLoadListNames, loadClientListByFamId } from "../../api/client_ListNameApi";
import { clientLoadProducts, clientUpdateproduct } from "../../api/client_productApi";
{/*                 handleAddproducts                 */}
export const handleAddproducts=async(store,categ,Setproduct,chosen)=>{
    const {data:prod}=await getProductByName(store,categ);
    let finishedprod=[...prod];
    chosen.map(prodDt=>{
      let index=finishedprod.findIndex(dt=>dt._id===prodDt.productId)
      finishedprod.splice(index,1)
      // console.log(prodDt.productId)
    })
    Setproduct(finishedprod)
}
{/*                 handleCallClientList                 */}
export const handleCallClientList=async(setClientList,family)=>{
  const {data:clientList}=await loadClientListByFamId(family._id)
   console.log(clientList)
    setClientList(clientList)
}
 {/*                 handleRefresh                 */}
 export const handleRefresh=async(user,item)=>{
  // const {data:clientProd}=await clientLoadProducts(user.userId,item._id)
  // setselfServingList(clientProd)
  
}
{/*                 handleAddToSelfServing                 */}
export const handleAddToSelfServing=async(chosen,selfServingProd,user,
  selectedListName,setselfServModal)=>{
    const {data:clientProdDb}=await clientLoadProducts(user.userId,
      selectedListName._id)
    let newclientProdDb=[...clientProdDb]
    newclientProdDb.map(dt=>{
      chosen.map(async(ft)=>{
        if(dt.Gting==ft.Gting){
          let newQuant= Number(dt.quantity)-Number(ft.quantity)
          dt.quantity=newQuant
          if(newQuant==0){
            dt.status=true
          }
          console.log(dt,ft)
          const {data:updateclient}=await clientUpdateproduct(dt._id,dt)
          const {data:SelfServingProd}=await addSelfServingProd(ft)
      }

    })
  })
  setselfServModal(false)
    }
{/*                 handleSetClientList                 */}
export const handleSetClientList=async(user,item,setselectedListName,
  setselfServingModal,setselfServingProd,setchosen,
  setclientProd)=>{
  const {data:clientProdDb}=await clientLoadProducts(user.userId,item._id)
  let newclientProdDb=[...clientProdDb]
  newclientProdDb=newclientProdDb.filter(dt=>dt.quatity!==0)
  setselfServingProd(newclientProdDb)
  // setclientProd(selfServingProd)
    setselectedListName(item)
    setchosen([])
    setselfServingModal(true)
    console.log("clientProdDb",user.userId,item._id)
}
export const handleUnselected=async(dt,setquantityModal,
  settheChosen,setselfServingProd)=>{
    settheChosen(dt)
    setselfServingProd(dt)
    setquantityModal(true);
    // console.log(dt)
  }
  {/*                 handleAddToChosen                 */}
export const handleAddToChosen=(formDt,theChosen,setchosen,setquantityModal,
  selfServingProd,setselfServingProd)=>{
    let newSelfServing=[]
    let newChosen=[]
    let NewtheChosen={...formDt}
    NewtheChosen.Gting=theChosen.Gting
    NewtheChosen._id=theChosen._id
    NewtheChosen.brands=theChosen.brands
    NewtheChosen.image_front_url=theChosen.image_front_url
    NewtheChosen.listId=theChosen.listId
    NewtheChosen.productId=theChosen.productId
    NewtheChosen.userId=theChosen.userId
    
    // let newDt={...formDt,...theChosen}
setchosen(NewtheChosen)
// console.log(NewtheChosen)
selfServingProd.map(dt=>{
  if(dt.Gting==NewtheChosen.Gting){
    let newQuant= Number(dt.quantity)-Number(NewtheChosen.quantity)
    // NewtheChosen.quantity=newQuant
    dt.quantity=newQuant
    // console.log("newquant",NewtheChosen)
    // console.log(dt,theChosen)
    if(newQuant!==0){
      newSelfServing.push(dt)
      newChosen.push(NewtheChosen)
    }else{
      newChosen.push(NewtheChosen)
    }
  }
})
setchosen(newChosen)
setselfServingProd(newSelfServing)
setquantityModal(false)
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
      //  console.log(index)
  }
   {/*                 handleDeleteProduct                 */}
 export const handleDeleteProduct=async(chosen,theChosen,setchosen,
  setareUSureModal,setmodifyChosenModal,setproduct)=>{
  let newChosen=[...chosen];
  let index=newChosen.findIndex(dt=>dt.productId===theChosen.productId);
  newChosen.splice(index,1)
  setchosen(newChosen)
setproduct([])
  setareUSureModal(false)
  setmodifyChosenModal(false)
  // console.log(index)

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
      
      // console.log("addstockdb",addstockdb)
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
import { getProductByName, getGrosseryByGting } from "../../api/grosseryApi";
import moment from 'moment';
import { addManualOrderList } from "../../api/storeManualOrderListApi";
import { AddManualorderProd, UpdateManualorderProd,
   RemoveManualorderProd } from "../../api/storeManualOrderProductsApi";
import *as storeMaualorderListAction from "../../redux/storeMaualorderList";
import *as stockListAction from "../../redux/StoreStock";
import {sortBy} from "underscore"
import { addStock, getStock, getManualorderStock, updateStock,
  getStockByProdId, deleteStock,getUserStock } from "../../api/stockApi";
import { getStockAlert, getStockAlertByUser } from "../../api/stockAlertApi";
import { getGlobalStockByProdId, addGlobalStock, updateGlobalStock } from "../../api/globalStockApi";
import { getperimationAlertbyUser } from "../../api/perimationAlertApi";

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
{/*                 handleunselected                 */}
export const handleUnselected=async(dt,setquantityModal,settheChosen,user,setselectedStock)=>{
  // const {data:stockprod}=await getStock(user.userId,dt.Gting,dt._id)
  // setselectedStock(stockprod)
  settheChosen(dt)
  setquantityModal(true);
  // console.log(dt)
}
{/*                 handleAddToChosen                 */}
export const handleAddToChosen=async(theChosen,selectedListName,
    quantity,setquantityModal,
    product,setproduct,
    chosen,setchosen,user,price,benefit,stockAlert,perimationDate,
    perimationAlert,values)=>{
        let newproduct=[...product];
        let newChosen=[...chosen];
        let newThechosen={...theChosen}
        let sellPrice=price*(1+Number(benefit)/100)
        let index=product.findIndex(dt=>dt._id==theChosen._id);
        newThechosen.quantity=values.quantity
        newThechosen.listId=selectedListName._id
        newThechosen.userId=user.userId
        newThechosen.ByuPrice=values.ByuPrice
        newThechosen.productId=newThechosen._id
        newThechosen.benefit=values.benefit
        newThechosen.perimationDate=values.perimationDate
        newThechosen.perimationAlert=values.perimationAlert
        newThechosen.sellPrice=sellPrice
        newThechosen.stockAlert=values.stockAlert
        newThechosen.timestamp=Date.now();
        let {data:prodDb}=await getStockByProdId(user.userId,theChosen._id)
    if(prodDb.length==0){
      newThechosen.priority=true
    }else{
      let stockPerimation=[]
    let current = moment().startOf('day');
    let given = moment(newThechosen.perimationDate, "DD-MM-YYYY");
    let theChosenPerimation=moment.duration(given.diff(current)).asDays();
    let perimationObj={time:theChosenPerimation,_id:"doesn't exist",priority:false}
    stockPerimation.push(perimationObj)
    // console.log(theChosenPerimation)
      // let priority=[]
      prodDb.map(dt=>{
    let given = moment(dt.perimationDate, "DD-MM-YYYY");
    let stock=moment.duration(given.diff(current)).asDays();
    stockPerimation.push({...dt,time:stock,_id:dt._id,priority:false})
  })
    stockPerimation=sortBy(stockPerimation, 'time')
    stockPerimation[0].priority=true
    // console.log(stockPerimation)
    newThechosen.priority=stockPerimation
}
newproduct.splice(index,1)
setproduct(newproduct)
newChosen.push(newThechosen);
setchosen(newChosen);
setquantityModal(false)
console.log(values)
    }
 {/*                 handleChosenClicked                 */}
 export const handleChosenClicked=(selecteditem,settheChosen,
  setModifyChosenModal,dispatch,setprice,setquantity,setbenefit,chosen)=>{
    settheChosen(selecteditem)
    dispatch(storeMaualorderListAction.setTheProd(selecteditem));
    setprice(selecteditem.ByuPrice)
    setquantity(selecteditem.quantity)
    setbenefit(selecteditem.benefit)
    setModifyChosenModal(true)
    // console.log(chosen)
  }
 {/*                 handleSaveChosen                 */}
 export const handleSaveManualListAndProd=async(chosen,user,setmanualOrderLists,
  manualOrderLists,dispatch,setchosenModal,setchosen,setselectedListName,selectedListName,
  benefit)=>{
    let newmanualOrderlist=[...manualOrderLists]
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
const {data:st_manual_order_list}=await addManualOrderList(listNameObj)
newmanualOrderlist.push(st_manual_order_list)
setselectedListName(st_manual_order_list)
dispatch(storeMaualorderListAction.addListName(newmanualOrderlist));
dispatch(storeMaualorderListAction.setTheList(st_manual_order_list));
setmanualOrderLists(newmanualOrderlist)
// console.log("st_man_list",st_manual_order_list._id)
   chosen.map(async(chosenDt)=>{
     let sellPrice=chosenDt.ByuPrice*(1+chosenDt.benefit/100);
    let newchosen={
      "Gting" : chosenDt.Gting,
      "quantity" : chosenDt.quantity,
      "listId" : selectedListName._id,
      "userId" : user.userId,
      "ByuPrice" : chosenDt.ByuPrice,
      "productId" : chosenDt.productId,
      "timestamp" : Date.now(),
      "benefit": chosenDt.benefit,
      "stockAlert": chosenDt.stockAlert,
  }
    newchosen.listId=st_manual_order_list._id
    const {data:st_manual_order_prod}=await AddManualorderProd(newchosen)
    let new_st_manual_order_prod={...st_manual_order_prod};
    new_st_manual_order_prod.image_front_url=chosenDt.image_front_url
    new_st_manual_order_prod.brands=chosenDt.brands
    new_st_manual_order_prod.stockAlert=chosenDt.stockAlert
    dispatch(storeMaualorderListAction.pushProducts(new_st_manual_order_prod));

    let stock={
      productId:chosenDt.productId,
      userId:user.userId,
      quantity:chosenDt.quantity,
      ByuPrice:chosenDt.ByuPrice,
      sellPrice,
      listId:newchosen.listId,
      Gting : chosenDt.Gting,
      Benefit:chosenDt.benefit,
      stockAlert:chosenDt.stockAlert,
      listType:"manual order",
      perimationDate:chosenDt.perimationDate,
      perimationAlert:chosenDt.perimationAlert,
      image_front_url:chosenDt.image_front_url,
    }
    if(typeof chosenDt.priority=="object"){
      let prio=chosenDt.priority
      // console.log(chosenDt.priority)
      let index=prio.findIndex(dt=>dt._id=="doesn't exist");
      stock.priority=prio[index].priority
      let newStockDb=prio.filter(dt=>dt._id!=="doesn't exist")
      newStockDb.map(async(dt)=>{
        let {data:updateStockDb}=await updateStock(dt._id,dt)
      })

    }else{
      stock.priority=true
    }
    let {data:stockDb}=await addStock(stock) 
    dispatch(stockListAction.pushStocks(stockDb));
    let globalstockdb=await getGlobalStockByProdId(user.userId,chosenDt.productId) 
    // console.log('globalstockdb',globalstockdb)
    let datastockGlob=globalstockdb.data
    if(globalstockdb.ok){
      if(datastockGlob.length==0){
        let {data:globalstockdb}=await addGlobalStock(stock) 
        console.log( "addstock")
      }else{
        let newglobalstockdb=datastockGlob[0]
        // console.log(newglobalstockdb)
        newglobalstockdb.quantity=Number(newglobalstockdb.quantity)+Number(chosenDt.quantity)
        let {data:updateglobStock}=await updateGlobalStock(newglobalstockdb._id,newglobalstockdb) 
        console.log("newglobalstockdb", updateglobStock)
        
      }
    }
    })
   setchosenModal(false)
   setchosen([])
  }
 {/*                 handleUpdatemanual list and prod*/}
 export const handleUpdateManualListAndProd=async(chosen,user,setmanualOrderLists,
  manualOrderLists,dispatch,setchosenModal,setchosen,
  setselectedListName,selectedListName,theChosenRedux)=>{
    let index;
    let newChosenProd=[];
    let newChosen=[...chosen];
    theChosenRedux.map(async(dt)=>{
      // let newstockDb=[...stockDb]
      // console.log(stockDb)
      let newDt={...dt}
      index=chosen.findIndex(ch=>ch.productId==dt.productId)
      let stockDb=await getManualorderStock(user.userId,
        selectedListName._id,dt.productId)
      if(index!==-1){
          if(stockDb.ok){
            let selectedChosen={...chosen[index]};
            let newChosenObj={...newChosen[index]}
            let sellprice=
            Number(selectedChosen.ByuPrice)*(1+Number(selectedChosen.benefit)/100)
            // if(dt.quantity!==selectedChosen.quantity){
              // newDt.quantity=selectedChosen.quantity
              newDt.quantity=selectedChosen.quantity
              newDt.ByuPrice=selectedChosen.ByuPrice
              newDt.benefit=selectedChosen.benefit
              newDt.stockAlert=selectedChosen.stockAlert
              newDt.sellPrice=sellprice

              stockDb.data[0].quantity=selectedChosen.quantity
              stockDb.data[0].ByuPrice=selectedChosen.ByuPrice
              stockDb.data[0].benefit=selectedChosen.benefit
              stockDb.data[0].stockAlert=selectedChosen.stockAlert
              stockDb.data[0].sellPrice=sellprice
              const {data:update_manual_order_prod}=
              await UpdateManualorderProd(newDt._id,selectedChosen)
              let {data:updateStockDb}=await updateStock(stockDb.data[0]._id,
                stockDb.data[0])
              
              }
        }else{
         const {data:delete_manual_order_prod}=await RemoveManualorderProd(dt._id)
         let {data:deleteStockDb}=await deleteStock(stockDb.data[0]._id)
        //  console.log(deleteStockDb)
          }
    })

    chosen.map(async(dt)=>{
      let sellPrice=dt.ByuPrice*(1+dt.benefit/100);
      index=theChosenRedux.findIndex(ch=>ch.productId==dt.productId)
      if(index==-1){
        const {data:add_manual_order_prod}=await AddManualorderProd(dt)
        let stock={
          productId:dt.productId,
          userId:user.userId,
          quantity:dt.quantity,
          ByuPrice:dt.ByuPrice,
          sellPrice,
          listId:selectedListName._id,
          Gting : dt.Gting,
          Benefit:dt.benefit,
          stockAlert:dt.stockAlert,
          listType:"manual order",
        }
        let {data:stockDb}=await addStock(stock)
        // newChosen.push(add_manual_order_prod)
        // console.log("add prod to da server",stock)
      }
    })
    // setchosen(newChosen)
    // dispatch(storeMaualorderListAction.addProducts(newChosen));
// console.log("selected listname redux",chosen)
  }
 {/*                 handleDeleteProduct                 */}
 export const handleDeleteProduct=async(chosen,theChosen,setchosen,
  setareUSureModal,setModifyChosenModal,setproduct)=>{
  let newChosen=[...chosen];
  let index=newChosen.findIndex(dt=>dt.productId===theChosen.productId);
  newChosen.splice(index,1)
  setchosen(newChosen)
setproduct([])
  setareUSureModal(false)
  setModifyChosenModal(false)
  // console.log(index)
  }
 {/*                 handleUpdateTheChosenQuant                 */}
 export const handleUpdateTheChosenQuant=(quantity,price,
  settheChosen,chosen,setchosen,theChosen,benefit,stockAlert)=>{
    let newProd={...theChosen}
    let newChosen=[...chosen]
       newProd.quantity=quantity
       newProd.ByuPrice=price
       newProd.benefit=benefit
       newProd.stockAlert=stockAlert
       let index=newChosen.findIndex(dt=>dt.productId==newProd.productId)
       newChosen.[index]=newProd
       setchosen(newChosen)
      //  console.log(index)
  }
 {/*                 handleScannedGting                 */}
 export const handleScannedGting=async(scannedGting,setscannedProd,
  setscannedProdModel,user,settheChosen,theChosen,chosen,dispatch,
  setscannedgtingResChosen,setscannedgtingResProd,setselectedProd)=>{
    const {data:prod}=await getGrosseryByGting(scannedGting)
    let newChosen=chosen.filter(dt=>dt.Gting===scannedGting)
  setscannedgtingResProd(prod[0])
  setscannedgtingResChosen(newChosen)
  // let newProd={...prod[0]}
  // newProd.quantity=1;
  // newProd.ByuPrice=1;
  // newProd.stockAlert=0;
  // newProd.userId=user.userId;
  // newProd.productId=newProd._id;
  // // newProd.listId=selectedlistName._ids;
  // if(index==-1){
  //   settheChosen({})
  //   dispatch(storeMaualorderListAction.setTheProd({}));
  // }else{
  //   settheChosen(chosen[index])
  //   dispatch(storeMaualorderListAction.setTheProd(chosen[index]));
    
  // }
  if(prod.length!==0){
    setselectedProd(prod[0])

  }else{
    setselectedProd({})
  }
  setscannedProd(prod)
  setscannedProdModel(true)
      //  console.log("newchosen",prod[0])
  }
 {/*                 handleAddScannedProd                 */}
 export const handleAddScannedProd=async(theChosen,scannedProd,quantity,price,
  setchosen,user,chosen,setproduct,benefit,stockAlert,values,setscannedgtingResProd)=>{
let newProd={...setscannedgtingResProd}
let newChosen=[...chosen]
newProd.quantity=values.quantity;
newProd.ByuPrice=values.ByuPrice;
newProd.benefit=values.benefit;
newProd.stockAlert=values.stockAlert;
newProd.userId=user.userId;
newProd.productId=newProd._id;
newProd.perimationDate=values.perimationDate
newProd.perimationAlert=values.perimationAlert
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
  // console.log('scanned prod',newProd)
  // console.log('scanned prod',quantity)
  // console.log('scanned prod',stockAlert)
  }
  export const handleSetListProducts=(item,setchosen,listproducts,setproduct,
    dispatch)=>{
  // let newListProd=[...listproducts];
  let selectedlistid=item._id;
  let finishedChosen=[]
  listproducts.map(chosen=>{
    if(chosen.listId==selectedlistid){
      finishedChosen.push(chosen)
    }
    // console.log(chosen)
  })
  setchosen(finishedChosen)
  dispatch(storeMaualorderListAction.setTheChosen(finishedChosen));
  setproduct([])
  
  }
export const handleGetStock=async(user,setproduct)=>{
  const {data:st_Alert}=await getStockAlertByUser(user.userId)
  setproduct(st_Alert)
  // let stockAlertDb=userStock.filter(dt=>dt.quantity==dt.stockAlert)
  // console.log(st_Alert)
}
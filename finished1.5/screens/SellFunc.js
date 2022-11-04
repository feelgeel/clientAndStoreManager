import { getProductByName } from "../../api/grosseryApi";
import moment from 'moment';
import { addListNameSell } from "../../api/sellApi";
import { addProductSell } from "../../api/sellProductApi";
import { AddManualorderProd, UpdateManualorderProd,
   RemoveManualorderProd } from "../../api/storeManualOrderProductsApi";
import *as storeSellListAction from "../../redux/st_sell";
import { addStock,getStock, deleteStock,
   updateStock,getUserStock,getStockByGting,
    getStockById, 
    getStockByProdId} from "../../api/stockApi";
import { getGlobalStockByProdId, updateGlobalStock } from "../../api/globalStockApi";
import { addStockAlert } from "../../api/stockAlertApi";
import {sortBy} from "underscore"
import { addPerimationAlert } from "../../api/perimationAlertApi";

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
{/*                 handleAddASell                 */}
export const handleAddASell=async(user,setsellModal,setchosen,setproduct)=>{
  const {data:userStock}=await getUserStock(user.userId)
  // console.log(user)
  setproduct(userStock)
  setsellModal(true);
  setchosen([]);
}
{/*                 handleunselected                 */}
export const handleUnselected=async(dt,setquantityModal,settheChosen,
  user,setselectedStock,product,setduplication,chosen,selectedStock,
  setscannedgtingResChosen,setscannedgtingResProd)=>{
  // const {data:stockprod}=await getStock(user.userId,dt.Gting,dt._id)
  // let newprod=product.filter((m)=>m.productId==dt.productId)
  setselectedStock(dt)
  let newProd=product.filter((m)=>m.productId==selectedStock.productId)
  let newChosen=chosen.filter((m)=>m.productId==selectedStock.productId)
  setscannedgtingResChosen(newChosen),
  setscannedgtingResProd(newProd)
  settheChosen(dt)
  // setduplication(newprod)
  // setselectedStock(newprod[0])
  setquantityModal(true);
  // console.log(dt)
}
{/*                 handleAddToChosen                 */}
export const handleAddToChosen=async(theChosen,selectedListName,
    quantity,setquantityModal,
    product,setproduct,chosen,setchosen,user,
    price,benefit,selectedStock)=>{
        let newproduct=[...product];
        let newChosen=[...chosen];
        let newSelectedStock={...selectedStock}
        let index=newproduct.findIndex(dt=>dt._id==selectedStock._id);
        newSelectedStock.stockQuantity=newSelectedStock.quantity
        newSelectedStock.quantity=quantity
          newproduct.splice(index,1)
          setproduct(newproduct)
        newChosen.push(newSelectedStock);
        setchosen(newChosen);
        setquantityModal(false);
        // console.log(newSelectedStock)
}
 {/*                 handleChosenClicked                 */}
 export const handleChosenClicked=(selecteditem,settheChosen,
  setmodifyChosenModal,dispatch,setquantity)=>{
    settheChosen(selecteditem)
    setquantity(selecteditem.quantity)
    dispatch(storeSellListAction.setTheProd(selecteditem));
    setmodifyChosenModal(true)
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
// const {data:listNameSale}=await addListNameSell(listNameObj)
// NewSellList.push(listNameSale)
// setselectedListName(listNameSale)
// dispatch(storeSellListAction.addListName(NewSellList));
// dispatch(storeSellListAction.setTheList(listNameSale));
// setsellList(NewSellList)
// console.log("st_man_list",st_manual_order_list._id)
   chosen.map(async(chosenDt)=>{
     let newChosen={...chosenDt}
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
    // newchosen.listId=listNameSale._id
    // const {data:st_sell_prod}=await addProductSell(newchosen)
    // let new_st_sell_prod={...st_sell_prod};
    // new_st_sell_prod.image_front_url=chosenDt.image_front_url
    // new_st_sell_prod.brands=chosenDt.brands
    // dispatch(storeSellListAction.pushProducts(new_st_sell_prod));

    // const {data:chosenStock}=await getStockById(user.userId,chosenDt._id)
    // let chosenStockDb=chosenStock[0]
    // let newStockprod={...stockprod[0]}
    let newQuantStock=Number(chosenDt.stockQuantity)-Number(chosenDt.quantity)
    newChosen.quantity=newQuantStock
    // console.log(newQuantStock)
    const {data:GlobalstockByProdId}=await getGlobalStockByProdId(user.userId,chosenDt.productId)
    let newGlobalStockByProdId=GlobalstockByProdId[0]  
    newGlobalStockByProdId.quantity=Number(newGlobalStockByProdId.quantity)-Number(chosenDt.quantity)
    const {data:updateglobalstock}=await updateGlobalStock(newGlobalStockByProdId._id,newGlobalStockByProdId)
    // console.log("newChosen",newChosen)
    if(newQuantStock==0){
      const {data:deleteStockDb}=await deleteStock(chosenDt._id)
      // newstockByProdId.quantity=Number(newstockByProdId.quantity)-6
      // console.log(newstockByProdId)
      if(newGlobalStockByProdId.quantity==0){
        const {data:AddstockAlert}=await addStockAlert(chosenDt)


        // console.log("call stock",updateglobalstock)
      }
      else{
        // console.log("not zero")
        let stockPerimation=[]
        let {data:prodDb}=await getStockByProdId(user.userId,chosenDt.productId)
        prodDb.map(async(dt)=>{
          let current = moment().startOf('day');
          let given = moment(dt.perimationDate, "DD-MM-YYYY");
          let stock=moment.duration(given.diff(current)).asDays();
          stockPerimation.push({...dt,time:stock,_id:dt._id,priority:false})
        })
        stockPerimation=sortBy(stockPerimation,'time')
         stockPerimation[0].priority=true;
         stockPerimation.map(async(dt)=>{
          let {data:updateStockDb}=await updateStock(dt._id,dt)
          // console.log(dt.priority)
        })
        // console.log("call stock",stockPerimation)
      }
    }else{
      const {data:updateglobalstock}=await updateGlobalStock(newGlobalStockByProdId._id,newGlobalStockByProdId[0])      
      let {data:updateStockDb}=await updateStock(newChosen._id,newChosen)
      let current = moment().startOf('day');
      let given = moment(newChosen.perimationDate, "DD-MM-YYYY");
      let stockperimation=moment.duration(given.diff(current)).asDays();
      let perimationAlert=newChosen.perimationAlert
      newChosen.perimationDate=newChosen.perimationAlert
      if(stockperimation==perimationAlert){
        let {data:updateStockDb}=await addPerimationAlert(newChosen)
      }
      // console.log(stockperimation,perimationAlert)
    }
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
  setareUSureModal,setModifyChosenModal,setproduct,product,user)=>{
    const {data:userStock}=await getUserStock(user.userId)
    let prodindex=userStock.findIndex((dt)=>dt._id==theChosen._id)
    let newProd=[...product]
    newProd.push(userStock[prodindex])
    setproduct(newProd)
  let newChosen=[...chosen];
  let index=newChosen.findIndex(dt=>dt.productId===theChosen.productId);
  newChosen.splice(index,1)
  setchosen(newChosen)
  setareUSureModal(false)
  setModifyChosenModal(false)
  // console.log(prodindex)

  }
 {/*                 handleUpdateTheChosenQuant                 */}
 export const handleUpdateTheChosenQuant=(quantity,price,
  settheChosen,chosen,setchosen,theChosen)=>{
    let newProd={...theChosen}
    let newChosen=[...chosen]
       newProd.quantity=quantity
       let index=newChosen.findIndex(dt=>dt.productId==newProd.productId)
       newChosen.[index]=newProd
       setchosen(newChosen)
      //  console.log(index)
  }
 {/*                 handleScannedGting                 */}
 export const handleScannedGting=async(scannedGting,setscannedProd,
  setscannedProdModel,user,settheChosen,theChosen,chosen,dispatch,product,
  setscannedgtingResChosen,setscannedgtingResProd,setselectedStock)=>{
    let newProd=product.filter((m)=>m.Gting==scannedGting)
    let newChosen=chosen.filter((m)=>m.Gting==scannedGting)
    // const {data:userStock}=await getStockByGting(user.userId,scannedGting)
  // let newProd={...prod[0]}
  // newProd.quantity=1;
  // newProd.price=1;
  // newProd.userId=user.userId;
  // newProd.productId=newProd._id;
  // // newProd.listId=selectedlistName._ids;
  // let index=chosen.findIndex(dt=>dt.productId===newProd.productId)
  // if(index==-1){
  //   settheChosen({})
  //   dispatch(storeSellListAction.setTheProd({}));
  // }else{
  //   settheChosen(chosen[index])
  //   dispatch(storeSellListAction.setTheProd(chosen[index]));
    
  // }
  setscannedgtingResChosen(newChosen)
  setscannedgtingResProd(newProd)
  if(newProd.length!==0){
    setselectedStock(newProd[0])
  }else{
    setselectedStock({})
  }
  // setscannedProd(newProd)
  setscannedProdModel(true)
      //  console.log(newProd[0])
      
  }
 {/*                 handleAddScannedProd                 */}
 export const handleAddScannedProd=async(theChosen,scannedProd,quantity,price,
  setchosen,user,chosen,setproduct,benefit,selectedStock,product,setselectedStock)=>{
let newselectedStock={...selectedStock}
let newChosen=[...chosen]
let newproduct=[...product]
newselectedStock.quantity=quantity
let index=newproduct.findIndex(dt=>dt._id==selectedStock._id)
// newProd.quantity=quantity;
// newProd.price=price;
// newProd.benefit=benefit;
// newProd.userId=user.userId;
// newProd.productId=newProd._id;
// if(theChosen._id){
// let newQuantity=Number(newProd.quantity)+Number(theChosen.quantity)
// newProd.quantity=newQuantity
// // newProd.price=price
// let index=chosen.findIndex(dt=>dt.productId===newProd.productId)
// newChosen[index]=newProd
// setchosen(newChosen)
// }else{
//   newChosen.push(newProd)
// }
newproduct.splice(index,1)
newChosen.push(newselectedStock)
setchosen(newChosen)
setproduct(newproduct)
// setselectedStock({})
  // console.log("the chosen",index)
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
    // console.log(chosen)
  })
  setchosen(finishedChosen)
  dispatch(storeSellListAction.setTheChosen(finishedChosen));
  setproduct([])
  
  }
 {/*                 handleGetStock                 */}
export const handleGetStock=async(user,setproduct)=>{
 
}
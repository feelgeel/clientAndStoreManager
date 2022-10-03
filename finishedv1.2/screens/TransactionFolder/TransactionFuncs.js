import { GetTransactions, getTransStoreNotDone } from "../../api/transactionApi";
import { clientLoadProducts } from "../../api/client_productApi";
import { getStock } from "../../api/stockApi";
import { addtransaction,updatest_trans } from "../../api/transactionApi";
import *as transationListAction from "../../redux/Transaction";
import *as counterActions from "../../redux/counter";
import { addtransactionProd,getTransactionProd, updatestTransProd } from "../../api/transactionProdApi";

export const handleBarCodeScanned=async(user,scannedObj,setscanQrModal,
    dispatch,settransactionList,transactionList,counter,setlistExistModal)=>{
        let newCounter=counter+1
        dispatch(counterActions.counterUp())
        if(transactionList.length==0){
            dispatch(counterActions.reset())
            newCounter=1
        }
    let transProd={};
    let clientId=scannedObj.clientId;
    let listId=scannedObj.listId;
    // clientId:String,
    // supplierId:String,
    // timeStamp:Number,
    // listId:String,
    // status:String,
    // paymentMethode:String
    let newTransactionList=[...transactionList]
    newTransactionList.map(dt=>{
        if(dt.clientId==scannedObj.clientId){
            
        }
    })
    let filtered=transactionList.filter(trans=>trans.clientId==scannedObj.clientId)
    if(filtered.length==0){

        // console.log("filtered",filtered)
  
    let transactionobj={
        clientId,
        listId,
        supplierId:user.userId,
        status:"waiting for confirmation from client",
        timeStamp:Date.now(),
        ticket:newCounter
    }
    const{data:transactionListDb}=await addtransaction(transactionobj)
    newTransactionList.push(transactionListDb)
    dispatch(transationListAction.pushListName(transactionListDb))
    settransactionList(newTransactionList)
    const {data:loadClientProd}=await clientLoadProducts(clientId,listId)
    loadClientProd.map(async(dt)=>{
      
        const {data:getStockDb}=await getStock(user.userId,dt.Gting,dt.productId)
        if(getStockDb.length==0){
             transProd={
                transactionId:transactionListDb._id,
                productId:dt.productId,
                Gting:dt.Gting,
                quantity:dt.quantity,
                stockQuantity:0,
                status:"we don't have this prod" ,
            }
           
        }else{
            let stockQuantity=Number(getStockDb[0].quantity)
            let quantitytResult=stockQuantity-Number(dt.quantity)
            if(quantitytResult>=0){
                 transProd={
                    transactionId:transactionListDb._id,
                    productId:dt.productId,
                    Gting:dt.Gting,
                    quantity:dt.quantity,
                    stockQuantity:dt.quantity,
                    price:getStockDb[0].sellPrice,
                }
   

            }else{
                 transProd={
                    transactionId:transactionListDb._id,
                    productId:dt.productId,
                    Gting:dt.Gting,
                    quantity:dt.quantity,
                    stockQuantity:getStockDb[0].quantity,
                    price:getStockDb[0].sellPrice,
                }
            }
         
        }
        // console.log(user.userId,dt.Gting,dt.productId)
        let transactionProd={}
        console.log(transProd)
    const{data:transactionProds}=await addtransactionProd(transProd)
    dispatch(transationListAction.pushProducts(transactionProds))
         
    })
    
}else{
    setlistExistModal(true)
}
setscanQrModal(false)
}
export const handleCallTransactions=async(user,setTransactionList)=>{
const {data:transList}=await getTransStoreNotDone(user.userId)
setTransactionList(transList)
// console.log(transList)
}
export const handleVerificationList=async(item,setverificationModal,
    settransProd,setverified,verified,settheList)=>{
        settheList(item)
    const {data:getTransProd}=await getTransactionProd(item._id)
    let newTransprod=[...getTransProd]
    let newVerified=[...verified]
    newTransprod.map(dt=>{
        let index= newTransprod.findIndex(chosen=>chosen._id==dt._id)
       if(dt.status){
        newVerified.push(dt)
       newTransprod.splice(index,1)
       
       }else{
        newVerified.splice(index,1)
        newTransprod.push(dt)
       }
    })
    settransProd(newTransprod)
    setverified(newVerified)
    console.log(newVerified)
   
setverificationModal(true)
}
export const handleunselected=(dt,setTheproduct,setverifiedModal)=>{
console.log(dt)
setTheproduct(dt)
setverifiedModal(true)
}
export const handleVerified=async(Theproduct,setTheproduct,transProd,
    settransProd,setverifiedModal,setverified,verified)=>{
    let newDaProd={...Theproduct}
    let newTransprod=[...transProd]
    let newVerified=[...verified]
    let index=newTransprod.findIndex(dt=>dt._id==newDaProd._id)
    newDaProd.status="verifed"
    // newTransprod[index]=newDaProd
    newTransprod.splice(index,1)
    newVerified.push(newDaProd)
    setverified(newVerified)
    settransProd(newTransprod)
    setTheproduct(newDaProd)
    const {data:updatetransProd}=await updatestTransProd(newDaProd._id,newDaProd)
    console.log(newDaProd) 
    setverifiedModal(false)
}
export const handleSaveVerified=async(theList,settheList,
    settransactionList,transactionList,setverificationModal)=>{
let newtheList={...theList}
let newtransactionList=[...transactionList]
let index=newtransactionList.findIndex(dt=>dt._id==newtheList._id)
newtheList.status="waiting for payment from client"
const {data:updateTransList}=await updatest_trans(newtheList._id,newtheList)
newtransactionList[index]=newtheList
settheList(updateTransList)
settransactionList(newtransactionList)
setverificationModal(false)
console.log(updateTransList)
}
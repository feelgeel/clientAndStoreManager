import { GetTransactions } from "../../api/store_transactionApi";
import { clientLoadProducts } from "../../api/client_productApi";
import { getStock } from "../../api/stockApi";
import { addtransaction,updatest_trans, getTransClientNotDone } from "../../api/transactionApi";
import *as transationListAction from "../../redux/Transaction";
import { addtransactionProd,getTransactionProd,updatestTransProd } from "../../api/transactionProdApi";
import {  getGrosseryById } from "../../api/grosseryApi";
import { getAUser, updateUser } from "../../api/users";
import { addcashtransaction } from '../../api/cashTransactionApi';
export const handleBarCodeScanned=async(user,scannedObj,setscanQrModal,dispatch,settransactionList,transactionList)=>{
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
    let transactionobj={
        clientId,
        listId,
        supplierId:user.userId,
        status:"waiting for confirmation from client",
        timeStamp:Date.now(),
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
                transactionId:transactionList._id,
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
                    transactionId:transactionList._id,
                    productId:dt.productId,
                    Gting:dt.Gting,
                    quantity:dt.quantity,
                    stockQuantity:dt.quantity,
                    price:getStockDb[0].sellPrice,
                }
   

            }else{
                 transProd={
                    transactionId:transactionList._id,
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
setscanQrModal(false)
}
export const handleCallTransactions=async(user,setTransactionList,
    settransProd,transProd)=>{
        const translist=await getTransClientNotDone("625afc18923af92368524f40")
        if(translist.ok){
            let daId=translist.data[0]._id
            setTransactionList(translist.data)
            // settransProd(transProddb)
            
    //  const {data:transProddb}=await getTransactionProd(daId)
    //  let newTransProd=[...transProddb]
    // transProddb.map((dt)=>{
    //     newTransProd.push(dt)
    // })
    // console.log(transProddb) 
    // settransProd(transProddb)
}
// console.log(translist.data)
}

export const handleConfirmList=async(item,settransProd,setconfirmModal,settheList)=>{
    settheList(item)
    const{data:transProd}=await getTransactionProd(item._id)
    let newtr_prod=[...transProd]
    let mod_tr_prod=[]
    newtr_prod.map(async(tr_prod)=>{
        const{data:prodObj}=await getGrosseryById(tr_prod.productId)
        tr_prod.brands=prodObj[0].brands
        tr_prod.image_front_url=prodObj[0].image_front_url
        mod_tr_prod.push(tr_prod)
       
        settransProd(mod_tr_prod)
        console.log("ntr",mod_tr_prod)
    })
    setconfirmModal(true)
    
}
export const handleChosenClicked=(dt,setmodifyChosenModal,setTheproduct,setquantity)=>{
// console.log(dt)
setmodifyChosenModal(true)
setTheproduct(dt)
setquantity(dt.stockQuantity)
}
export const handleUpdateTransProd=async(dt,quantity,setTheproduct,settransProd,transProd)=>{
let newDt={...dt}
let newtransProd=[...transProd]
newDt.stockQuantity=quantity
const {data:updatestTransProdDb}=await updatestTransProd(dt._id,newDt)
let index=transProd.findIndex(dt=>dt._id==newDt._id)
newtransProd[index]=newDt
settransProd(newtransProd)
setTheproduct(newDt)
}
export const HandleDeleteTransProd=()=>{

}
export const handConfirmTransProd=async(theList,settransactionList,transactionList)=>{
    let newThelist={...theList}
    let newtransactionList=[...transactionList]
    newThelist.status="waiting for verification from the store"

    const {data:updateTrans}=await updatest_trans(newThelist._id,newThelist)
    let index=transactionList.findIndex(dt=>dt._id==theList._id)
    newtransactionList[index]=newThelist
    settransactionList(newtransactionList)

console.log(theList)
}
export const handlePaymentMethod=async(user,transProd,settransactionList,
    transactionList,setpaymentModal,settotalPrice)=>{
    const newTransProd=[...transProd]
    const newtransactionList=[...transactionList]
    let totalPrice=0
    newTransProd.map(dt=>{
        totalPrice=totalPrice+Number(dt.stockQuantity)*Number(dt.price)
        
    })
    const {data:dauser}=await getAUser(user.userId)
    let newDaUser={...dauser[0]}
    newDaUser.cash=Number(newDaUser.cash)-Number(totalPrice)
    const {data:updatedUserdb}=await updateUser(newDaUser._id,newDaUser)
    let cashTransObj={
        to:transactionList[0].supplierId,
        from:user.userId,
        timeStamp:Date.now(),
        status:true,
        cash:totalPrice,
        transactionId:transactionList[0]._id,
    }
    console.log(newDaUser)
    newtransactionList[0].status="waiting for client to get his product"
    const {data:transaction}=await addcashtransaction(cashTransObj)
    const {data:updateTrans}=await updatest_trans(newtransactionList[0]._id,
        newtransactionList[0])
    settransactionList(newtransactionList)
    setpaymentModal(false)
    settotalPrice(totalPrice)
    
}
export const handleButtonConfirmed=async(setareUSureModal,transProd,user,
    setnoCreditModal,theList,transactionList,settransactionList)=>{
    const newTransProd=[...transProd]
    let totalPrice=0
    newTransProd.map(dt=>{
        totalPrice=totalPrice+Number(dt.stockQuantity)*Number(dt.price)
        
    })
    if(Number(totalPrice)>Number(user.cash)){
        setnoCreditModal(true)
        console.log("pls charge ur credit account")
    }else{
        let newThelist={...theList}
    let newtransactionList=[...transactionList]
    newThelist.status="waiting for verification from the store"

    const {data:updateTrans}=await updatest_trans(newThelist._id,newThelist)
    let index=transactionList.findIndex(dt=>dt._id==theList._id)
    newtransactionList[index]=newThelist
    settransactionList(newtransactionList)
    }
}
export const handleGetProduct=async(transactionList,settransactionList,
    setgetProdModal)=>{
    const newtransactionList=[...transactionList]
    newtransactionList[0].status="done"
    const {data:updateTrans}=await updatest_trans(newtransactionList[0]._id,
        newtransactionList[0])
        settransactionList(newtransactionList)
        setgetProdModal(false)
}
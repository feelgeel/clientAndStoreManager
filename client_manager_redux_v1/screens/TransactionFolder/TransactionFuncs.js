import { GetTransactions } from "../../api/store_transactionApi";

export const handleBarCodeScanned=()=>{

}
export const handleCallTransactions=async(user,setTransactionList)=>{
const {data:transList}=await GetTransactions(user.userId)
setTransactionList(transList)
// console.log(transList)
}
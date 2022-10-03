import { addStoreWorker } from "../../api/StoreWorkerApi";

export const handleBarCodeScanned=({ })=>{

}
export const handleAddStoreWorkerMember=async(values,family,user,setaddFamModal)=>{
    let storeId=values.familyMemberId.familyMemberId
    let monthlyPay=values.monthlyPay
    let storeobj={
        timestamp:Date.now(),
        familyId:family._id,
        userId:storeId,
        monthlyPay:monthlyPay
    }
    const {data:StoreWorker}=await addStoreWorker(storeobj)
    setaddFamModal(false)
// console.log(StoreWorker)
}
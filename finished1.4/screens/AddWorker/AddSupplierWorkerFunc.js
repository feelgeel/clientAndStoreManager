
import {addSupplierWorker} from "../../api/suplierWorkerApi";

export const handleBarCodeScanned=({ })=>{

}
export const handleAddSupplierWorkerMember=async(values,family,setaddSupplierWorkerModal)=>{
    let storeId=values.familyMemberId.familyMemberId
    let monthlyPay=values.monthlyPay
    let storeobj={
        timestamp:Date.now(),
        familyId:family._id,
        userId:storeId,
        monthlyPay:monthlyPay
    }
    const {data:supplierWorker}=await addSupplierWorker(storeobj)
    setaddSupplierWorkerModal(false)
console.log(supplierWorker)
}
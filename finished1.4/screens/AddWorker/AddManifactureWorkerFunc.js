
import { AddManifactureWorker } from "../../api/manifactureWorkerApi";

export const handleBarCodeScanned=({ })=>{

}
export const handleAddManifactureWorkerMember=async(values,family,setaddSupplierWorkerModal)=>{
    let manifactureId=values.familyMemberId.familyMemberId
    let monthlyPay=values.monthlyPay
    let manifactureobj={
        timestamp:Date.now(),
        familyId:family._id,
        userId:manifactureId,
        monthlyPay:monthlyPay,
    }
    const {data:manifactureWorker}=await AddManifactureWorker(manifactureobj)
    setaddSupplierWorkerModal(false)
console.log(manifactureWorker)
}
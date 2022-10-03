import { addSon } from "../../api/sonApi";
import { addMother } from "../../api/mothereApi";
import { addDaughter } from "../../api/daughterApi";

export const handleBarCodeScanned=({ })=>{

}
export const handleAddFamilyMember=async(values,family,user,setaddFamModal)=>{
    let member=values.familyMember.label
    let FamMemberId=values.familyMemberId.familyMemberId
    let newaddObj={
        timestamp:Date.now(),
        familyId:family._id,
        userId:FamMemberId,
    }
    if(member=="son"){
        const{data:sonbyFamilyId}=await addSon(newaddObj)

    }
    else if(member=="mother"){
        const{data:motherbyFamilyId}=await addMother(newaddObj)

    }
    else if(member=="daughter"){
        const{data:daughterbyFamilyId}=await addDaughter(newaddObj)

    }
    setaddFamModal(false)
console.log(member)
}
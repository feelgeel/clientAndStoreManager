import { getFatherByUserId } from "../../api/FatherApi";
import { getFamilyById } from "../../api/FamillyApi";
import *as familyAction from "../../redux/family";
import *as fatherAction from "../../redux/father";
import *as AccounttypeAction from "../../redux/accountType";
import { getMotherByUserId } from "../../api/mothereApi";
import *as motherAction from "../../redux/mother";
import { getSonByUserId } from "../../api/sonApi";
import { getdaughterByUserId } from "../../api/daughterApi";
import *as manifactureWorkerAction from "../../redux/manifactureWorker";
import *as daughterAction from "../../redux/daughter";
import { getownerByUserId } from "../../api/ownerApi";
import { getStoreByUserId } from "../../api/storeApi";
import *as storeAction from "../../redux/store";
import *as ownerAction from "../../redux/owner";
import { getStoreWorkerByUserId } from "../../api/StoreWorkerApi";
import { getSupplierOwnerByUserId } from "../../api/supplierOwnerApi";
import { getSupplierByUserId } from "../../api/suplierApi";
import *as ownerSupplierAction from "../../redux/ownerSupplier";
import *as storeWorkerAction from "../../redux/storeWorker";
import *as supplierAction from "../../redux/supplier";
import { getSupplierWorkerByUserId } from "../../api/suplierWorkerApi";
import *as supplierWorkerAction from "../../redux/supplierWorker";
import { getManifactureByUserId } from "../../api/manifactureApi";
import *as manifactureAction from "../../redux/manifacture";
import *as ownerManifactureAction from "../../redux/ownerManifacture";
import { getManWorkerByUserId } from "../../api/manifactureWorkerApi";
import { getManOwnerByUserId } from "../../api/manifactureOwnerApi";
export const fatherAccount=async(father,user,dispatch,
    setfamilyLoginModal,setchangeAccountModal,account)=>{
    if(father._id){
        dispatch(AccounttypeAction.changeAccount(account))
        setchangeAccountModal(false)
      }else{
        const {data:fatherByUserId}=await getFatherByUserId(user.userId)
        if(fatherByUserId.length==0){
          setfamilyLoginModal(true)
          // console.log(FamilyByUserId)
        }else{
          const {data:FamilyByUserId}=await getFamilyById(fatherByUserId[0].familyId)
          dispatch(fatherAction.AddFather(fatherByUserId[0]))
          dispatch(familyAction.AddFamily(FamilyByUserId[0]))
          dispatch(AccounttypeAction.changeAccount(account))
          setchangeAccountModal(false)
        }
        dispatch(AccounttypeAction.changeAccount(account))
        setchangeAccountModal(false)
      }
}
export const motherAccount=async(mother,user,dispatch,setchangeAccountModal,
  setmotherModal,account)=>
{
    if(mother._id){
        dispatch(AccounttypeAction.changeAccount(account))
        setchangeAccountModal(false)
      }else{
        const {data:motherByUserId}=await getMotherByUserId(user.userId)
        if(motherByUserId.length==0){
          setmotherModal(true)
        }else{
          dispatch(motherAction.AddMother(motherByUserId[0]))
          dispatch(AccounttypeAction.changeAccount(account))
          setchangeAccountModal(false)
        }
      }
}
export const sonAccount=async(son,setchangeAccountModal,user,dispatch,
  setsonModal,account)=>{
    if(son._id){
        dispatch(AccounttypeAction.changeAccount(account))
        setchangeAccountModal(false)
      }else{
        const {data:sonByUserId}=await getSonByUserId(user.userId)
        if(sonByUserId.length==0){
            setsonModal(true)
        }else{
          dispatch(sonAction.AddSon(sonByUserId[0]))
          dispatch(AccounttypeAction.changeAccount(account))
          setchangeAccountModal(false)
        }
      }
}
export const daughterAccount=async(daughter,user,dispatch,setdaughterModal,
    setchangeAccountModal,account)=>{
    if(daughter._id){
        dispatch(AccounttypeAction.changeAccount(account))
        setchangeAccountModal(false)
      }else{
        const {data:daughterByUserId}=await getdaughterByUserId(user.userId)
        if(daughterByUserId.length==0){
          setdaughterModal(true)
        }else{
          dispatch(daughterAction.AddDaughter(daughterByUserId[0]))
          dispatch(AccounttypeAction.changeAccount(account))
          setchangeAccountModal(false)
        }
      }
}
export const storeOwnerAccount=async(owner,user,dispatch,setchangeAccountModal,
    setstoreOwnerModal,account)=>{
    if(owner._id){
        // console.log("storeOwner")
        setchangeAccountModal(false)
        dispatch(AccounttypeAction.changeAccount(account))
       }
       else{
         const {data:ownerByUserId}=await getownerByUserId(user.userId)
       if(ownerByUserId.length==0){
         setstoreOwnerModal(true)
        //  console.log("ownerByUserId",ownerByUserId)
       }else{
         const {data:storeByUserId}=await getStoreByUserId(user.userId)
         dispatch(ownerAction.AddOwner(ownerByUserId[0]))
         dispatch(storeAction.Addstore(storeByUserId[0]))
         dispatch(AccounttypeAction.changeAccount(account))
         setchangeAccountModal(false)
       }
       // setstoreOwnerModal(true)
     }
}
export const storeWorkerAccount=async(st_worker,user,dispatch,setchangeAccountModal,
    setstoreWorker,account)=>{
    if(st_worker._id){
        dispatch(AccounttypeAction.changeAccount(account))
        setchangeAccountModal(false)
      }else{
        const {data:storeWorker}=await getStoreWorkerByUserId(user.userId)
        if(storeWorker.length==0){
          setstoreWorker(true)
          console.log(storeWorker)
        }else{
          dispatch(storeWorkerAction.AddstoreWorkerDt(storeWorker[0]))
          dispatch(AccounttypeAction.changeAccount(account))
          setchangeAccountModal(false)
        }
      }
}
export const supplierAccount=async(supplierDt,user,dispatch,setchangeAccountModal,
    setsupplier,account)=>{
    if(supplierDt._id){
        // console.log("storeOwner")
        setchangeAccountModal(false)
        dispatch(AccounttypeAction.changeAccount(account))
      }else{
        const {data:supplierOwnerByUserId}=await getSupplierOwnerByUserId(user.userId)
        if(supplierOwnerByUserId.length==0){
          setsupplier(true)
          console.log(supplierOwnerByUserId)
        }else{
          const {data:supplierByUserId}=await getSupplierByUserId(user.userId)
          dispatch(ownerSupplierAction.AddOwnerSupplier(supplierOwnerByUserId))
          dispatch(supplierAction.AddSupplier(supplierByUserId))
          dispatch(AccounttypeAction.changeAccount(account))
          setchangeAccountModal(false)
        }
      }
}
export const supplierWorkerAccount=async(supplierWorker,user,dispatch,setchangeAccountModal,
    setsupplierWorkerModal,account)=>{
        if(supplierWorker._id){
            dispatch(AccounttypeAction.changeAccount(account))
            setchangeAccountModal(false)
          }else{
            const {data:supplierWorker}=await getSupplierWorkerByUserId(user.userId)
            
            if(supplierWorker.length==0){
            //   console.log("supplierWorker",supplierWorker)
              setsupplierWorkerModal(true)
            }else{
              dispatch(supplierWorkerAction.AddSupplierWorkerDt(supplierWorker[0]))
              dispatch(AccounttypeAction.changeAccount(account))
              setchangeAccountModal(false)
            }
          }
}
export const manifactureAccount=async(manifactureDt,user,dispatch,setchangeAccountModal,
    setmanifactureModal,account)=>{
        if(manifactureDt._id){
            // console.log("storeOwner")
            setchangeAccountModal(false)
            dispatch(AccounttypeAction.changeAccount(account))
          }else{
            const {data:ManifactureOwnerByUserId}=await getManOwnerByUserId(user.userId)
            if(ManifactureOwnerByUserId.length==0){
              setmanifactureModal(true)
            }else{
              console.log("ManifactureByUserId",ManifactureOwnerByUserId[0].manifatureId)
              let manifactureId=ManifactureOwnerByUserId[0].manifatureId
              const {data:manifactuerByUserId}=await getManifactureByUserId(manifactureId)
              dispatch(ownerManifactureAction.AddManifactureOwner(manifactuerByUserId)) 
              dispatch(manifactureAction.AddManifacture(ManifactureOwnerByUserId))
              dispatch(AccounttypeAction.changeAccount(account))
              setchangeAccountModal(false)
            }
          }
}
export const manifactureWorkerAccount=async(manifactureWorker,user,dispatch,
  setchangeAccountModal,
    setmanifactureWorkerModal,account)=>{
    if(manifactureWorker._id){
        // console.log("storeOwner")
        setchangeAccountModal(false)
        dispatch(AccounttypeAction.changeAccount(account))
      }else{
        const {data:ManWorkerByUserId}=await getManWorkerByUserId(user.userId)
        if(ManWorkerByUserId.length==0){
          setmanifactureWorkerModal(true)
        }else{
          dispatch(manifactureWorkerAction.AddmanifactureWorker(ManWorkerByUserId))
          dispatch(AccounttypeAction.changeAccount(account))
          setchangeAccountModal(false)
        }
      }
}
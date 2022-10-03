import React from 'react';
import { StyleSheet, View,Modal } from 'react-native';
import C_Button from './C_Button';
import C_Form from './C_Form';
import C_FormField from './C_FormField';
import * as Yup from "yup"
import C_SubmitButton from './C_SubmitButton';
import { addFamily } from '../api/FamillyApi';
import C_Text from './C_Text';
import { addFather } from '../api/FatherApi';
import *as AccounttypeAction from "../redux/accountType";
import { addStores } from '../api/storeApi';
import { addOwner } from '../api/ownerApi';
import C_FormPicker from './C_FormPicker';
import { addSupplierOwner } from '../api/supplierOwnerApi';
import { addSupplier } from '../api/suplierApi';
import *as OwnerSupplierAction from "../redux/ownerSupplier";
import *as supplierAction from "../redux/supplier";
const items=[
    {_id:1,label:"grossery"},
    {_id:2,label:"beauty"},

]
const AddStoreschema = Yup.object().shape({
        supplierName: Yup.string().required().label("supplierName"),
        supplierType: Yup.object().required().label("supplierType"),
      })
function AddSupplier({
    prodModal,
    setprodModal,
    user,
    dispatch,
    setchangeAccountModal,
    account
}) {
    const handleAddSupplier=async(values)=>{
        let st_type=values.supplierType
        let supplierbj={
            timestamp:Date.now(),
            supplierName:values.supplierName,
            supplierType:st_type.label,
    }
    const supplier=await addSupplier(supplierbj)
    if(supplier.ok){
            let dt=supplier.data
            let supplierOwnerObj={
            supplierId:dt._id,
            userId:user.userId,   
            }
            dispatch(supplierAction.AddSupplier(supplier.data))

    const supplierOwner=await addSupplierOwner(supplierOwnerObj)
    if(supplierOwner.ok){
            setprodModal(false)
            dispatch(AccounttypeAction.changeAccount(account))
            dispatch(OwnerSupplierAction.AddOwnerSupplier(supplierOwner.data))
            setchangeAccountModal(false)
    }
    }   
} 
return (
<View style={styles.container}>
<Modal
animationType="slide"
visible={prodModal}
onRequestClose={() => {
  setprodModal(false);
}}
>
<C_Button 
title="exit"
// color={buttonColor}
onPress={()=>setprodModal(false)}
/>
<C_Text>create a supplier account</C_Text>
<C_Form
    initialValues={{supplierName:"",
    supplierType:null}}
    onSubmit={(values)=>{
        handleAddSupplier(values)
    }}
    validationSchema={AddStoreschema}
    >
    <C_FormField
        name="supplierName"
        //  icon="email"
        autoCapitalize="none"
        autoCorrect={false}
        // keyboardType="number-pad"
        placeholder="supplierName"
        />
    <C_FormPicker
      items={items}
      name="supplierType"
       placeholder="supplierType"
       icon="email"
        />
    <C_SubmitButton title='submit' />
    </C_Form>
</Modal>

</View>
 );
}
const styles = StyleSheet.create({
button:{
    flexDirection:"row",
    justifyContent:"space-around"
}
})
export default AddSupplier;
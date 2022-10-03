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
import *as OwnerAction from "../redux/owner";
import *as StoreAction from "../redux/store";
import { addStores } from '../api/storeApi';
import { addOwner } from '../api/ownerApi';
import C_FormPicker from './C_FormPicker';

const items=[
    {_id:1,label:"grossery"},
    {_id:2,label:"beauty"},

]


const AddStoreschema = Yup.object().shape({
        storeName: Yup.string().required().label("storeName"),
        storeType: Yup.object().required().label("storeType"),
      })
function AddStore({
    prodModal,
    setprodModal,
    user,
    dispatch,
    setchangeAccountModal,
    account
}) {
    const handleAddStore=async(values)=>{
        let st_type=values.storeType
        let storeObj={
            timestamp:Date.now(),
            storeName:values.storeName,
            storeType:st_type.label,
    }
    const store=await addStores(storeObj)
    if(store.ok){
            let dt=store.data
            let ownerObj={
             storeId:dt._id,
             userId:user.userId,   
            }
            dispatch(StoreAction.Addstore(store.data))
    const owner=await addOwner(ownerObj)
    if(owner.ok){
            setprodModal(false)
            dispatch(AccounttypeAction.changeAccount(account))
            dispatch(OwnerAction.AddOwner(owner.data))
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
<C_Text>create a store account</C_Text>
<C_Form
    initialValues={{storeName:"",
    storeType:null}}
    onSubmit={(values)=>{
        handleAddStore(values)
        dispatch(AccounttypeAction.changeAccount(account))
    }}
    validationSchema={AddStoreschema}
    >
    <C_FormField
        name="storeName"
        //  icon="email"
        autoCapitalize="none"
        autoCorrect={false}
        // keyboardType="number-pad"
        placeholder="storeName"
        />
    <C_FormPicker
      items={items}
      name="storeType"
       placeholder="storeType"
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
export default AddStore;
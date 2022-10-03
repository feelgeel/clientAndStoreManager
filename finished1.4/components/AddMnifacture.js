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
import { addManifacture } from '../api/manifactureApi';
import { AddManifactureOwner } from '../api/manifactureOwnerApi';
import *as ownerManifactureAction from "../redux/ownerManifacture";
import *as manifactureAction from "../redux/manifacture";
const items=[
    {_id:1,label:"grossery"},
    {_id:2,label:"beauty"},

]


const AddStoreschema = Yup.object().shape({
        manifactureName: Yup.string().required().label("manifactureName"),
        manifactureType: Yup.object().required().label("manifactureType"),
      })
function AddManifacture({
    prodModal,
    setprodModal,
    user,
    dispatch,
    setchangeAccountModal,
    account
}) {
    const handleAddMaifacture=async(values)=>{
        let man_type=values.manifactureType
        let manifactureObj={
            timestamp:Date.now(),
            manifactureName:values.manifactureName,
            manifactureType:man_type.label,
    }
    const manifacture=await addManifacture(manifactureObj)
    console.log(manifacture.data)
    if(manifacture.ok){
            let dt=manifacture.data
            let manifctureOwnerObj={
             manifatureId:dt._id,
             userId:user.userId,   
            }
            dispatch(manifactureAction.AddManifacture(manifacture.data))
    const manifctureOwner=await AddManifactureOwner(manifctureOwnerObj)
    if(manifctureOwner.ok){
            setprodModal(false)
            dispatch(AccounttypeAction.changeAccount(account))
            dispatch(ownerManifactureAction.AddManifactureOwner(manifctureOwner.data))
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
<C_Text>create a manifacture account</C_Text>
<C_Form
    initialValues={{manifactureName:"",
    manifactureType:null}}
    onSubmit={(values)=>{
        handleAddMaifacture(values)
    }}
    validationSchema={AddStoreschema}
    >
    <C_FormField
        name="manifactureName"
        //  icon="email"
        autoCapitalize="none"
        autoCorrect={false}
        // keyboardType="number-pad"
        placeholder="manifactureName"
        />
    <C_FormPicker
      items={items}
      name="manifactureType"
       placeholder="manifactureType"
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
export default AddManifacture;
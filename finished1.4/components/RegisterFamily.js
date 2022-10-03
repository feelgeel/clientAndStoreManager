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
import *as fatherAction from "../redux/father";
import *as familyAction from "../redux/family";

const RegisterFamilyschema = Yup.object().shape({
        famillyName: Yup.string().required().label("famillyName"),
      })
function RegisterFamily({
    prodModal,
    setprodModal,
    user,
    dispatch,
    setchangeAccountModal,
    account
}) {

const handleAddFam=async(values)=>{
let familyObj={
        timestamp:Date.now(),
       name:values.famillyName,
}
const fam=await addFamily(familyObj)
if(fam.ok){
        let dt=fam.data
        let fatherObj={
         familyId:dt._id,
         userId:user.userId,   
        }
const father=await addFather(fatherObj)
if(father.ok){
        setprodModal(false)
        dispatch(AccounttypeAction.changeAccount(account))
        dispatch(fatherAction.AddFather(father.data))
        dispatch(familyAction.AddFamily(fam.data))
        setchangeAccountModal(false)
}
}


// console.log(familyObj)
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
<C_Text>create a family accout</C_Text>
<C_Form
    initialValues={{famillyName:""}}
    onSubmit={(values)=>{
        handleAddFam(values)
    }}
    validationSchema={RegisterFamilyschema}
    >
    <C_FormField
        name="famillyName"
        //  icon="email"
        autoCapitalize="none"
        autoCorrect={false}
        // keyboardType="number-pad"
        placeholder="famillyName"
        />
    <C_SubmitButton title='submit' />
    </C_Form>
      
</Modal>

</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default RegisterFamily;
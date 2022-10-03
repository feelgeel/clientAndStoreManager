import React, { useState } from 'react';
import { StyleSheet, View,Text,TextInput } from 'react-native';
import Screen from '../../components/Screen';
import { useSelector, useDispatch } from "react-redux";
import { ListItem } from '../../components/lists';
import GeneratedQrCode from '../../components/GeneratedQrCode';
import C_TextInput from '../../../finishedApp_v1.0/components/C_TextInput';
import C_Button from '../../components/C_Button';
import * as Yup from "yup"
import C_Form from '../../components/C_Form';
import C_FormField from '../../components/C_FormField';
import C_SubmitButton from '../../components/C_SubmitButton';
import AreUSure from '../../components/AreUSure';
import { updateFamilyById } from '../../api/FamillyApi';
import *as userAction from "../../redux/users";

const fatherCashSchema = Yup.object().shape({
    cash: Yup.number().required().label("cash"),
  })
function FatherCashScreen({children,style}) {
    const dispatch=useDispatch();
    const user=useSelector(state=>state.entities.users.list)
    const family=useSelector(state=>state.entities.family.familyDt)
    const[creditCash,setcreditCash]=useState(0)
    const[areUSureModal,setareUSureModal]=useState(false)
    const[valuesForm,setvaluesForm]=useState({})
    // console.log(user)
    const handleChargeAccount=async()=>{
        let newfamily={...family}
        let newuser={...user}
        newuser.cash=Number(newuser.cash)-Number(valuesForm.cash)
        newfamily.cash=Number(valuesForm.cash)
        const {data:updateFamily}=await updateFamilyById(newfamily._id,newfamily)
        dispatch(userAction.userloggedIn(newuser))
    // console.log("chargeAccount",newfamily)
    setareUSureModal(false)
    }
return (
<Screen style={styles.container}>
    <ListItem
            title={"userNAme : "+user.userName+" CASH :"+user.cash}
            
                onPress={()=>{
                }}
                onLongPress={()=>{
                
                }}
            />
     <C_Form
    initialValues={{cash:""}}
    onSubmit={(values)=>{
        setvaluesForm(values)
        setareUSureModal(true)
        // console.log("value",valuesForm)
    }}
    validationSchema={fatherCashSchema}
    >
    <C_FormField
        name="cash"
        //  icon="email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="number-pad"
        placeholder="cash"
        />
    <C_SubmitButton title='submit' />
    </C_Form>
    <AreUSure
      areUSureModal={areUSureModal}
      setareUSureModal={(dt)=>setareUSureModal(dt)}
      onOk={dt=>handleChargeAccount()}
      Message='are sure u want to charge'
      titleButton="ok"
      theChosen
      buttonColor
      selfServing={false}
      sell={false}
    />
</Screen>
 );
}
const styles = StyleSheet.create({
container:{
    backgroundColor: "#6f51ff",
}
})
export default FatherCashScreen;
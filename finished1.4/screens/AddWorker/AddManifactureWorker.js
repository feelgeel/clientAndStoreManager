import React ,{ useState }  from 'react';
import { StyleSheet, View,Modal } from 'react-native';
import C_Button from '../../components/C_Button';
import { handleAddManifactureWorkerMember } from './AddManifactureWorkerFunc';
import Screen from '../../components/Screen';
import C_Form from '../../components/C_Form';
import C_FormField from '../../components/C_FormField';
import C_FormPicker from '../../components/C_FormPicker';
import C_SubmitButton from '../../components/C_SubmitButton';
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
const items=[
    {_id:1,label:"mother"},
    {_id:2,label:"daughter"},
    {_id:3,label:"son"},

]

const AddStoreschema = Yup.object().shape({
    familyMemberId: Yup.object().required().label("familyMemberId"),
    monthlyPay: Yup.number().required().label("monthlyPay"),
  })
function AddManifactureWorker({children,style}) {
    const[scanQrModal,setscanQrModal]=useState(false) 
    const[addSupplierWorkerModal,setaddSupplierWorkerModal]=useState(false)
    const[scannedObj,setscannedObj]=useState({clientId:"625afc18923af92368524f40",
    listId:"625bfddd187540187c66b6e8"})
    const son=useSelector(state=>state.entities.son.sonDt)
    const family=useSelector(state=>state.entities.family.familyDt)
    const user=useSelector(state=>state.entities.users.list)
return (
<Screen style={styles.container}>
<C_Button
        title="add manifacture memeber"
        // color={buttonColor}
        onPress={()=>setaddSupplierWorkerModal(true)} />
<C_Button
        title="remove manifacture member"
        // color={buttonColor}
        onPress={()=>setscanQrModal(true)} />

 
<Modal
animationType="slide"
visible={addSupplierWorkerModal}
onRequestClose={() => {
    setaddSupplierWorkerModal(false);
}}
>
<C_Button
        title="exit"
        // color={buttonColor}
        onPress={()=>setaddSupplierWorkerModal(false)} />
{/* <C_Button
        title="scan  qrcode"
        // color={buttonColor}
        onPress={()=>setscanQrModal(true)} /> */}

<C_Form
    initialValues={{
        familyMemberId:null,
        monthlyPay:null,
}}
    onSubmit={(values)=>{
        // console.log(values)
        handleAddManifactureWorkerMember(values,family,setaddSupplierWorkerModal)
        // dispatch(AccounttypeAction.changeAccount(account))
    }}
    validationSchema={AddStoreschema}
    >
   
    <C_FormPicker
      items={items}
      name="familyMemberId"
       placeholder="familyMemberId"
       icon="email"
       addMember={true}
        />
    <C_FormField
       name="monthlyPay"
       //  icon="email"
       autoCapitalize="none"
       autoCorrect={false}
       keyboardType="number-pad"
       placeholder="monthlyPay"
        />
    <C_SubmitButton title='submit' />
    </C_Form>
</Modal>

</Screen>
 
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default AddManifactureWorker;
import React, { useState, useEffect } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import Screen from './Screen';
import C_Form from './C_Form';
import C_FormField from './C_FormField';
import C_SubmitButton from './C_SubmitButton';
import C_ImagerPicker from './C_ImagePicker';
import * as Yup from "yup";
import { addGrosseries, getCategory } from '../api/grosseryApi';
import C_FormPicker from './C_FormPicker';

let categ=[{
    _id:1,
    label:"data"
}]


const AddStoreschema = Yup.object().shape({
    images: Yup.array().min(1,"please selet an image"),
    Gting: Yup.object().required().label("Gting"),
    product_name: Yup.string().required().label("product_name"),
    brand: Yup.string().required().label("brand"),
    categ: Yup.object().label("categ"),
  })
function AddGrosseryForm({}) {
    const[category,setcategory]=useState([])
const getCateg=async()=>{
    const{data:getCateg}=await getCategory("grosseries")
    setcategory(getCateg)

}
   useEffect(() => {
    getCateg()
   },[])
//    console.log("category",category)
return (
<Screen style={styles.container}>
<C_Form
    initialValues={{
        images:[],
        Gting:0,
        product_name:"",
        brand:"",
        categ:{categ:"grossery"},
}}
    onSubmit={async(values)=>{
        const{data:addTempGross}=await addGrosseries(values)
        console.log(addTempGross)
        // handleAddStoreWorkerMember(values,family,user,setaddFamModal)
    }}
    validationSchema={AddStoreschema}
    >
    <C_ImagerPicker
    name="images"
    />
    <C_FormPicker
       items
        name="Gting" 
        placeholder="Gting"
        icon="email"
        addMember={true}
        />
        <C_FormField
        name="product_name"
        placeholder="product_name"
        />
        <C_FormField
        name="brand"
        placeholder="brand"
        />
        <C_FormPicker
       items={category}
        name="categ" 
        placeholder="categ"
        icon="email"
        addMember={false}
        label="name"
        />
    <C_SubmitButton title='submit' />
    </C_Form>

</Screen>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default AddGrosseryForm;
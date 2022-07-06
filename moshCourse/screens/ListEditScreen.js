import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from "yup";
import Screen from "../component/Screen";
import C_Form from '../component/C_Form';
import C_FormField from '../component/C_FormField';
import C_FormPicker from '../component/C_FormPicker';
import C_SubmitButton from '../component/C_SubmitButton';



const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    price: Yup.number().required().min(1).max(10000).label("Price"),
    description: Yup.string().label("Description"),
    category: Yup.object().required().nullable().label("Category"),
  });
const categories = [
    { label: "Furniture", _id: 1 },
    { label: "Clothing", _id: 2 },
    { label: "Camera", _id: 3 },
  ];
function ListEditScreen({children,style}) {
  
return (
<>
      <C_Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <C_FormField maxLength={255} name="title" placeholder="Title" />
        <C_FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
        />
        <C_FormPicker items={categories} 
        name="category" 
        placeholder="Category"
        icon="apps"
         />
        <C_FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <C_SubmitButton title="Post" />
      </C_Form>
    </>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ListEditScreen;
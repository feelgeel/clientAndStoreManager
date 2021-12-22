import React,{useState,useContext} from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import listContext from "../list_context/list-context";
import { Modal,Text } from "react-native-paper";
import { log } from 'react-native-reanimated';

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "grossery",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "beauty",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "other",
    value: 3,
  },
  
];
const dataMapper=(data)=>{
  
  const finishedObj={};
  for (const key in data) {
          const element = data[key];
          // if(typeof element=="string"){
            finishedObj.listName=element;
          // }
          // else{
          //   for (const key in element) {
          //     if(key=="label"){
                
          //       finishedObj.category=element[key]
          //     }
          //   }
          // }
          
        
      }
      finishedObj._id=(Math.random())*(Math.random())+(Math.random());
      finishedObj._id=finishedObj._id.toString(); 
      
      return finishedObj
}
log()
function ListingEditScreen({navigation,route}) {
  const context=useContext(listContext)
  let lists=route.params;
  const [visible, setVisible] =useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
        const repetition=(data)=>{
            for (let a = 0; a < lists.length; a++) {
              const listName = lists[a].listName;
              if(listName==data){
                return true
              }else{
                return false
              }
              
            } 
        }
  
  // console.log(lists);
  const validationSchema = Yup.object().shape({
    
    title: Yup.string().required().min(1).label("Title"),
    // category: Yup.object().required().nullable().label("stores"),
  });
 const handleSubmit=(values)=>{
  let finished=dataMapper(values)
              finished.createdTime="";
              finished.userId=context.User.userId;
              finished.prod=[];
              finished.chosenIds=[];
              finished.prodObj=[];
              finished.chosenProdIds=[];
              finished.totalPrice="";
              finished.totalQuantity="";
              finished.status="false";
          const res=repetition(finished.listName)
         
          if(res){
            showModal()
          }else{

            // console.log(lists);
            context.addToList(finished);
            context.addToListName(finished);
            // context.setListName(finished);

            navigation.navigate("showlists",lists)
          }
 }
  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          title: "hallo",
          // category: null,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/* <label>hello</label>  */}
        <FormField  maxLength={255} name="title" placeholder="Title" />
        {/* <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        /> */}
        <SubmitButton  title="Post" />
      </Form>
     
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>THE LIST NAME ALREADY EXIST PLEASE CHOOSE ANOTHER ONE .</Text>
        </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;

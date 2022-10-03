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
import *as listNameApi from '../api/listNameApi';
import *as listNameaction from '../redux/listNames';
import { useSelector, useDispatch } from "react-redux";

const dataMapper=(data)=>{
  const finishedObj={};
  for (const key in data) {
          const element = data[key];
            finishedObj.listName=element;
      }
      finishedObj._id=(Math.random())*(Math.random())+(Math.random());
      finishedObj._id=finishedObj._id.toString(); 
      
      return finishedObj
}  

function ListingEditScreen({navigation,route}) {
  const dispatch=useDispatch();
  const lists=useSelector(state=>state.entities.listNames.list)
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const userId=useSelector(state=>state.entities.users.list.userId)
  const [visible, setVisible] =useState(false);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    // category: Yup.object().required().nullable().label("stores"),
  });
  const repetition=(data)=>{
   if(lists.length===0){
     return false
   }else{
    for (let a = 0; a < lists.length; a++) {
      const listName = lists[a].listName;
      if(listName==data){
        return true
      }else{
        return false
      }
      
    } 
   }
  }   
  const handleSubmit=async(values)=>{
    let data={};
  let finished=dataMapper(values)
  finished.createdTime="";
  finished.userId=userId;
  finished.prod=[];
  finished.chosenIds=[];
  finished.prodObj=[];
  finished.chosenProdIds=[];
  finished.totalPrice="";
  finished.totalQuantity="";
  finished.status="false";
  const res=repetition(finished.listName)
  if(res){
    setVisible(true)
    // console.log("modal")
  }else{
    data.listName=values.title;
            data.userId=userId;
            data.totalQuantity=0;
            data.unfinished=0;
            data.finished=0;
            data.totalPrice=0;
            data.status=false;
            data.timestamp=Date.now();
  const respond=await listNameApi.addListName(data)
  if(respond.ok){
    dispatch(listNameaction.addListName(respond.data));
    navigation.navigate("showlists",lists)
    // context.setListName(finished);
    
  }else{
    console.log(respond.data);
  }
  // console.log(respond.data)   
  }
}

             
  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          title: "hallo",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField  maxLength={255} name="title" placeholder="Title" />
        <SubmitButton  title="Post" />
      </Form>
      <Modal 
      visible={visible}
       onDismiss={()=>setVisible(false)}
        contentContainerStyle={containerStyle}
      >
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

import React from "react";
import { StyleSheet,FlatList } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import colors from "../config/colors";
import ListItemSeparator from '../components/lists/ListItemSeparator';
import ListItem from '../components/lists/ListItem';
import Icon from "../components/Icon";
import AppTextInput from '../components/TextInput';
import listContext from '../item_context/list-context'
const validationSchema = Yup.object().shape({
  category: Yup.object().required().nullable().label("Category"),
  subcategory: Yup.object().required().nullable().label("subcategory"),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "sancks",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "canned food",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "planed based food",
    value: 3,
  },
  
];
const items=[
  {id:1,name:"chocolate"},
  {id:2,name:"milk"},
  {id:3,name:"coca-cola"},
  {id:4,name:"jus"},
]
const subcategory = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "sweet snacks",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "salty snacks",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "milk",
    value: 3,
  },
  
];
const typeOfTodo=[
  {name:"milk",
   mainCategory:"dairy"
  }
]
function AddItemScreens({navigation,route}) {
  const context=useContext(listContext)
  const list=context.list
  const listObj=route.params;
  let searching={}
  const dataMapper=(data)=>{
    for (const key in data) {
      const dat=data[key]
      if(key=="category"){

        for (const label in dat) {
          if(label=="label"){
            searching.category=dat.label
            // console.log(dat.label);
          }
        }
      }
      if(key=="subcategory"){

        for (const label in dat) {
          if(label=="label"){
            searching.subcategory=dat.label
            // console.log(dat.label);
          }
        }
      }
        
      }
    }
      // console.log(searching)
  
  return (
    <Screen style={styles.container}>
      
      <AppTextInput store={0} icon='search'/>
      <FlatList
          data={list}
          // keyExtractor={(renderList) => renderList.id}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => 
          {  
            if(!item.component){

              return<ListItem
              chevron={true}
                title={item.name}
                IconComponent={
                  <Icon
                    name={"menu"}
                    backgroundColor={colors.primary}
                  />
                }
                onPress={()=>navigation.navigate("add1",{listObj})}
              />}else{
                return item.component
              }
            }
          }
        />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default AddItemScreens;

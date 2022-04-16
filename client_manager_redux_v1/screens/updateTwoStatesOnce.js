import React,{useState,useContext,useEffect} from "react";
import { FlatList, StyleSheet,View, Button,TextInput } from "react-native";
import Text from "../components/Text";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { ListItem, ListItemSeparator,TodoListItem } from "../components/lists";
import Icon from '../components/Icon';
// import TextInput from "../components/TextInput";
import { getgrossery, getCategory } from "../services/callingServer";
import { Chip, Modal } from "react-native-paper";
import itemContext from "../list_context/list-context";
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import  * as Yup  from 'yup';
const log=console.log;
  
    let newObj=[]
    let newChosen=[];
    let listItems=[];
    let itemObj;
    let listname;
    let listId;
    let storeName;
function UpdateTwoStatesOnce({ navigation,route }) {
  const context=useContext(itemContext);
  const [product,setProduct]=useState("");
  const [productTwo,setProductTwo]=useState("");
  const [chosen,setChosen]=useState("");
 
    const getProducts=async()=>{
            const {data:gross}=await getCategory();
            setProduct(gross);
            setProductTwo(gross);
          }
          useEffect(()=>{
            getProducts()
          },[])
        
    
    const handleAddItem=(item)=>{ 
      newObj=[...product]
      newChosen=[...chosen]
      if(unselected){
        const index = newObj.indexOf(item);
        newObj[index].status=true
        newObj[index].quantity=1
        newChosen.push(newObj[index]); 
        newObj.splice(index,1)
        
        setProduct(newObj);
        setChosen(newChosen);
      } if(selected){
        const index_chosen = chosen.indexOf(item);
        chosen[index_chosen].status=false
        newChosen.splice(index_chosen,1)
        newObj.push(chosen[index_chosen]);
        setProduct(newObj);
        setChosen(newChosen);
      }

    }
    const  reverseQuantity=()=>{

      for (let j = 0; j < productTwo.length; j++) {
        const prod = productTwo[j];
        // console.log("prod",prod._id);
        
        for (let i = 0; i < chosen.length; i++) {
          const chosenProd = chosen[i];
            // console.log("chosen",chosenProd._id);
          if(prod._id==chosenProd._id){
            
            console.log("prod",prod);
            console.log("chosen",chosenProd);
          }
          
        }
        
      }
    }
   
    let handleQuantity=(event)=>{
      let val=event.target.value;
      let name=event.target.name;
      name.toString();
      newChosen=[...chosen];
      const index_chosen = newChosen.findIndex(item=>item._id==name);
      // console.log(name);
      newChosen[index_chosen].quantity=val;
     

    }
    return (

      <Screen style={styles.screen}>
            
           <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <View >
         
                      <FlatList
                        data={product}
                        keyExtractor={(product) => product._id.toString()}
                        ItemSeparatorComponent={ListItemSeparator}
                        renderItem={({ item }) => 
                        {  
                            return(  <Screen style={{flexDirection:"row"}} >
                              <label >quantity :</label>
                              <label >" {item.quantity} "</label>
                              <TextInput 
                               onChange={handleQuantity} 
                               maxLength={255}
                               placeholder="quantity"
                               name={item._id}
                               />
                            </Screen >
                          )
                          }
                        }
                      />
                  
          <View style={{justifyContent:"space-between"}}>
          <Button title='cancel' onPress={()=>{
            reverseQuantity()
            hideModal()
            }}/>
          <Button title='OK' onPress={()=>{
                context.updateList(listItems._id,listItems);
                navigation.navigate("showlistitems",listItems);
          }}/>

          </View>
            
          </View>
        </Modal> 
      </Screen>
    );
}

const styles = StyleSheet.create({
  screen: {
    // padding: 20,
    backgroundColor: "#6f51ff",
  },
});

export default UpdateTwoStatesOnce
;

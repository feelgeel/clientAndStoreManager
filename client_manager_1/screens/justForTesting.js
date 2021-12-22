import React,{useState,useContext,useEffect} from "react";
import { FlatList, StyleSheet,View, Button } from "react-native";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { ListItem, ListItemSeparator,TodoListItem } from "../components/lists";
import Icon from '../components/Icon';
import TextInput from "../components/TextInput";
import { getgrossery, getCategory } from "../services/callingServer";
import { Chip } from "react-native-paper";
const log=console.log;
  
let newObj=[]
    let chosen=[];
function justForTesting({ navigation,route }) {
    const [product,setProduct]=useState("");
    const getProducts=async()=>{
        const {data:gross}=await getCategory();
        setProduct(gross);
    }
    useEffect(()=>{
        getProducts()
    },[])
    
    const handleAddItem=(item)=>{ 
        newObj=[...product]

        // let filtered=newObj.filter((val)=>val._id!=item._id);
        const index = product.indexOf(item);
        newObj[index].status=!newObj[index].status
        
        const index_chosen = chosen.indexOf(item);
        if(index_chosen==-1){

            chosen.push(item);
        }else{
            chosen=chosen.filter((val)=>val._id!=item._id)
        }
        setProduct(newObj);
        
        // log(index_chosen)
    }
    console.log(chosen);
//    log(chosen)
    return (

      <Screen style={styles.screen}>
             
         <FlatList
            data={product}
            keyExtractor={(product) => product._id.toString()}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => 
            {  
  
                return<ListItem
                chevron={true}
                  title={item.name}
                  checkbox={true}
                  checked={item.status}
                  IconComponent={
                    <Icon
                      name={"menu"}
                      backgroundColor={colors.primary} 
                    />
                  }
                  onPress={()=>handleAddItem(item)}
                />
              }
            }
          />
           
           
      </Screen>
    );
}

const styles = StyleSheet.create({
  screen: {
    // padding: 20,
    backgroundColor: "#6f51ff",
  },
});

export default justForTesting;

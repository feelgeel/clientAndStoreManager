import React, { useContext,useState,useEffect } from 'react';
import { FlatList, StyleSheet, View,Modal,Button,Text } from 'react-native';
import Icon from '../components/Icon';
import { ListItem, ListItemSeparator } from '../components/lists';
import Screen from '../components/Screen';
import colors from '../config/colors';
import listContext from '../list_context/list-context';
import { useSelector, useDispatch } from "react-redux";
import *as listNamesAction from '../redux/listNames';
import *as addGtingAction from '../redux/addingGting';
import {loadProducts,addProducts} from '../api/productsApi';
// import Icon from '../components/Icon';
let modes=[
    "clientCash",
    "clientTransaction",
    "selfServing"
]
function ModeScreens({navigation,route}) {
  const dispatch=useDispatch();
  const transMode=useSelector(state=>state.entities.listNames.transMode)
  const listId=useSelector(state=>state.entities.listNames.theList._id)
  const listNames=useSelector(state=>state.entities.listNames.list)
  const products=useSelector(state=>state.entities.products.list)
    const context=useContext(listContext)
    const[modal,setModal]=useState(false)
    const[noList,setnoList]=useState(false)
    const[Lists,setLists]=useState(false)
    const[listChecked,setlistChecked]=useState(false)
    const[prodChecked,setprodChecked]=useState(false)
    const[noproduct,setnoproduct]=useState(false)
    const[errors,setError]=useState(false)
    const[oneList,setoneList]=useState(false)
    
    const[Modes,setModes]=useState("")
    const[stateList,setstateList]=useState([...listNames])
    const[TheListName,setTheListName]=useState({...context.TheListName})

    useEffect(()=>{
    },[])
    const handleModes=async(item)=>{
      console.log("item",item)
      dispatch(listNamesAction.setTransMode(item));
      navigation.navigate(item)
//
    }

  
    
return (
<Screen style={styles.container}>
<FlatList
          data={modes}
          keyExtractor={(ListName,index) => ListName+index}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => 
          {  
           
              return<ListItem
              chevron={true}
                title={item}
                quantity={true}
                IconComponent={
                  <Icon
                    name={"menu"}
                    backgroundColor={colors.primary}
                  />
                }
                onPress={()=>handleModes(item)}
              />
            }
          }
        />
 
</Screen>
 );
}
const styles = StyleSheet.create({
container:{
//  flexDirection:"row"
}
})
export default ModeScreens;
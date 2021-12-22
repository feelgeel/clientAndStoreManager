import React,{useState,useContext,useEffect} from "react";
import { FlatList, StyleSheet,View, Button,ActivityIndicator } from "react-native";
import Text from "../components/Text";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from '../components/Icon';
import listContext from "../list_context/list-context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { getCategory} from "../services/callingServer";
import { Modal } from "react-native-paper";
import *as listNamesAction from '../redux/listNames';
import { useSelector, useDispatch } from "react-redux";
import {loadListNames} from "../api/listNameApi";
var _ = require('lodash');




function ShowListsScreen({ navigation,route }) {
  const userId=useSelector(state=>state.entities.users.list.userId)
  const list=useSelector(state=>state.entities.listNames.list)
  const theList=useSelector(state=>state.entities.listNames.theList)
  useEffect(()=>{
    // console.log("at use effetc",userId)
    setuserId(userId)
    getListNames() 
    setlistNames(list)
  },[list])

  const dispatch=useDispatch();
  const [listNames, setlistNames] =useState(list);
  const [userid, setuserId] =useState(userId);
  const [daList, setdaList] =useState(theList);
  const getListNames=async()=>{
    // console.log("userId at first",userId)

    if(list.length===0){
      const {data:listNamesData}=await loadListNames(userId);
      dispatch(listNamesAction.loadListNames(listNamesData));
      // console.log("listname",listNames)
      setlistNames(listNames)
    }
    return
  }
  // console.log("userid",userId)
  const handleChoose=(item)=>{
    setdaList(item)
    dispatch(listNamesAction.setTheListName(item));
  // console.log(item)
  navigation.navigate("addgtings")
  // console.log(list)
  }
  return(
    <Screen style={styles.screen}>
     <View style={{height:150,paddingLeft:"5%",paddingTop:"10%"}}>
        <Text style={{color:"white"}}>HELLO CISCO</Text>
        <Text style={{color:"white"}}>Have a nice day</Text>
      </View>
         <ListItem
          title="ADD A LIST"
          IconComponent={
            <Icon
              name="plus-circle"
              backgroundColor={colors.secondary}
              />
            }
            onPress={()=>navigation.navigate("addList",listNames)}
        />
         <FlatList
          data={listNames}
          keyExtractor={(listNames) => listNames._id}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => 
          {  
           
              return<ListItem
              chevron={true}
                title={
                  item.listName +"  "+"unfunished: "+
                  item.unfinished+" finished: "+item.finished+" status :"+item.status}
                // title={item.listName}
                quantity={true}
                renderRightActions={()=>
                  (
                 <View style=
                 {{backgroundColor:"red",width:70,alignItems:"center",justifyContent:"center"}} >
                   <MaterialCommunityIcons
                   color="black"
                   name={"delete"}
                   size={25}
                   />
                 </View>
                  )}
                 renderLeftActions={()=>(<View  style=
                 {{backgroundColor:"yellow",width:70,alignItems:"center",justifyContent:"center"}} >
                   <AntDesign name="edit" size={25} color="black" />
                 </View>)}
                  onSwipeableLeftOpen={()=>navigation.navigate("addList")}
                  onSwipeableRightOpen={()=>{ }}
                IconComponent={
                  <Icon
                    name={"menu"}
                    backgroundColor={colors.primary}
                  />
                }
                onPress={()=>handleChoose(item)}
                onLongPress={()=>{
                  console.log("halo");
                }}
                
                
              />
            }
          }
        />
   </Screen>
  )
}

      
const styles = StyleSheet.create({
  screen: {
    // padding: 20,
    backgroundColor: "#6f51ff",
  },
});

export default ShowListsScreen;

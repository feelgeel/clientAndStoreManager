import React, { useState, useEffect } from 'react';
import { StyleSheet, View,Text ,FlatList} from 'react-native';
import {  Card, Title,List } from 'react-native-paper';
import TextInput1 from "../TextInput";
import { getCategory } from '../../services/callingServer';
import *as addingGtingAction from '../../redux/addingGting';
import { useSelector, useDispatch } from "react-redux";
const stores=[

    {
        id:1,
        storeName:"grosseries",
        link:"getCategory"
    },
    {
        id:2,
        storeName:"beaty"
    },
    {
        id:3,
        storeName:"bouchery"
    },
    {
        id:4,
        storeName:"3achab"
    },
    {
        id:5,
        storeName:"jawaj"
    },
    {
        id:6,
        storeName:"khadar"
    },
    {
        id:7,
        storeName:"mzabi"
    },
    {
        id:9,
        storeName:"timimoun"
    },
    {
        id:10,
        storeName:"patesery"
    },
    {
        id:11,
        storeName:"frozen food"
    },
    {
        id:12,
        storeName:"baby stuff"
    },
    {
        id:13,
        storeName:"grossist"
    },
    {
        id:14,
        storeName:"tech store"
    },
    {
        id:15,
        storeName:"9mach"
    },
    {
        id:16,
        storeName:"clothes store"
    },
    {
        id:17,
        storeName:"pizzeria"
    },


]



function ListFilter() {
    const addgting=useSelector(state=>state.entities.addingGting)
    let theStore=addgting.store;
    let theCateg=addgting.categ;
    let theCategs=addgting.categObj;
    
    useEffect(()=>{
        setfilterStore(stores)
        setstore(theStore)
        setCateg(theCateg)
        setCategs(theCategs)
    },[addgting]);
    
    const dispatch=useDispatch();
    const [filterStore,setfilterStore]=useState(stores);
    const [store,setstore]=useState("");
    const [categs,setCategs]=useState(theCategs);
    const [categ,setCateg]=useState("");
    const [filterCateg,setfilterCateg]=useState(categs);
    const handleStoreSearch=(item)=>{
        let thetext=item.toLowerCase();
        let filterStore1=stores.filter((m)=>m.storeName.startsWith(thetext));
      setfilterStore(filterStore1)
      }
      const handleCategSearch=(item)=>{
        let thetext=item.toLowerCase();
       let filterCateg1=categs.filter((m)=>m.name.startsWith(thetext));
       setfilterCateg(filterCateg1)
        
      }
      const handleStores=async(item)=>{
        //   console.log(item)
          setstore(item)
        const {data:categs}=await getCategory(item);
        setCategs(categs)
        setfilterCateg(categs)
        dispatch(addingGtingAction.addCategObj(categs))
    //   console.log("categ",item);
      dispatch(addingGtingAction.modifyStore(item))
    }
    const handleCateg=(item)=>{
        setCateg(item)
        dispatch(addingGtingAction.modifyCateg(item))
    }
    // console.log(categs)
return (
<View style={styles.container}>
      <List.Accordion
        title={"stores"+"  "+store}
        // left={props => <List.Icon {...props} icon="folder" />}
        >
        
        <TextInput1 
              onChangeText={(text)=>handleStoreSearch(text)}
                store={0} icon='search'/>
        <FlatList
          data={filterStore}
          keyExtractor={(filterStore) => [filterStore.id].toString()}
          
          renderItem={({ item }) => 
          {
              return <List.Item 
              title={item.storeName} 
              onPress={()=>handleStores(item.storeName)} />
          }
        }
        />
      
      </List.Accordion>
      <List.Accordion
        title={"categories"+"   " +categ}
        // left={props => <List.Icon {...props} icon="folder" />}
        // expanded={expanded}
        // onPress={handlePress}
        >
           <TextInput1 
              onChangeText={(text)=>handleCategSearch(text)}
                store={0} icon='search'/>
       <FlatList
          data={filterCateg}
          keyExtractor={(filterCateg) => filterCateg._id}
          
          renderItem={({ item }) => 
          {
              return <List.Item 
              title={item.name} 
              onPress={()=>handleCateg(item.name)} />
          }
        }
        />
      </List.Accordion>
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ListFilter;
import React, { useState, useEffect } from 'react';
import { StyleSheet, View,Text,Button,Modal } from 'react-native';
import ListFilter from '../components/lists/ListFilter';
import { getGrosseryByName,getGrosseryByGting } from '../services/callingServer';
import Icon from '../components/Icon';
import *as addingGtingAction from '../redux/addingGting';
import ListChoosingScreen from './ListChoosingScreen';
import colors from '../config/colors';
import Screen from '../components/Screen';
import * as productsAction from '../redux/products';
import {loadProducts,addProducts} from '../api/productsApi';
import { useSelector, useDispatch } from "react-redux";
const stores=[

    {
        id:1,
        storeName:"grossery",
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


function AddGtingsScreen1({children,style}) {
    const addgting=useSelector(state=>state.entities.addingGting)
    const listId=useSelector(state=>state.entities.listNames.theList._id)
    const userid=useSelector(state=>state.entities.users.list.userId)
    const grosseryBygting=addgting.grosseryBygting;
    const thechosen=addgting.chosen;
    const theCateg=addgting.categ;
    const dispatch=useDispatch();
    const [modal,setModal]=useState(false);
    const [categ,setCateg]=useState("");
    const [chosen,setchosen]=useState("");
   const handleFilter=()=>{
    setModal(true)
   }
   useEffect(()=>{
    setCateg(theCateg)
    setchosen(thechosen)
    loadChosen()
  },[])
  const loadChosen=async()=>{
      let finishedProd=[];
      let newObj={};
    const {data:prod}=await loadProducts(listId);
// console.log(prod)
    // prod.map(async(dt)=>{
    //    let id=dt.productId 
    //    const {data:product}=await getGrosseryByGting(id);
    //    finishedProd.push(product)
    // })
    // console.log(finishedProd)
    dispatch(addingGtingAction.addChosen(prod))
  }

  const handleSaveProd=async()=>{
      let finishedProd=[];
      let newObj={}
    thechosen.map(async(data)=>{
        newObj={
            productId:data._id,
            listId:listId,
            userId:userid,
            quantity:data.quantity,
            product_type,
            addedDate:Date.now(),
            checkedDate:"",
            Gting:data.Gting,
            image:data.image_front_url,
            brands:data.brands,
            status:false,
            modes:"client",
            price:""
        }
        finishedProd.push(newObj)
        console.log("newobj",newObj)
        const {data:prod}=await addProducts(newObj);
        if(prod){
            // console.log("done")
        }
    })
}
    const handlesave=async()=>{
        const {data:prod}=await getGrosseryByName(categ);
        let newprod=[...prod];
        let newChosen=[...thechosen];
        // // console.log("before",newprod)
        if(thechosen.length!==0){
            thechosen.map(item=>{
                const index = newprod.findIndex(dt=>dt._id===item.productId);
                // console.log("index",index)
                if(index!==-1){
                    newprod.splice(index,1);
                }
            })

            // console.log("worked")
        }
        //     // console.log("after",newprod)
        dispatch(addingGtingAction.addGrossGting(newprod))
        // console.log(grosseryBygting)
        // setnewproduct(prod);
        setModal(false)
    }
    // console.log()
    // console.log(addgting.chosen)
return (
<Screen style={styles.container}>
<Button  title={"save"} 
              onPress={handleSaveProd}
              />
<Button  title={"trial"} 
              onPress={loadChosen}
              />
<Icon name="filter" 
backgroundColor={colors.secondary}
 size={50}  onPress={handleFilter} />
<ListChoosingScreen 
//  theprod={addgting.grosseryBygting} 
// theChosen={addgting.chosen}
/>
<Modal
 visible={modal}
 >
    <Button  title={"out"} 
                onPress={()=>setModal(false)}
                />
    <Button  title={"save"} 
                onPress={handlesave}
                />
     <ListFilter  />
</Modal>

</Screen>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default AddGtingsScreen1;
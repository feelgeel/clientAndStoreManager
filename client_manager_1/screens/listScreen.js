import React,{useContext,useState,useEffect} from "react";
import { FlatList, StyleSheet,View, Button, ActivityIndicator } from "react-native";

import Text from "../components/Text";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from '../components/Icon';
import listContext from "../list_context/list-context";
import { AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal } from "react-native-paper";
import { getCategory, getGrosseryByName } from "../services/callingServer";
var _ = require('lodash');
let categObj=[]
let newChosen=[];
let index_chosen="";
let index_list="";
let listItems="";
let theChosen=[];
let filteredItemlist=[];
function listScreen({ navigation ,route}) {
  const [chosen,setChosen]=useState("");
  const [selected,setSelected]=useState("");
  const context=useContext(listContext);
  let lists=context.list;
  let categories=context.categories;
  let ChosenProd=context.ChosenProd;
  let TheListName=context.TheListName;
  let TheChosen=context.TheChosen;
  let ThechosenData=TheListName.chosenIds;

  const listObj=route.params.item;
  const chosenData=route.params.chosenData;
  
// console.log(TheListName.chosenIds);
  ///////////////////////
  /////////////trial/////
  ///////////////////////
  let chosenProdData=[];
  let getChosenProd=(item,listobj)=>{
    let chosenProdIds=listobj.chosenProdIds;
        // console.log(chosenProdIds);
    if(chosenProdIds.length!=0){

        chosenProdIds.map(val=>{
          let theChosenProd=ChosenProd.filter(item=>item.Gting==val);
            chosenProdData.push(theChosenProd);
      })
      chosenProdData=_.uniq(chosenProdData,"_id");
      chosenProdData=chosenProdData.filter(data=>data.categ==item.name)
    }
    
    // settheChosenData(chosenData)
    // console.log("TheChosen",TheChosen);
    // console.log("TheListName",TheListName);
  }
  ////////////////////
  index_list = lists.findIndex(item=>item._id==listObj._id);
  let theList=lists[index_list];
  listItems=lists[index_list].chosen;
  if(chosenData.length!==0){
     categObj=[...categories];
     theChosen=[...chosen];
     for (let i = 0; i < theChosen.length; i++) {
       const element = theChosen[i];
       const index = categObj.indexOf(element);
       categObj.splice(index,1);
     }
    }else{
      categObj=[...categories];
    }
    
    
  const [visible, setVisible] =useState(false);
  const [loading, setloading] =useState(false);
  const showModal = () => setVisible(true);
   const hideModal = () => setVisible(false);
   const containerStyle = {backgroundColor: 'white', padding: 20};
    // console.log(listItems);
    const handleDeleteitem=(item)=>{
      newChosen=[...chosen]
      index_chosen = newChosen.indexOf(item);
      newChosen.splice(index_chosen,1);
      setChosen(newChosen)
      // console.log(newObj);
    }
    useEffect(()=>{
      setChosen(ThechosenData);
    },[ThechosenData])
    // console.log("categories",categObj.length);


    let handleProducts=async(item)=>{
   /////////////////////////////////////////
   let TheProd=context.TheProd;
   // console.log(item.name);
   TheProd.map(async(d)=>{
     if(item.name==d.categName){
      await  context.setTheCateg(d)
       // console.log(d.categName);
       
     }
   })
   // console.log(context.TheCateg);
   /////////////////////////////////////////





      setloading(true)

      const {data:gross}=await getGrosseryByName(item.name);
      await context.setGtingsByCateg(gross)
      // // getChosenProd(item,listObj)
      await context.setTheChosen(item)
      // await context.settheChosenProd([])
      // console.log("gross",gross);
      // console.log(item.chosenProdIds);
      
      if(item.chosenProdIds.length!==0){
        let newgross=[...gross];
        let freshgross=[]
        item.chosenProdIds.map(d=>{
          let grossIndex=newgross.findIndex(ft=>ft.Gting==d)
          if(grossIndex!==-1){
            freshgross.push(newgross[grossIndex])
            newgross.splice(grossIndex,1)
          }
        })
        freshgross=_.uniqBy(freshgross,"_id");
        await context.settheChosenProd(freshgross)
        await context.setCategProd(newgross)
        // console.log("freshgross",context.TheChosenProd);
      }else{
        await context.setCategProd(gross)
        
      }
      

  setTimeout(() => {
        navigation.navigate("itemDetails",
      {item:item,list:theList,chosenProdData:chosenProdData,chosenProdData:gross})
        
      }, 50);
      setloading(false)
      // console.log();
      
  }
  // if(loading){
  //   return(<View style={{justifyContent:"center",alignItems:"center"}}>
  //     <ActivityIndicator animating={loading} size="large" />
  //   </View>)
 
  // }else{
    // console.log("thechosenprod",context.TheChosenProds);
    // console.log("categprod list",context.CategProd);
    // console.log("chosen",context.TheChosen);
    // console.log("thellistbnam",context.TheListName);
    // console.log("categprod",context.CategProd);
    // console.log("theChosenProds",context.TheChosenProds);
    return (
      
    <Screen style={styles.screen}>
       {loading&&<ActivityIndicator animating={loading} size="large" />}
      <View style={{height:150,paddingLeft:"5%",paddingTop:"10%"}}>
        <Text style={{color:"white"}}>HELLO CISCO</Text>
        <Text style={{color:"white"}}>Have a nice day</Text>
      </View>
         <ListItem
          title="ADD AN ITEM"
          
          IconComponent={
            <Icon
            name="plus-circle"
            backgroundColor={colors.secondary}
            />
          }
          onPress={()=>navigation.navigate("stores",{listObj:listObj,categObj:categObj})}
          />
      <View style={{height:"2%"}}>

      </View>
        {<FlatList
          data={chosen}
          keyExtractor={(chosen) => chosen._id.toString()}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
          
            
            <ListItem
            quantity={true}
            theQuantity={item.quantity}
            renderRightActions={()=>(<View style=
              {{backgroundColor:"red",width:70,alignItems:"center",justifyContent:"center"}} >
              <MaterialCommunityIcons
              color="black"
              name={"delete"} 
              size={25}
              />
            </View>
              )}
              renderLeftActions={()=>(<View style=
                {{backgroundColor:"yellow",width:70,alignItems:"center",justifyContent:"center"}} >
              <AntDesign name={"edit"}size={25} color="black" />
            </View>)}
            // onSwipeableLeftOpen={()=>showModal()}
            onSwipeableRightOpen={()=>{
              setSelected(item)
              handleDeleteitem(item)
              showModal()
            }}
            chevron={true}
            title={item.name}
            checkbox={true}
            checked={item.status}
            IconComponent={
                  <Icon
                  name={"menu"}
                    backgroundColor={colors.secondary}
                    />
                  }
                  onPress={()=>{
                    handleProducts(item)
                    
                  }}
                  onLongPress={()=>console.log("hallo")}
                  />
                  )
                }
                />}
         <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <View >
            <Text >are you sure u want to delete</Text>
            <View style={{flexDirection:"row",justifyContent:"space-around"}}>
            <Button style={{color:"red"}} title='cancel' onPress={()=>hideModal()}/>
            <Button title='OK' onPress={()=>{
              handleDeleteitem(selected)
              hideModal()
              
            }}/>
          </View>
          </View>
        </Modal>
    </Screen>
  );
// }
}

const styles = StyleSheet.create({
  screen: {
    // padding: 20,
    backgroundColor: "#6f51ff",
  },
});

export default listScreen;

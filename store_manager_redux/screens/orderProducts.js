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
    "listOrdering",
    "manualOrdering",
]
function orderProducts({navigation,route}) {
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
    // let listNames=context.ListName;
    // let Purchase=context.Purchase;
// console.log(newlistname)
    useEffect(()=>{
      // let newState=[...context.ListName]
      // newState=newState.map((tt,index)=>{
      //  if(tt.status=="true"){
      //     newState.splice(index,1)
      //  } 
      //  setstateList(newState)
      // })
    },[])
    const handleModes=async(item)=>{
      dispatch(listNamesAction.setTransMode(item));
      navigation.navigate(item)
// // console.log("item",transMode)
//     // setModes(item)
//         if(listNames.length==0){
//           setModal(true)
//           setnoproduct(false)
//         setnoList(true)
//         setList(false)
//         setlistChecked(false)
//         setLists(false)
//       }
//     else if(listNames.length==1){
//       // console.log(listNames[0].unfinished)
//       if(listNames[0].status!==true){
//         dispatch(listNamesAction.setTheListName(listNames[0]));
//         const {data:prod}=await loadProducts(listId);
//         dispatch(addGtingAction.addChosen(prod));
//         // console.log(prod)
//         navigation.navigate(item)
//       }else{
//         setModal(true)
//         setnoproduct(false)
//       setnoList(false)
//       listChecked(true)
//       setLists(false)
//       }
//       }else{
//         setModal(true)
//         setnoproduct(false)
//       setnoList(false)
//       setLists(false)
//       listChecked(false)
//         // console.log(stateList)
//       //   let dt=[]
//       //   let index=stateList.indexOf(context.TheListName)
//       //   // console.log("index",index)
//       //  stateList.map((yt,indexy)=>{
//       //    yt.status="false"
//       //     if(index==indexy){
//       //       yt.status="true"
            
//       //     }
//       //     dt.push(yt)
//       //   })
//       //   console.log(stateList)
//         setstateList(listNames)
//         setList(true)
//         setModal(true)

//       }
    }

    //addToListName
    // console.log(listNames);
    const handleListSelection=(item)=>{
      let dt=[]
      let index=stateList.indexOf(item)
      stateList.map((yt,indexy)=>{
        yt.status="false"
        if(index==indexy){
          yt.status="true"
          setTheListName(yt)
          
        }
        dt.push(yt)
      })
      
      setstateList(dt)
    }
    const handleSave=()=>{
      let dt=[]
      stateList.map(tr=>{
        if(tr.status=="true"){
          tr.status="false"
          setTheListName(tr)
        }
       tr.status="false"
       dt.push(tr)
      })
      setstateList(dt)
      let newlist={...TheListName}
      newlist.status="false"
     setModal(false)
     context.setListName(newlist)
     navigation.navigate(Modes)
    }
    // console.log(context);
    // console.log(context.TheListName);
    
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
 <Modal
        animationType="slide"
        visible={modal}
        onRequestClose={() => {
          setResultmodal(false);
        }}
      >
        <Button
   title="done"
   onPress={()=>{
    let dt=[]
    //  stateList.map(tr=>{
    //   tr.status="false"
    //   dt.push(tr)
    //  })
    //  setstateList(dt)
    // context.setModes("");
     setModes("")
     dispatch(listNamesAction.setTransMode(""));
     setModal(false)}} />
        {noList&&<Screen>
          <Text
        style={{fontSize:50,alignSelf:"center"}}
        >please create a list</Text>
          <Button
        title="create a list"
        onPress={()=>navigation.navigate("addList")} /> 
        </Screen>}
        {noproduct&&<Text
        style={{fontSize:50,alignSelf:"center"}}
        >please add some products </Text>}
         { oneList&& <Text
        style={{fontSize:50,alignSelf:"center"}}
        >please select one list</Text>}
         { listChecked&& <Screen>
          <Text
        style={{fontSize:50,alignSelf:"center"}}
        >all the list are checked pls create a new one</Text>
          <Button
        title="create a list"
        onPress={()=>navigation.navigate("addList")} /> 
        </Screen>}
        {Lists&& 
        // <Text>hello</Text>
        <View>

        <FlatList
          data={stateList}
          keyExtractor={(stateList) => stateList.productId}
          
          renderItem={({ item }) => 
          {
            return (
              <ListItem
              checkbox={true}
              checked={item.status}
              title={item.listName}
              IconComponent={
                <Icon
                name="plus-circle"
                backgroundColor={colors.secondary}
                />
              }
              onPress={()=>handleListSelection(item)}
              />
              )
            }
          }
          />
            <Button
        title="save"
        onPress={()=>handleSave()} /> 
          </View>
        }
      </Modal>
</Screen>
 );
}
const styles = StyleSheet.create({
container:{
//  flexDirection:"row"
}
})
export default orderProducts;
import React, { useContext,useState,useEffect } from 'react';
import { FlatList, StyleSheet, View,Modal,Button,Text } from 'react-native';
import Icon from '../components/Icon';
import { ListItem, ListItemSeparator } from '../components/lists';
import Screen from '../components/Screen';
import colors from '../config/colors';
import listContext from '../list_context/list-context';

// import Icon from '../components/Icon';
let modes=[
    "selfServing",
    "byuFromStore"
]
function ModeScreens({navigation,route}) {
    const context=useContext(listContext)
    const[modal,setModal]=useState(false)
    const[noList,setnoList]=useState(false)
    const[List,setList]=useState(false)
    const[noproduct,setnoproduct]=useState(false)
    const[errors,setError]=useState(false)
    const[oneList,setoneList]=useState(false)
    const[Modes,setModes]=useState("")
    const[stateList,setstateList]=useState([...context.list])
    const[TheListName,setTheListName]=useState({...context.TheListName})
    let listNames=context.ListName;
    let Purchase=context.Purchase;
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
    const handleModes=(item)=>{
// console.log("item",item)
    setModes(item)
        // context.setModes(item);
        // setModal(true)
        if(listNames.length==0){
          setModal(true)
          setnoproduct(false)
        setnoList(true)
        setList(false)
      }
    else if(listNames.length==1){
      navigation.navigate(item)
      // if(Purchase.length==0){
      //   setnoproduct(true)
      //   setnoList(false)
      //   setList(false)
      //   // console.log("no product yet")
      // }else{

      // }
     
      }else{
        let dt=[]
        let index=stateList.indexOf(context.TheListName)
        // console.log("index",index)
       stateList.map((yt,indexy)=>{
         yt.status="false"
          if(index==indexy){
            yt.status="true"
            
          }
          dt.push(yt)
        })
        console.log(stateList)
        setstateList(dt)
        setList(true)
        setModal(true)

      }
  
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
     stateList.map(tr=>{
      tr.status="false"
      dt.push(tr)
     })
     setstateList(dt)
    context.setModes("");
     setModes("")
     setModal(false)}} />
        {noList&&<Text
        style={{fontSize:50,alignSelf:"center"}}
        >please create a list</Text>}
        {noproduct&&<Text
        style={{fontSize:50,alignSelf:"center"}}
        >please add some products </Text>}
         { oneList&& <Text
        style={{fontSize:50,alignSelf:"center"}}
        >please select one list</Text>}
        {List&& 
        // <Text>hello</Text>
        <View>

        <FlatList
          data={stateList}
          keyExtractor={(stateList) => stateList._id}
          
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
export default ModeScreens;
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
var _ = require('lodash');




function ShowListsScreen({ navigation,route }) {
  const context=useContext(listContext);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [visible, setVisible] =useState(false);
  const [loading, setloading] =useState(true);
  const [prod, setProd] =useState([]);
  const [tobedeleted, settobedeleted] =useState('');
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const ListName=context.ListName;
  const TheListName=context.TheListName;
  const TheChosen=context.TheChosen;
  const Chosen=context.Chosen;
  let chosenData=[];
  let getChosen=(item)=>{
    let chosenids=item.chosenIds
    if(chosenids.length!=0){
      chosenids.map(val=>{
        let theChosen=Chosen.filter(item=>item._id==val._id)
        theChosen=theChosen[0];
        theChosen.status=val.status;
        theChosen.quantity=val.quantity;
        chosenData.push(theChosen)
      })
      chosenData=_.uniq(chosenData,"_id")
    }
  //   // console.log("TheChosen",TheChosen);
  }

  // console.log("thecateg",context.TheCateg);
  // console.log("the gting",context.TheGting);
  // console.log("the prod",context.TheProd);
  // console.log("the categStore",context.CategStore);
  // console.log("the gtingsByCateg",context.GtingsByCateg);
  const getProducts=async()=>{
    if(prod.length==0){
      const {data:categ}=await getCategory("grossery");
      context.addCateg(categ);
      context.setCategStore(categ);
      setProd(categ)
      setloading(false)
      // console.log("server called");

    }
    // console.log("server called'nt khkh");
    }
  useEffect(()=>{
    getProducts();
    
  },[])


  ///////////////////////handleLiqtSelection//////////////////////////
  const handleListSelection=(item)=>{
    
  }
  ////////////////////////////////////////////////
      console.log(context);
 if(loading){
   return(<View style={{justifyContent:"center",alignItems:"center"}}>
     <ActivityIndicator animating={loading} size="large" />
   </View>)

 }else{

 
  return (

    <Screen style={styles.screen}>
      <Button title="scan" onPress={()=>{
        navigation.navigate("qrcodescanner")
      }} />
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
            onPress={()=>navigation.navigate("addList",ListName)}
        />
       <FlatList
          data={ListName}
          keyExtractor={(ListName) => ListName._id}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => 
          {  
           
              return<ListItem
              chevron={true}
                title={item.listName}
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
                onPress={()=>{
                  let theProd=item.prod;
                  let thegting="";
                  context.setListName(item);
                  context.setTheChosen([])
                  context.settheChosenProd([])
                  context.setCategProd([])
                  context.setTheProd(theProd)
                  // context.setTheGting(thegting)
                  // console.log(context.TheListName);
                  // console.log(context.TheProd);
                  // getChosen(item);
                  navigation.navigate("showlistitems",
                  {item:item,chosenData:chosenData})
                }}
                onLongPress={()=>{
                  console.log("halo");
                }}
                
                
              />
            }
          }
        />
         
         <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <View >
         
                     <Text>are u sure u wanna delete this</Text>
                  
          <View style={{justifyContent:"space-between"}}>
          <Button title='cancel' onPress={()=>{
            hideModal()
            }}/>
          <Button title='OK' onPress={()=>{
            context.removeFromListName(tobedeleted)
                hideModal()

          
          }}/>

          </View>
            
          </View>
        </Modal> 




    </Screen>
  );
}
}
const styles = StyleSheet.create({
  screen: {
    // padding: 20,
    backgroundColor: "#6f51ff",
  },
});

export default ShowListsScreen;

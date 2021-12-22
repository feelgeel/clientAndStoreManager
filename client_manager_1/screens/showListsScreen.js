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
import Indicator from "../../lottie-loading.json";
var _ = require('lodash');
const grossery = [
 
];
const beauty = [
  
];
const others = [

];

// console.log(localStorage.list);
const grossery_seperator= {
  id:100,
  component: <View style={{paddingVertical:"2%",paddingLeft:"5%"}}>
  <Text style={{color:"white"}}>GROSSERY</Text>
</View>
  
};
const beauty_seperator={
  id:101,component: <View style={{paddingVertical:"2%",paddingLeft:"5%"}}>
<Text style={{color:"white"}}>BEAUTY</Text>
</View>};
const others_seperator={
  id:101,component: <View style={{paddingVertical:"2%",paddingLeft:"5%"}}>
<Text style={{color:"white"}}>OTHERS</Text>
</View>};
function ShowListsScreen({ navigation,route }) {
  const showModal = () => setVisible(true);
  const [visible, setVisible] =useState(false);
  const [loading, setloading] =useState(true);
  const [prod, setProd] =useState([]);
  const [tobedeleted, settobedeleted] =useState('');
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const context=useContext(listContext);
  const TheListName=context.TheListName;
  const TheChosen=context.TheChosen;
  const Chosen=context.Chosen;
  const Lists=context.ListName;
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
    // console.log("TheChosen",TheChosen);
  }
  // console.log("theListName",TheListName);
  const getProducts=async()=>{
    if(prod.length==0){
      const {data:categ}=await getCategory();
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
  const handleListSelection=async(item)=>{
    let theProd=item.prod;
    await context.setListName(item);
    await context.setTheChosen([])
    await context.settheChosenProd([])
    await context.setCategProd([])
    await context.setTheProd(theProd)
    // getChosen(item);
    navigation.navigate("showlistitems",{item:item,chosenData:chosenData})
  }
  ////////////////////////////////////////////////
// console.log("thecateg",context.TheCateg);
  // console.log("the gting",context.TheGting);
//   console.log("the prod",context.TheProd);
//   console.log("the categStore",context.CategStore);
  // console.log("the gtingsByCateg",context.GtingsByCateg);

  //api/username
  //{username:"",email:"",timestamp:"",fom::"",to:"",prod:[]}
  const activities = [
    { title: 'Hiking', date: '2019-06-28'},
    { title: 'Shopping', date: '2019-06-10'},
    { title: 'Trekking', date: '2019-06-22'}
  ]
  // const activities = [
  //   { title: 'Hiking', date: new Date('2019-06-28')},
  //   { title: 'Shopping', date: new Date('2019-06-10')},
  //   { title: 'Trekking', date: new Date('2019-06-22')}
  // ]
  // const sortedActivities = activities.sort((a, b) => new Date(b.date) - new Date(a.date))
  // let jjj=new Date()
  // console.log(jjj);
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
            onPress={()=>navigation.navigate("addList")}
        />
       <FlatList
          data={Lists}
          keyExtractor={(Lists) => Lists._id}
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
                  onSwipeableRightOpen={()=>{
                  settobedeleted(item._id)  
                    showModal()
                  }}
                IconComponent={
                  <Icon
                    name={"menu"}
                    backgroundColor={colors.primary}
                  />
                }
                onPress={()=>handleListSelection(item)}
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

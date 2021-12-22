import React,{useState,useContext,useEffect} from "react";
import { FlatList, StyleSheet,View, Button,TextInput } from "react-native";
import Text from "../components/Text";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from '../components/Icon';
import listContext from "../list_context/list-context";
import { log } from "react-native-reanimated";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { getCategory, getGrosseryByName } from "../services/callingServer";
import AppFormField from "../components/forms/FormField";
import { Modal } from "react-native-paper";
import { Avatar, Button as ButtonPaper, Card, Title, Paragraph } from 'react-native-paper';
var _ = require('lodash');

function prodPickerScreen({ navigation,route }) {
  
  const context=useContext(listContext);
  const lists=context.list;
  let prod=route.params.item;
  let newList=route.params.newList;
  let theList=route.params.list;
  let chosenProdData=route.params.chosenProdData;
  let idList=theList._id;
  let chosen=theList.chosen;
  let name=prod.name;
  let quantity=prod.quantity;
  let id=prod._id;
  let TheChosenData=context.TheChosen;
  let TheChosenProds=context.TheChosenProds;
  let TheChosenName=TheChosenData.name;
  let chosenProdIds=TheChosenData.chosenProdIds
  let chosenProdId=TheChosenData.chosenProdId
  let listOfLists=lists.filter(item=>item._id==idList)
  let finalList=listOfLists.prodChosen||newList
    // console.log(chosenProdData);

  const[chosenItem,setChosenItem]=useState(prod.quantity);
  const[ Chosen,setChosen]=useState(chosenProdData);
  const[ TheChosen,setTheChosen]=useState();
  const[product,setProduct]=useState(context.TheChosenProds);
  const[product1,setProduct1]=useState(context.TheChosenProds);
  const [visible, setVisible] =useState(false);
  const [unselected,setUnselected]=useState(true);
  const [selected,setSelected]=useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  let chosenofCollection=[]
  const containerStyle = {backgroundColor: 'white', padding: 20};
let handleProducts=async()=>{
    const {data:gross}=await getGrosseryByName(TheChosenName);
    setProduct(gross);
}
  useEffect(()=>{
    handleProducts();
  },[])
  const resetQuantity=()=>{
    
   setChosenItem(prod.quantity)

  }
  const handleQuantity=(text)=>{
    if(text){
      
      setChosenItem(text)
    }else{

      setChosenItem(prod.quantity)
    }
  }
  useEffect(()=>{
    handleProducts()
    // finish()
      // handleProducts();
    setProduct1(context.TheChosenProds);
  },[context.TheChosenProds])

  console.log(Chosen);
  let prodObj=[]
  if(chosenProdData.length!==0){
    prodObj=[...product];
    let theChosen=[...Chosen];
    for (let i = 0; i < theChosen.length; i++) {
      const element = theChosen[i];
      const index = prodObj.findIndex(ele=>ele._id==element._id);
      prodObj.splice(index,1)
      
    }
   }else{
    prodObj=[...product];
   }
   
  const saveQuantity=()=>{
    let newObj={...theList};
    let newChosen=[...chosen];
    
    const index_chosen = newChosen.findIndex(item=>item._id==prod._id);
    // console.log(index_chosen);
    newChosen[index_chosen].quantity=chosenItem;
    newObj.chosen=newChosen
    // console.log(newObj);
    context.updateList(idList,newObj);


  }
  console.log("the chosen",context.TheChosen);
  let DaChosen=context.TheChosen;
  let ThechosenProdId=DaChosen.ThechosenProdId
  let chosenProdLength=0;
  if(ThechosenProdId==""){
    chosenProdLength=0;
  }else{
    chosenProdLength=1;
  }
  let chosenProd=context.ChosenProd;
  let TheProd=[...product]
//  let finish=()=>{
   if(DaChosen.chosenProdIds){
     
     DaChosen.chosenProdIds.map(item=>{
      //  console.log(item);
       let indexofData=chosenProd.findIndex(d=>d.Gting==item);
       if(indexofData!=-1){
         let tt=chosenProd.filter(dv=>dv.Gting==item);
         tt=tt[0]
         // console.log("tt",tt[0])
         chosenofCollection.push(tt)
        }
        let indexofProd=TheProd.findIndex(d=>d.Gting==item);
        TheProd.splice(indexofProd,1)
        // console.log(item);
        
      })
      // }
      // console.log("chosenprodid",ThechosenProdId);
      // setProduct(TheProd)
      // setChosen(chosenofCollection)
      
    }
    chosenofCollection=_.uniqBy(chosenofCollection, '_id')
  return (
    
    <Screen style={styles.screen}>


      <ListItem
          title={"name :"+name+" "+" quantity :"+quantity}
         
        />
      <ListItem
          title="ADD A PRODUCT"
          
          IconComponent={
            <Icon
              name="plus-circle"
              backgroundColor={colors.secondary}
              />
            }
            onPress={()=>{
              // setTimeout(() => {
                navigation.navigate("chosenProd",
              {item:prod,list:theList,prodobj:TheProd,chosenProdData:chosenofCollection}
              )
                
              // }, 50);
          }
          }
        />
       <View style={{flexDirection:"row",backgroundColor:"white"}}>

                            <Text >quantity :</Text>
                            <Text >" {chosenItem} "</Text>
                            <TextInput 
                            keyboardType="number-pad"
                             maxLength={255}
                             placeholder="quantity"
                             name="quantity"
                             onChangeText={(text)=>handleQuantity(text)}
                             />
                             <Button title='save' onPress={()=>{saveQuantity()}}/>
                             <Button title='cancel' onPress={()=>{resetQuantity()}}/>
                            </View>
                            <View  style={{flexDirection:"row",justifyContent:"space-between"}}>
              <Button style={{flex:0.5}} title={product1.length+'  TheList'} 
              onPress={()=>{setUnselected(true);setSelected(false)}}/>
              <Button style={{flexDirection:"row"}} title={chosenProdLength+'  theChosen'} 
              onPress={()=>{setUnselected(false);setSelected(true)}}/>

              </View>
     {unselected&&<FlatList
          data={product1}
          keyExtractor={(product1) => product1._id.toString()}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => 
          {  
           
              return<Card>
              {<Card.Cover source={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
              <Card.Content>
                <Title>{item.brands}</Title>
              </Card.Content>
              
            </Card>
            }
          }
        />}
     {selected&&<FlatList
          data={TheChosenProds}
          keyExtractor={(TheChosenProds) => TheChosenProds._id.toString()}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => 
          {  
           
              return<Card>
              {<Card.Cover source={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
              <Card.Content>
                <Title>{item.brands}</Title>
              </Card.Content>
              
            </Card>
            }
          }
        />}
         
         <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <View >
         
                      <FlatList
                        data={product}
                        keyExtractor={(product) => product._id.toString()}
                        ItemSeparatorComponent={ListItemSeparator}
                        renderItem={({ item }) => 
                        {  
                            return(  <Screen style={{flexDirection:"row"}} >
                                <Card>
                                  <Card.Content>
                                    <Title>{item.image_front_url}</Title>
                                  </Card.Content>
                                  {<Card.Cover source={{ uri: item.image_front_url }} />}
                                  
                                </Card>
                            </Screen >
                          )
                          }
                        }
                      />
                  
          <View style={{justifyContent:"space-between"}}>
          <Button title='cancel' onPress={()=>{
            handleReset()
            hideModal()
            }}/>
          <Button title='OK' onPress={()=>{
                context.updateList(listItems._id,listItems);
                navigation.navigate("showlistitems",listItems);
          }}/>

          </View>
            
          </View>
        </Modal> 
    </Screen>
  
  );




}

const styles = StyleSheet.create({
  screen: {
    // padding: 20,
    backgroundColor: "#6f51ff",
  },
});

export default prodPickerScreen;

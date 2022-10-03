import React,{useState,useContext,useEffect, useCallback, memo, useMemo} from "react";
import { FlatList, StyleSheet,View, Button } from "react-native";
import Text from "../components/Text";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { ListItem, ListItemSeparator,TodoListItem } from "../components/lists";
import Icon from '../components/Icon';
import TextInput from "../components/TextInput";
import { getgrossery, getCategory, getGrosseryByName } from "../services/callingServer";
import { Chip, Modal } from "react-native-paper";
import itemContext from "../list_context/list-context";
import { Avatar, Button as ButtonPaper, Card, Title, Paragraph } from 'react-native-paper';
import  * as Yup  from 'yup';
const log=console.log;
  
    let newObj=[]
    let newChosen=[];
    let listItems=[];
    let itemObj;
    let listObj;
    let listname;
    let listId;
    let storeName; 
function chosenProdScreen({ navigation,route }) {
  const context=useContext(itemContext);
  let chosenProdData=route.params.chosenProdData;
  let ZeListName=context.TheListName;
  let newTheListName={...ZeListName};
  const [visible, setVisible] =useState(false);
  const [product,setProduct]=useState(context.CategProd);
  const [chosen,setChosen]=useState(context.TheChosenProds);
  const [chosen1,setChosen1]=useState(context.TheChosenProds);
  const [search,setSearch]=useState("");
  const [filterOn,setFilteron]=useState(false);
  const [unselected,setUnselected]=useState(true);
  const [selected,setSelected]=useState(false); 
///////////////////////////////////
// _id: "6005327d5ee20f24c0054cc9"
// Gting: "6133320000802"
// codebar_type: ["ENA-13"]
// country_key: "613"
// product_name: "Mayonnaise aux  œuf"
// company_prefix: "6133320"
// product_type: "grossery"
// brands_tags: "jumbo"
// packaging: ""
// countries: "en:algeria"
// brands: "jumbo"
// purchase_places: ""
// manufacturing_places_tags: ""
// manufacturing_places: ""
// image_front_small_url: ""
// labels: ""
// generic_name: ""
// main_category: ""
// categories: ""
// categories_tags: ""
// image_front_url: ""
// image_url: ""
// image_small_url: ""
// main_categ: "condiment"
// categ: "mayonaise"
let newTheCateg={...context.TheCateg}

let gtingQuantity=0;
let newTheGting=chosen1.map((d)=>{
  return {gting:d.Gting,quantity:1,price:0,status:false}
})
newTheGting.map((d)=>{
  gtingQuantity+=d.quantity
})
newTheCateg.categQuantity=gtingQuantity
// console.log(gtingQuantity);
const handleUpdateListName=()=>{
let newTheProd=[...context.TheProd];
const categIndex = newTheProd.findIndex(item => item.categName === newTheCateg.categName);
//////updatethe Gting///
newTheCateg.prodGting=newTheGting
///////updaet Theprod///
newTheProd[categIndex]=newTheCateg
/////// update the listname////
newTheListName.prod=newTheProd
console.log(newTheListName);
}
handleUpdateListName()

//////////////////////////////////


//  console.log("thechosenprod00",context.TheChosenProds);
  itemObj=route.params.item;
  listObj=route.params.list;
  listId=listObj._id;
    let Theproduct=[...product]
    chosenProdData.map(item=>{
// console.log(item);
    let indexofProd=Theproduct.findIndex(d=>d.Gting==item.Gting);
    Theproduct.splice(indexofProd,1)

  })
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
    let mainCategItems=undefined;
   if(filterOn){
     mainCategItems=route.params.mainCateg;
    }else{
      mainCategItems=undefined
    }   
        let filter=product;
        if(search){
          filter=product.filter((m)=>m.brands.startsWith(search));
        }
        else if(mainCategItems){
          filter=product.filter((m)=>m.main_categ==mainCategItems);
        }
        else{
          mainCategItems='';
        }
    const handleSearch=(text)=>{
      
      let thetext=text.toLowerCase()
      setSearch(thetext);
      
    }
    // console.log(prod[0]);s
    const dissableFilter=()=>{
      setFilteron(false)
    }
    const handleAddItem=(item)=>{ 
      newObj=[...product]
      newChosen=[...chosen1]
      if(unselected){
        const index = newObj.indexOf(item);
        newChosen.push(newObj[index]); 
        newObj.splice(index,1)
        
        setProduct(newObj);
        setChosen1(newChosen);
      } if(selected){
        const index_chosen = chosen1.indexOf(item);
        chosen1[index_chosen].status=false
        newChosen.splice(index_chosen,1);
        newObj.push(chosen1[index_chosen]);
        setProduct(newObj);
        setChosen1(newChosen);
      }

    }
 let handleObjCreate=async()=>{

  // newTheListName={...TheListName};
  let chosenProdids=[]
  let theChosen={...context.TheChosen};
  let listId=newTheListName._id;
  chosen1.map(async(item)=>{
    chosenProdids.push(item.Gting)
    await context.addToChosenProd(item)
  })
  theChosen.chosenProdIds=chosenProdids;
  let index_prod=newTheListName.chosenIds.findIndex(d=>d._id==theChosen._id);
  newTheListName.chosenIds[index_prod]=theChosen;
  
     await context.updateListName(listId,newTheListName)
     await context.setTheChosen(theChosen)
     await context.settheChosenProd(chosen1)
     await context.setCategProd(product)
     await context.setTheGting(newTheGting)
     await context.setTheCateg(newTheCateg)
     await context.setTheProd(newTheListName.prod)
    setTimeout(() => {
      
      navigation.navigate("itemDetails",{chosenProdData:chosen});
      
    }, 500);
 }
//  console.log("thechosenProd",context.TheChosenProds);
//  console.log("listname",context.ListName);
    return (

      <Screen style={styles.screen}>
        
          <View style={{flexDirection:"row"}}>
         
              <TextInput 
              onChangeText={(text)=>handleSearch(text)}
                store={0} icon='search'/>
          </View>
         
              {filterOn&&<Chip style={{width:"50%"}} icon="information" onPress={dissableFilter}>{mainCategItems}</Chip>}
              <Button title='done' onPress={()=>{
                showModal();
                
              }}/>
              <View  style={{flexDirection:"row",justifyContent:"space-between"}}>
              <Button style={{flex:0.5}} title={product.length+'  unselected'} 
              onPress={()=>{setUnselected(true);setSelected(false)}}/>
              <Button style={{flexDirection:"row"}} title={chosen1.length+'  selected'} 
              onPress={()=>{setUnselected(false);setSelected(true)}}/>

              </View>
        {unselected&& <FlatList
            data={filter}
            keyExtractor={(product) => product._id.toString()}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => 
            {  
  
                return<Card onPress={()=>handleAddItem(item)}>
                  {<Card.Cover source={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
                  <Card.Content>
                    <Title>{item.brands}</Title>
                  </Card.Content>
                  
                </Card>
            
              }
            }
          />}
        {selected&& <FlatList
            data={chosen1}
            keyExtractor={(chosen1) => chosen1._id.toString()}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => 
            {  
  
                return<Card onPress={()=>handleAddItem(item)}>
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
         
                      {/* <FlatList
                        data={chosen}
                        keyExtractor={(chosen) => chosen._id.toString()}
                        ItemSeparatorComponent={ListItemSeparator}
                        renderItem={({ item }) => 
                        {  
                            return(  <Screen style={{flexDirection:"row"}} >
                              <label >quantity :</label>
                              <label >" {item.quantity} "</label>
                              <TextInput 
                               onChange={handleQuantity} 
                               maxLength={255}
                               placeholder="quantity"
                               name={item._id}
                               />
                            </Screen >
                          )
                          }
                        }
                      /> */}
                      <Text >are u sure u want to save</Text>
                  
          <View style={{justifyContent:"space-between"}}>
          <Button title='cancel' onPress={()=>{
            hideModal()
            }}/>
          <Button title='OK' onPress={()=>{
              handleObjCreate();
             
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

export default chosenProdScreen;

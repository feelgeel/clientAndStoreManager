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
  let lists=context.list;
  let prod=route.params.prodobj;
  let chosenProdData=route.params.chosenProdData;
  let categories=context.categories;
  // console.log(prod.length);
  const [visible, setVisible] =useState(false);
  const [product,setProduct]=useState(context.CategProd);
  const [chosen,setChosen]=useState(context.TheChosenProds);
  const [chosen1,setChosen1]=useState(context.TheChosenProds);
  const [search,setSearch]=useState("");
  const [filterOn,setFilteron]=useState(false);
  const [unselected,setUnselected]=useState(true);
  const [selected,setSelected]=useState(false); 
 
  itemObj=route.params.item;
  listObj=route.params.list;
  listId=listObj._id;
//   item=route.params.item;
//  console.log(route.params);
  // const getProds=async()=>{
  //   const {data:gross}=await getGrosseryByName(itemObj.name);
  //   setProduct(gross)
  // }
  // log(theList[0].chosen)
  // let finish=()=>{
    let Theproduct=[...product]
    chosenProdData.map(item=>{
// console.log(item);
    let indexofProd=Theproduct.findIndex(d=>d.Gting==item.Gting);
    Theproduct.splice(indexofProd,1)

  })
  // setProduct(Theproduct)
  // console.log("the product",Theproduct);
  // }
  // useEffect(()=>{
  //   setChosen(chosenProdData);
  //   setProduct(prod)
  //   // handleProducts()
  //   // context.addToList(prod)
  // },[])
  // console.log("chosenProdData",chosenProdData);
  // console.log("prod",product);
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

    // let ThelistName=context.TheListName;
    // let theChosen=context.TheChosen;
 let handleObjCreate=()=>{
  let ThelistName={...context.TheListName};
  let chosenProdids=[]
  let theChosen={...context.TheChosen};
  let listId=ThelistName._id;
  chosen1.map(item=>{
    // theChosen.chosenProdIds.push(item.Gting)
    chosenProdids.push(item.Gting)
    context.addToChosenProd(item)
    // log(item.Gting)
  })
  theChosen.chosenProdIds=chosenProdids;
  let index_prod=ThelistName.chosenIds.findIndex(d=>d._id==theChosen._id);
  ThelistName.chosenIds[index_prod]=theChosen;
  // console.log(index_prod);
  // console.log("chosenprodids",chosenProdids);
  // console.log("ThelistName.chosenIds",ThelistName.chosenIds);
  // console.log("theChosen",theChosen);
  // theChosen.chosenProdIds=chosenProdids
  // console.log("thechosenprod",theChosen.chosenProdIds);
  // console.log("thechosen",context.TheChosen);
  // ThelistName.chosenIds=theChosen
  // let index=ThelistName.chosenIds.indexOf(m=>m._id==theChosen._id)
  // ThelistName.chosenIds[index]=theChosen
    // let newList={...listObj}
    // newList.prodChosen=[...chosen];
    // let newListNames=[...context.ListName];
    // let newListNameIndex=newListNames.findIndex(val=>val._id==listId);
    //  let newChosenProdIds=newListNames[newListNameIndex].chosenProdIds;
    
    //  context.updateList(newList._id,newList);
    // chosen.map((item)=>{
    //   let chosenProdId=item.Gting;
    //   newChosenProdIds.push(chosenProdId);
    //   context.addToChosenProd(item)
    // })
    // newChosenProdIds=[...new Set(newChosenProdIds)]
    // newListNames[newListNameIndex].chosenProdIds=newChosenProdIds
     context.updateListName(listId,ThelistName)
     context.setTheChosen(theChosen)
     context.settheChosenProd(chosen1)
     context.setTheGting(chosen1)
     context.setCategProd(product)
    // // log(newChosenProdIds)
    
    // console.log(theChosen);
    // console.log("TheListname",context.TheListName);
    // console.log("Listname",context.ListName);
    // console.log("theChosen",context.TheChosen);
    // console.log("theChosen",theChosen);
    // console.log("ThelistName",ThelistName);
    // console.log("prod",chosen);
    setTimeout(() => {
      
      navigation.navigate("itemDetails",{chosenProdData:chosen});
      
    }, 500);
 }
//  console.log("thechosenProd",context.TheChosenProds);
//  console.log("listname",context.ListName);
    return (

      <Screen style={styles.screen}>
        
          <View style={{flexDirection:"row"}}>
         
              <TextInput onChangeText={(text)=>handleSearch(text)}  store={0} icon='search'/>
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

import React,{useState,useContext,useEffect, useCallback, memo, useMemo} from "react";
import { FlatList, StyleSheet,View, Button } from "react-native";
import Text from "../components/Text";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { ListItem, ListItemSeparator,TodoListItem } from "../components/lists";
import Icon from '../components/Icon';
import TextInput from "../components/TextInput";
import { getgrossery, getCategory } from "../services/callingServer";
import { Chip, Modal } from "react-native-paper";
import itemContext from "../list_context/list-context";
var _ = require('lodash');
import  * as Yup  from 'yup';
const log=console.log;
  
    let newObj=[]
    let newChosen=[];
    let listItems=[];
    let itemObj;
    let listname;
    let listId;
    let storeName;
function productScreen1({ navigation,route }) {
  const context=useContext(itemContext);
  let lists=context.list;
  let listNames=context.ListName;
  let TheListName=context.TheListName;
  let TheChosen=context.Chosen;
  
  listId=route.params.listObj._id;
  
  let theList=lists.filter(item=>item._id==listId)
  let contextList=TheListName.chosenIds
  let categoryList=route.params.categObj;
  // console.log(TheListName);
  const [visible, setVisible] =useState(false);
  const [product,setProduct]=useState(categoryList);
  const [chosen,setChosen]=useState(contextList);
  const [chosenQuantity,setChosenQuantity]=useState([]);
  const [search,setSearch]=useState("");
  const [filterOn,setFilteron]=useState(false);
  const [unselected,setUnselected]=useState(true);
  const [selected,setSelected]=useState(false); 
  
  itemObj=route.params;
  listname=route.params.listObj.listName;
  storeName=route.params.storeName;
  listItems={ 
    "_id":listId,
    "listName":listname,
    "storeName":storeName,
    "chosen":chosen,
  }
 
  // log(theList[0].chosen)
  
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
    let mainCategItems=undefined;
   if(filterOn){
     mainCategItems=route.params.mainCateg;
    }else{
      mainCategItems=undefined
    }   
        let filtering=product;
        if(search){
          filtering=product.filter((m)=>m.name.startsWith(search));
        }
        else if(mainCategItems){
          filtering=product.filter((m)=>m.main_categ==mainCategItems);
        }
        else{
          mainCategItems='';
        }
    const handleSearch=(text)=>{
      let thetext=text.toLowerCase()
      setSearch(thetext);
      
    }
    const dissableFilter=()=>{
      setFilteron(false)
    }
    const handleAddItem=(item)=>{ 
      newObj=[...product]
      newChosen=[...chosen]
      if(unselected){
        const index = newObj.indexOf(item);
        // newObj[index].status=true
        // chosenProdIds:[],ThechosenProdId:""
        newObj[index].quantity=1;
        newObj[index].chosenProdIds=[];
        newObj[index].ThechosenProdId=[];
        newChosen.push(newObj[index]); 
        newObj.splice(index,1)
        
        setProduct(newObj);
        setChosen(newChosen);
        // setChosenQuantity(newChosen);
      } if(selected){
        const index_chosen = chosen.indexOf(item);
        // chosen[index_chosen].status=false
        newChosen.splice(index_chosen,1)
        newObj.push(chosen[index_chosen]);
        setProduct(newObj);
        setChosen(newChosen);
        // setChosenQuantity(newChosen);
      }

    }
    
    // log(product[0])
    let newChosenQuantity=[]
    let handleQuantity=(text,item)=>{
      // let newChosenQuantity=[...chosenQuantity];
      let _id=item._id;
      let quant=text;
      if(quant!=="")
      {
      let finishedObj={_id:_id,quant:quant}
      // // item.quantity=text;
      let index_quat=newChosenQuantity.findIndex(t=>t._id==_id);

        if(index_quat!==-1)
        {
          newChosenQuantity.splice(index_quat,1)
        }
      newChosenQuantity.push(finishedObj)


      // console.log("finishedobj",finishedObj);
      // newChosenQuantity= _.uniqBy(newChosenQuantity, '_id')
      // console.log(item.quantity);
      // let id=item;
      // newChosenQuantity=[...chosen];
      // const index_chosen = newChosenQuantity.findIndex(item=>item._id==id);
      // console.log(target);
      // newChosenQuantity[index_chosen].quantity=text;
      // newChosen=[...chosen];
      // const index_chosen = newChosen.findIndex(item=>item._id==id);
      // console.log("newChosenQuantity",newChosenQuantity);
      // newChosen[index_chosen].quantity=text;
      // setChosenQuantity(newChosenQuantity)
    
    }else{
      let index_quat=newChosenQuantity.findIndex(t=>t._id==_id);
      newChosenQuantity.splice(index_quat,1)

      // console.log(newChosenQuantity);
    }

    }
    let handleReset=()=>
  {
    newChosenQuantity=[]
    setChosenQuantity([])
    // let theNewChosen=[];
    // if(contextList.length!==0){
    //   setChosen(contextList)
    // }else{
    //  theNewChosen=[...chosen]
    //   for (let j = 0; j < theNewChosen.length; j++) {
    //     const element = theNewChosen[j];
    //     element.quantity=1
        
    //   }
    //   setChosen(theNewChosen)
    // }
    // newChosenQuantity=chosen
  }
  ///////////////////////////////////////////
  let newTheListName={...TheListName}
  const handleListCreation=()=>{
     newTheListName={...TheListName}
    let newProd=[]
    // console.log("thelistname",newTheListName.prod);
    let newChosendt=[]
    if(chosen){
     newChosendt=chosen.map(s=>{
        return{_id:s._id,storeName,categName:s.name,prodGting:[],categQuantity:s.quantity,categPrice:0,status:false}
      })
  
    }
    newTheListName.prod=newChosendt
    console.log(newTheListName);
    listItems=newTheListName
    // console.log(listItems)
  }
  handleListCreation()
  //////////////////////////////////////////
  // log("chosen",chosen)
  // log("newChosenQuantity",chosenQuantity)
  // log("chiosenQuantity",chosen)
    return (

      <Screen style={styles.screen}>
        
          <View style={{flexDirection:"row"}}>
  
          <Icon
           onPress={()=>{
            setFilteron(true);
             navigation.navigate("mainCategfilter",product)}}
             name={"filter"}
               backgroundColor={colors.secondary}
               />
              <TextInput onChangeText={(text)=>handleSearch(text)}  store={0} icon='search'/>
          </View>
         
              {filterOn&&<Chip style={{width:"50%"}}                                                                                                            icon="information" 
              onPress={dissableFilter}>{mainCategItems}</Chip>}
              <Button title='done' onPress={()=>{
                showModal();
                
              }}/>
              <View  style={{flexDirection:"row",justifyContent:"space-between"}}>
              <Button style={{flex:0.5}} title={filtering.length+'  unselected'} 
              onPress={()=>{setUnselected(true);setSelected(false)}}/>
              <Button style={{flexDirection:"row"}} title={chosen.length+'  selected'} 
              onPress={()=>{setUnselected(false);setSelected(true)}}/>

              </View>
        {unselected&& <FlatList
            data={filtering}
            keyExtractor={(filtering) => filtering._id.toString()}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => 
            {  
  
                return<ListItem
                chevron={true}
                  title={item.name}
                  checkbox={true}
                  checked={item.status}
                  renderRightActions={()=><View style={{width:70}} ></View>}
                  IconComponent={
                    <Icon
                      name={"menu"}
                      backgroundColor={colors.primary} 
                    />
                  }
                  onPress={()=>handleAddItem(item)}
                />
              }
            }
          />}
        {selected&& <FlatList
            data={chosen}
            keyExtractor={(chosen) => chosen._id.toString()}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => 
            {  
  
                 return<ListItem
                 chevron={true}
                   title={item.name}
                   checkbox={true}
                   checked={item.status}
                   renderRightActions={()=><View style={{width:70}} ></View>}
                   IconComponent={
                     <Icon
                       name={"menu"}
                       backgroundColor={colors.primary} 
                     />
                   }
                   onPress={()=>handleAddItem(item)}
                 />
               
              }
            }
          />}
           
           <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <View >
         
                      <FlatList
                        data={chosen}
                        keyExtractor={(chosen) => chosen._id.toString()}
                        ItemSeparatorComponent={ListItemSeparator}
                        renderItem={({ item }) => 
                        {  
                            return(  <Screen style={{flexDirection:"row"}} >
                              <Text >quantity :</Text>
                              <Text >" {item.quantity} "</Text>
                              <TextInput 
                              keyboardType="number-pad"
                               onChangeText={(text)=>handleQuantity(text,item)} 
                               maxLength={255}
                               placeholder="quantity"
                               name={item._id}
                               />
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
            // setChosen(newChosenQuantity)
            let newChosen=[...chosen]
            if(newChosenQuantity.length!==0){
              // console.log("ready");
              newChosenQuantity.map(d=>{
                console.log("chosen quant",d);
                let indexChosen=newChosen.findIndex(item=>item._id==d._id);
                console.log("index chosen",indexChosen);
                
                  newChosen[indexChosen].quantity=d.quant
               
      

              })

            }
            newChosen=_.uniq(newChosen,"_id");
            // setChosen(newChosen)

                context.updateList(listItems._id,listItems);
                let list={...newTheListName}
                let listId=list._id;
                list.chosenIds=newChosen
                      context.updateListName(listId,list)
                      context.setListName(list)  
                      context.setTheProd(list.prod)  
                navigation.navigate("showlistitems",{listItems:listItems,chosenData:chosen});
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

export default productScreen1;

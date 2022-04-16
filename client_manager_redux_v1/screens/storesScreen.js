import React,{useState,useContext,useEffect} from "react";
import { FlatList, StyleSheet,View, Button, ActivityIndicator } from "react-native";
import Text from "../components/Text";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from '../components/Icon';
import { getgrossery, getCategory } from "../services/callingServer";
import itemContext from "../list_context/list-context";
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

function storesScreen({ navigation,route }) {
  const context=useContext(itemContext);
    const theList=route.params;
    const categObj=route.params.categObj;
    let TheListName=context.TheListName;
    let chosenids=TheListName.chosenIds;
    const listObj=route.params.listObj;
    const [loading, setloading] =useState(false);
    // console.log("The chosen",TheListName);
    // console.log("categ",categObj);
    
    let newCategObj=[...categObj]
    if(chosenids.length!==0){
        chosenids.map(item=>{
          let Theindex=newCategObj.findIndex(d=>d._id==item._id);
          newCategObj.splice(Theindex,1);
          // console.log(Theindex);
        })
    }
    // console.log(newCategObj);
const  handleServerCall=async(item)=>{
  // console.log(item.link)
  // setloading(true)
  // switch (item.storeName) {
  //   case "grossery":
  //     const {data:gross}=await getCategory();
  //     break;
  
  //   default:
  //     break;
  // }
  //   console.log(gross);
    navigation.navigate("products",{
      listObj:chosenids,
      storeName:item.storeName,
      categObj:newCategObj
    })
}
  return (

    <Screen style={styles.screen}>
        {loading&&<ActivityIndicator animating={loading} size="large" />}
    
      <View style={{height:150,paddingLeft:"5%",paddingTop:"10%"}}>
        <Text style={{color:"white"}}>HELLO CISCO</Text>
        <Text style={{color:"white"}}>Have a nice day</Text>
      </View>
        
       <FlatList
          data={stores}
          keyExtractor={(stores) => stores.id.toString()}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => 
          {  
            if(!item.component){

              return<ListItem
              chevron={true}
                title={item.storeName}
                IconComponent={
                  <Icon
                    name={"menu"}
                    backgroundColor={colors.primary}
                  />
                }
                onPress={()=>{
                  handleServerCall(item)
              
              }
            }
              />}else{
                return item.component
              }
            }
          }
        />
         
      
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    // padding: 20,
    backgroundColor: "#6f51ff",
  },
});

export default storesScreen;

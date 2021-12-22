import React,{useState,useContext,useEffect} from "react";
import { FlatList, StyleSheet,View, Button } from "react-native";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from '../components/Icon';
import TextInput from "../components/TextInput";
const log=console.log;

function categFilter({ navigation,route }) {
    let categ=route.params;
    let showneData=[]

    for (let a = 0; a < categ.length; a++) {
       let ele=categ[a]
       let id=a.toString()
       let finishedArr={_id:id,categ:ele,mainCateg:null}
       showneData.push(finishedArr)
    //    console.log(showneData);

    }

    // console.log(showneData);

  return (

    <Screen style={styles.screen}>
      
        <View style={{flexDirection:"row"}}>
        <TextInput  store={0} icon='search'/>
        </View>
       <FlatList
          data={showneData}
          keyExtractor={(showneData) => showneData._id}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => 
          {  
            if(!item.component){

              return<ListItem
              chevron={true}
                title={item.categ}
                IconComponent={
                  <Icon
                    name={"menu"}
                    backgroundColor={colors.primary} 
                  />
                }
                onPress={()=>navigation.navigate("products",item)}
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

export default categFilter;

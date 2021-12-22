import React,{useState,useContext,useEffect} from "react";
import { FlatList, StyleSheet,View, Button } from "react-native";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from '../components/Icon';
import TextInput from "../components/TextInput";
const log=console.log;

function mainCategFilter({ navigation,route }) {
    let mainCateg=route.params;
    let showneData=[]
    let mainCategArr=[]

    for (let b = 0; b < mainCateg.length; b++) {
       let ele=mainCateg[b];
       mainCategArr.push(ele.main_categ)
      //  let id=b.toString()
      //  let finishedArr={_id:id,mainCateg:ele.main_categ}
      //  showneData.push(finishedArr)
    //    console.log(mainCateg);

    }
    mainCategArr=[...new Set(mainCategArr)];
    for (let b = 0; b < mainCategArr.length; b++) {
       let ele=mainCategArr[b];
       let id=b.toString()
       let finishedArr={_id:id,mainCateg:ele}
       showneData.push(finishedArr)
      //  console.log(mainCateg);

    }
    // console.log(showneData[0].mainCateg);

  return (

    <Screen style={styles.screen}>
      
        <View style={{flexDirection:"row"}}>
        <TextInput store={0} icon='search'/>
        </View>
       <FlatList
          data={showneData}
          keyExtractor={(showneData) =>showneData._id}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => 
          {  
            if(!item.component){

              return<ListItem
              chevron={true}
                title={item.mainCateg}
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

export default mainCategFilter;

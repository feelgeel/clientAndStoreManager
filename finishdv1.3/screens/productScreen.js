import React,{useState,useContext,useEffect} from "react";
import { FlatList, StyleSheet,View, Button } from "react-native";
import Text from "../components/Text";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { ListItem, ListItemSeparator,TodoListItem } from "../components/lists";
import Icon from '../components/Icon';
import TextInput from "../components/TextInput";
import { getgrossery } from "../services/callingServer";
import { Chip } from "react-native-paper";
const log=console.log;

  let categ=[];
  let categArr=[];
  let main_categ=[];
  let main_categArr=[];
  

function productScreen({ navigation,route }) {
    const [product,setProduct]=useState("");
    const [search,setSearch]=useState("");
    const [filterOn,setFilteron]=useState(false);
    const [status,setStatus]=useState("unchecked");
    // const [mainCategFilter,setmainCategFilter]=useState("");
    let categItems=undefined;
    let mainCategItems=undefined;
   if(filterOn){
     categItems=route.params.categ;
     mainCategItems=route.params.mainCateg;
     
    }else{
      categItems=undefined
      mainCategItems=undefined
   } 
        // setcategFilter(route.params.categ)
        const getProducts=async()=>{
            const {data:gross}=await getgrossery();
            setProduct(gross);
        }
        useEffect(()=>{
            getProducts()
        },[])
        
        
        for (let i = 0; i < product.length; i++) {
            const element = product[i];
            let categItem=element.categ;
            let main_categItem=element.main_categ;
            categ.push(categItem);
            main_categ.push(main_categItem);
        }
        
        categ=[...new Set(categ)]
        main_categ=[...new Set(main_categ)]
        
       
        let filter=product;
       if(search){

          filter=product.filter((m)=>m.product_name.startsWith(search));
          
         
        }
        else if(categItems){

          filter=product.filter((m)=>m.categ==categItems);
          
        }
        else if(mainCategItems){
          filter=product.filter((m)=>m.main_categ==mainCategItems);
        }
        
        else{
          categItems="";
          mainCategItems='';
     
    }
    const handleSearch=({currentTarget:input})=>{
      const val=input.value;
      setSearch(val);
    }
    const dissableFilter=()=>{
      setFilteron(false)
    }
   log(filterOn)
    return (

      <Screen style={styles.screen}>
        
          <View style={{flexDirection:"row"}}>
  
          <Icon
                  onPress={()=>{
                    setFilteron(true)
                    navigation.navigate("categFilter",categ)}}
               name={"filter"}
               backgroundColor={colors.primary}
           />
  
          <Icon
           onPress={()=>{
            setFilteron(true);
             navigation.navigate("mainCategfilter",main_categ)}}
               name={"filter"}
               backgroundColor={colors.secondary}
           />
              <TextInput onChange={handleSearch}  store={0} icon='search'/>
          </View>
         
              {filterOn&&<Chip style={{width:"50%"}} icon="information" onPress={dissableFilter}>{categItems||mainCategItems}</Chip>}
         <FlatList
            data={filter}
            keyExtractor={(filter) => filter._id.toString()}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => 
            {  
              if(!item.component){
  
                return<ListItem
                chevron={true}
                  title={item.product_name}
                  checkbox={true}
                  selected={status}
                  IconComponent={
                    <Icon
                      name={"menu"}
                      backgroundColor={colors.primary} 
                    />
                  }
                  onPress={()=>setStatus("checked")}
                />}else{
                  return item.component
                }
              }
            }
          />
         <FlatList
            data={filter}
            keyExtractor={(filter) => filter._id.toString()}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => 
            {  
              if(!item.component){
  
                return<ListItem
                chevron={true}
                // checkbox={true}
                // selected={status}
                  title={item.product_name}
                  IconComponent={
                    <Icon
                      name={"menu"}
                      backgroundColor={colors.primary} 
                    />
                  }
                  
                />}else{
                  return item.component
                }
              }
            }
            onPress={()=>log("hell")}
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

export default productScreen;

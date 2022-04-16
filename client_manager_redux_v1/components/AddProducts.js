import React,{useState} from 'react';
import { StyleSheet, View,Text,FlatList,Button,Modal } from 'react-native';
import {  Card, Title,List } from 'react-native-paper';
import Icon from './Icon';
import colors from '../config/colors';
import TextInput1 from "./TextInput";
import { useSelector, useDispatch } from "react-redux";
import {getCategory} from "../api/grosseryApi";
import GeneratedQrCode from './GeneratedQrCode';
const stores=[

  {
      id:1,
      storeName:"grosseries",
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
function AddProducts({product,chosen,
    onUnselected,onAddProduct,onSelected,showPriceAddprod=false,showBenefit=false}) {
    const dispatch=useDispatch();
  const storeListnames=useSelector(state=>state.entities.store_listNames.list)
  const storeproducts=useSelector(state=>state.entities.store_products.list)
  const addgting=useSelector(state=>state.entities.addingGting)
  const addgtingStore=useSelector(state=>state.entities.addingGtingStore)
//   let theStore=addgting.store;
//   let theCateg=addgting.categ;
  let theCategs=addgting.categObj;
    const [unselected,setUnselected]=useState(false);
    const [selected,setSelected]=useState(true);
    const [filterModal,setfilterModal]=useState(false);
    const [store,setstore]=useState("grosseries");
    const [categs,setCategs]=useState(theCategs);
    const [categ,setCateg]=useState("milk");
    const [filterStore,setfilterStore]=useState(stores);
    const [filterCateg,setfilterCateg]=useState(categs);

    
    const handleStoreSearch=(item)=>{
      let thetext=item.toLowerCase();
      let filterStore1=stores.filter((m)=>m.storeName.startsWith(thetext));
    setfilterStore(filterStore1)
    }
    const handleCategSearch=(item)=>{
      let thetext=item.toLowerCase();
      let filterCateg1=categs.filter((m)=>m.name.startsWith(thetext));
      setfilterCateg(filterCateg1)
    }   
    // console.log(addgtingStore)
    const handleStores=async(item)=>{
      let thetext=item.toLowerCase();
      setstore(thetext)
      const {data:thecategs}=await getCategory(item);

    //   thecategs.filter(dt=>dt.Gting===)
      setCategs(thecategs)
      setfilterCateg(thecategs)
    // console.log(categs)
    }
    const handleCateg=(item)=>{
      let thetext=item.toLowerCase();
      setCateg(thetext)
      setCateg(thetext)
    console.log(categs)
    }

return (
<View style={styles.container}>
<Icon name="filter" 
backgroundColor={colors.secondary}
 size={50}  
 onPress={()=>setfilterModal(true)} 
/>
< View style={{flexDirection:"row",
              justifyContent:"space-between"}}>
              <Button style={{flex:0.5}} 
              title={product.length+'unselected'} 
              onPress={()=>{setUnselected(true);setSelected(false)}}
              />
              <Button style={{flexDirection:"row"}} title={chosen.length+'selected'} 
              onPress={()=>{setUnselected(false);setSelected(true)}}
              />

</View>
{unselected&&<FlatList
    data={product}
    keyExtractor={(product) => product._id}
    
    renderItem={({ item }) => 
    {
        return (
          <Card 
          onPress={()=>onUnselected(item)}
          >
          {<Card.Cover source={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
          <Card.Content>
            <Title> {"brand: "+item.brands+"|| Gting : "+item.Gting}</Title>
          </Card.Content>
          
        </Card>
        )
    }
  }
  />
}
   {selected&&<FlatList
    data={chosen}
    keyExtractor={(chosen) => chosen.productId}
    
    renderItem={({ item }) => 
    {
        let thePrice=showPriceAddprod?"||price:"+item.price:"";
        let theBenefit=showBenefit?"||benefit:"+item.benefit:"";
        return (
          <Card 
          onPress={()=>onSelected(item)}
          >
          {<Card.Cover source={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
          <Card.Content>
            <Title>
            {"brand: "+item.brands+
            " || quantity:"+
            item.quantity+"|| Gting : "+item.Gting+thePrice+theBenefit}</Title>
          </Card.Content>
          
        </Card>
        )
    }
  }
  />
  }
    <Modal
 visible={filterModal}
 >
    <Button  title={"out"} 
                onPress={()=>setfilterModal(false)}
                />
    <Button  title={"save"} 
                onPress={()=>{
                    setfilterModal(false)
                    onAddProduct(store,categ)}}
                />
    
    <View style={styles.container}>
      <List.Accordion
        title={"stores"+"  "+store}
        // left={props => <List.Icon {...props} icon="folder" />}
        >
        
        <TextInput1 
              onChangeText={(text)=>handleStoreSearch(text)}
                store={0} icon='search'/>
        <FlatList
          data={filterStore}
          keyExtractor={(filterStore) => [filterStore.id].toString()}
          
          renderItem={({ item }) => 
          {
              return <List.Item 
              title={item.storeName} 
              onPress={()=>handleStores(item.storeName)} />
          }
        }
        />
      
      </List.Accordion>
      <List.Accordion
        title={"categories"+"   " +categ}
        // left={props => <List.Icon {...props} icon="folder" />}
        // expanded={expanded}
        // onPress={handlePress}
        >
           <TextInput1 
              onChangeText={(text)=>handleCategSearch(text)}
                store={0} icon='search'/>
       <FlatList
          data={filterCateg}
          keyExtractor={(filterCateg) => filterCateg._id}
          
          renderItem={({ item }) => 
          {
              return <List.Item 
              title={item.name} 
              onPress={()=>handleCateg(item.name)} />
          }
        }
        />
      </List.Accordion>
</View>
</Modal>

</View>
 );
}
const styles = StyleSheet.create({

})
export default AddProducts;
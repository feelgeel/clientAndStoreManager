import React,{useState} from 'react';
import { StyleSheet, View,Text,FlatList,Button,Modal } from 'react-native';
// import {  Card, Title,List } from 'react-native-paper';
import Icon from './Icon';
import colors from '../config/colors';
import C_TextInput from "./C_TextInput";
import { useSelector, useDispatch } from "react-redux";
import {getCategory} from "../api/grosseryApi";
import { ListItem, ListItemSeparator } from "../components/lists";
import C_Button from './C_Button';
import C_Card from './C_Card';
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
function AddProducts(
    {product,
    chosen,
    onUnselected,
    onAddProduct,
    verification=false,
    onSelected,
    manualOrder=false,
    selfServing=false,
    clientStock,
    onAddStockAlert,
    sell,
    buttonColor,
    }) {
    const dispatch=useDispatch();
  const storeListnames=useSelector(state=>state.entities.store_listNames.list)
  const storeproducts=useSelector(state=>state.entities.store_products.list)
  const addgting=useSelector(state=>state.entities.addingGting)
  const addgtingStore=useSelector(state=>state.entities.addingGtingStore)
  let theCategs=addgting.categObj;
    const [unselected,setUnselected]=useState(false);
    const [selected,setSelected]=useState(true);
    const [filterModal,setfilterModal]=useState(false);
    const [choseFilterModal,setchoseFilterModal]=useState(false);
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
    // console.log(categs)
    }
let unverified=verification?"unVerified":"unselected"
let verified=verification?"Verified":"selected"
// console.log("state",!verification&&!clientStock)
return (
<View style={styles.container}>
{(!verification&&!clientStock&&!sell)&&<Icon name="filter" 
backgroundColor={colors.secondary}
 size={50}  
 onPress={()=>{
    //  if()
     setchoseFilterModal(true)}
     } 
/>}
<View style={{flexDirection:"row",
              justifyContent:"space-between"}}>
              <C_Button 
              style={{flex:0.5}} 
              title={product.length+"  "+unverified} 
            //   color={unselected&&"#dc3545"}
            width="23%"
            fontSize={15}
            padding={5}
              onPress={()=>{setUnselected(true);setSelected(false)}}
              />
              <C_Button style={{flexDirection:"row"}} 
              title={chosen.length+"  "+verified} 
            //   color={selected&&"#dc3545"}
              width="23%"
              fontSize={15}
              padding={5}
              onPress={()=>{setUnselected(false);setSelected(true)}}
              />

</View>
{unselected&&<View>
    {product.length==0&&<Text style={{fontSize:30}} >product list is empty</Text>}
    <FlatList
    data={product}
    keyExtractor={(product) => product._id}
    
    renderItem={({ item }) => 
    {
        let sellQuantity=sell?" ||quantity:"+item.quantity:"";
        let sellSellPrice=sell?" ||sellprice:"+item.sellPrice:"";
        let sellTotalprice=sell?" ||totalPrice:"+Number(item.sellPrice)*Number(item.quantity):"";
        let clientStockquantity=clientStock?"||quantity:"+item.quantity:"";
        let clientStockByuPrice=clientStock?"||byuPrice:"+item.ByuPrice:"";
        let clientStockstockAlert=clientStock?"||stockAlert:"+item.stockAlert:"";
        // console.log("item",item)
        return (
            <C_Card
            image={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }}
            title={"brand: "+item.brands+"|| Gting : "+item.Gting+
                clientStockquantity+clientStockByuPrice+clientStockstockAlert+
                sellSellPrice+sellQuantity}
                onPress={()=>onUnselected(item)}
            />
        //   <C_Card
        //   onPress={()=>onUnselected(item)}
        //   >
        //   {<Card.Cover source={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
        //   <Card.Content>
        //     <Title> {"brand: "+item.brands+"|| Gting : "+item.Gting+
        //     clientStockquantity+clientStockByuPrice+clientStockstockAlert+
        //     sellSellPrice+sellQuantity}</Title>
        //   </Card.Content>
          
        // </Card>
        )
    }
}
/>
</View>
}
   {selected&&
   <View>
    {chosen.length==0&&<Text style={{fontSize:30}} >chosen list is empty</Text>}

   <FlatList
    data={chosen}
    keyExtractor={(chosen) => chosen._id}
    
    renderItem={({ item }) => 
    {
        let sellPrice=Number(item.ByuPrice)*(1+(Number(item.benefit)/100))
        let clientStockByuPrice=clientStock?"||byuPrice:"+item.ByuPrice:"";
        // let clientStockstockAlert=clientStock?"||stockAlert:"+item.stockAlert:"";
        let sellSellPrice=sell?" ||sellprice:"+item.sellPrice:"";
        let sellTotalprice=sell?" ||totalPrice:"+Number(item.sellPrice)*Number(item.quantity):"";
        let clientStockstockAlert=clientStock?" ||stockAlert:"+item.stockAlert:"";
        let selfServingByuPrice=selfServing?" ||byuPrice:"+item.ByuPrice:"";
        let selfServingstockAlert=selfServing?" ||stockAlert:"+item.stockAlert:"";
        let manOrderByuPrice=manualOrder?" ||byuPrice:"+item.ByuPrice:"";
        let manOrderTheBenefit=manualOrder?" ||benefit:"+item.benefit:"";
        let manOrderSellPrice=manualOrder?" ||sellPrice:"+sellPrice:"";
        let manOrderStockAlert=manualOrder?" ||StockAlert:"+item.stockAlert:"";
        let perimationAlert=manualOrder?" ||perimationAlert:"+item.perimationAlert:"";
        let perimationDate=manualOrder?" ||perimationDate:"+item.perimationDate:"";
        // let priority=manualOrder?" ||priority:"+item.priority:"";
        // console.log("sell",item)
        return (
            <C_Card
            image={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }}
            title= {"brand: "+item.brands+
            " || quantity:"+
            item.quantity+"|| Gting : "+
            item.Gting+manOrderByuPrice+
            manOrderTheBenefit+manOrderSellPrice+manOrderStockAlert+
            selfServingByuPrice+selfServingstockAlert+clientStockByuPrice+
            clientStockstockAlert+sellSellPrice+sellTotalprice+perimationAlert+
            perimationDate}
            onPress={()=>onSelected(item)}
            />
        //   <Card 
        //   onPress={()=>onSelected(item)}
        //   >
        //   {<Card.Cover source={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
        //   <Card.Content>
        //     <Title>
        //     {"brand: "+item.brands+
        //     " || quantity:"+
        //     item.quantity+"|| Gting : "+
        //     item.Gting+manOrderByuPrice+
        //     manOrderTheBenefit+manOrderSellPrice+manOrderStockAlert+
        //     selfServingByuPrice+selfServingstockAlert+clientStockByuPrice+
        //     clientStockstockAlert+sellSellPrice+sellTotalprice+perimationAlert+
        //     perimationDate}</Title>
        //   </Card.Content>
          
        // </Card>
        )
    }
}
/>
</View>
  }
    <Modal
 visible={choseFilterModal}
 >
 <C_Button
 title="exit"
 onPress={()=>{
    setchoseFilterModal(false)}}
 />
 <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                <C_Button title='getProductvia categories :'
                // color={buttonColor}
                width="45%"
              fontSize={15}
            //   padding={5}
                onPress={()=>{
                    setchoseFilterModal(false)
                    setfilterModal(true)
                  }}
                  />
                <C_Button title='getProduct via stockAlert :'
                // color={buttonColor}
                width="45%"
              fontSize={15}
            //   padding={5}
                onPress={()=>{
                    onAddStockAlert()
                    setchoseFilterModal(false)
                }}
                />
             </View>
  </Modal>
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
    
    <View >
      {/* <List.Accordion
        title={"stores"+"  "+store}
        // left={props => <List.Icon {...props} icon="folder" />}
        >
        
        <C_TextInput 
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
           <C_TextInput 
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
      </List.Accordion> */}

</View>
</Modal>

</View>
 );
}
const styles = StyleSheet.create({
container:{
    backgroundColor:colors.light,
    
}
})
export default AddProducts;
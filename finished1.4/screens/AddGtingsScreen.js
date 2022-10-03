import React ,{useState,useContext}from 'react';
import { StyleSheet, View,Button,Modal,FlatList,Text,TextInput } from 'react-native';
import Screen from '../components/Screen';
import Icon from '../components/Icon';
import colors from '../config/colors';
import itemContext from "../list_context/list-context";
import TextInput1 from "../components/TextInput";
import { getCategory, getGrosseryByName } from '../services/callingServer';
import { ListItem } from '../components/lists';
import {  Card, Title,List } from 'react-native-paper';
import *as addingGtingAction from '../redux/addingGting';
import { useSelector, useDispatch } from "react-redux";
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



function AddGtingsScreen({navigation}) {
    const addgting=useSelector(state=>state.entities.addingGting)
    
    const dispatch=useDispatch();
    // dispatch(addingGtingAction.addCategObj({gtin:"613458759",status:"false"}))
    console.log(addgting.categObj);
    const context=useContext(itemContext);
    const [chosen1,setChosen1]=useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [quantityModal, setquantityModal] = useState(false);
    const [product,setProduct]=useState([]);
    const [store,setStore]=useState("grossery");
    const [categ,setCateg]=useState("milk");
    const [categs,setCategs]=useState();
    const [chosenitem,setchosenitem]=useState({});
    const [Quantity,setQuantity]=useState("1");
    const [reload,setreload]=useState(false);
    const [unselected,setUnselected]=useState(true);
  const [selected,setSelected]=useState(false); 
  const [chosen,setchosen]=useState([]); 
  const [filterCateg,setfilterCateg]=useState(categs);
  const [filterStore,setfilterStore]=useState(stores);
  const [expanded, setExpanded] =useState(true);
  const containerStyle = {backgroundColor: 'white', padding: 20};

//   let filterStore=stores;
//   let filterCateg=categs;
  const handleFilter=()=>{

 setModalVisible(true)
  }
  const handlePress = () => setExpanded(!expanded);
  const handleStores=async(item)=>{
      const {data:categ}=await getCategory(store);
      setStore(item) 
      setCategs(categ)
    //   dispatch(addingGtingAction.addCategObj(categ))
    console.log("categ",item);
    
    // dispatch(addingGtingAction.addCategObj({gtin:"613458759",status:"false"}))

  }
  const handleCateg=(item)=>{
      setCateg(item)
  
  }
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

 
const handleDone=async()=>{
    let filtered=chosen1.filter((t)=>t.categ==categ)
    const  {data:prod}=await getGrosseryByName(categ);
        // setProduct(prod)
        let newProd=[...prod];
        let filteredIndex=0;
        let tempy=filtered[0]
        // if(filtered.length!==0){
        //   filteredIndex=newProd.indexOf(t=>t._id==tempy._id)
        // }
filteredIndex=prod.indexOf((t)=>t._id==tempy._id)
    //  console.log(filteredIndex)
    //  console.log(filtered)
    //  console.log(newProd)

        setProduct(newProd)
       
    
    setModalVisible(false)
    //   console.log(newProd)
    //   console.log(prod)
    }
const handleAddItem=(item)=>{

    let newObj=[...product]
    let newChosen=[...chosen1]
 
      const index = newObj.indexOf(item);
      newObj[index].Quantity=Quantity
    //   console.log(newObj[index]);
    let _id=(Math.random())*(Math.random())+(Math.random());
    _id=_id.toString(); 
    let finishedObj={
        _id,
        listName:context.TheListName.listName,
        gtingId:item._id,
        categ:item.categ,
        main_categ:item.main_categ,
        storeName:item.product_type,
        Gting:item.Gting,
        brand:item.brands,
        status:"false",
        product_name:item.product_name,
        Quantity:item.Quantity,
        image_front_small_url:item.image_front_small_url,
        image_front_url:item.image_front_url,
        image_url:item.image_url,
        image_small_url:item.image_small_url,

    }
      newChosen.push(finishedObj); 
      newObj.splice(index,1)
      
      setProduct(newObj);
      setChosen1(newChosen); 
      setquantityModal(false)  

}
const handleDeleteChosen=(item)=>{
    let newObj=[...product]
    let newChosen=[...chosen1]
      const index_chosen = chosen1.indexOf(item);
    //   chosen1[index_chosen].status=false
      chosen1[index_chosen].Quantity=1
      newChosen.splice(index_chosen,1);
    //   if(item.categ==categ){
    //       newObj.push(chosen1[index_chosen]);

    //   }
      setProduct(newObj);
      setChosen1(newChosen);
}
const handlesave=()=>{
  chosen1.map(tt=>{
    //   console.log(tt)
      context.addToPusrchases(tt)
  })

navigation.navigate("showlistitems")
}
// console.log(chosen1)
return (
<Screen style={styles.container}>
<Button  title={"Save"} 
              onPress={handlesave}
              />
<Button  title={"reload"} 
              onPress={()=>setreload(true)}
              />
<Icon name="filter" 
backgroundColor={colors.secondary}
 size={50}  onPress={handleFilter} />
< View style={{flexDirection:"row",
              justifyContent:"space-between"}}>
              <Button style={{flex:0.5}} 
              title={product.length+'unselected'} 
              onPress={()=>{setUnselected(true);setSelected(false)}}
              />
              <Button style={{flexDirection:"row"}} title={chosen1.length+'selected'} 
              onPress={()=>{setUnselected(false);setSelected(true)}}
              />

</View>

 {unselected &&  <FlatList
          data={product}
          keyExtractor={(product) => product._id}
          
          renderItem={({ item }) => 
          {
              return (
                <Card 
                onPress={()=>{setquantityModal(true)
                setchosenitem(item)
                }}
                >
                {<Card.Cover source={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
                <Card.Content>
                  <Title>{item.brands}</Title>
                </Card.Content>
                
              </Card>
              )
          }
        }
        />}
 {selected &&  <FlatList
          data={chosen1}
          keyExtractor={(chosen1) => chosen1._id}
          
          renderItem={({ item }) => 
          {
              return (
                <Card 
                onPress={()=>handleDeleteChosen(item)}
                >
                {<Card.Cover source={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
                <Card.Content>
                  <Title>{item.brands}</Title>
                </Card.Content>
                
              </Card>
              )
          }
        }
        />}
<Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <Button
        title="done"
        onPress={handleDone} />
       

        <List.Section title="Accordions">
      <List.Accordion
        title={"Stores"+"  "+store}
        left={props => <List.Icon {...props} icon="folder" />}>
        
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
        left={props => <List.Icon {...props} icon="folder" />}
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
    </List.Section>
      
      </Modal>

<Modal 
 animationType="slide"
 // transparent={true}
 contentContainerStyle={containerStyle}
 visible={quantityModal}
 onRequestClose={() => {
   // Alert.alert("Modal has been closed.");
   setquantityModal(false);
 }}
>
<View style={{
    flexDirection:"row",justifyContent:"center"}}>
    <Text style={{paddingRight:20,fontSize:30}}>quantity</Text>
<TextInput onChangeText={(t)=>setQuantity(t)} placeholder="quantity" style={{width:50,height:50}}/>

</View>
     
<View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
<Button title='cancel'

 onPress={()=>{
    setquantityModal(false)
 }}
/>
<Button title='OK'
  onPress={()=>{
    handleAddItem(chosenitem)
 }}
/>
</View>

      </Modal>
</Screen>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default AddGtingsScreen;
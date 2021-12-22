import React, { useContext, useState } from 'react';
import { Button, Modal, FlatList, StyleSheet, Text, View,SectionList } from 'react-native';
import Screen from '../components/Screen';
import listContext from '../list_context/list-context';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {  Card, Title,List } from 'react-native-paper';
import TextInput from "../components/TextInput";
import { ListItem } from '../components/lists';
import Icon from '../components/Icon';
import colors from '../config/colors';
function SelfServingScreen({navigation,route}) {
    const context=useContext(listContext);
    const [scannedgting, setScannedgting] = useState("6130433000200");
    const [Scannedresult, setScannedresult] = useState([]);
    const [data, setdata] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [Resultmodal, setResultmodal] = useState(false);
    let listNames=context.ListName
    let TheListName={...context.TheListName}
    let Purchases=context.Purchase;
    let finishedObj=[]

  // console.log(listNames)
  // console.log(Purchases)
 

    //////////////////////////////////////
listNames.map(t=>{
  const name=t.listName
  if(TheListName.listName==name){

    let data=[];
    Purchases.map(tr=>{
      if(name==tr.listName){
        data.push(tr)
      }
    })
    finishedObj.push({
      title:name,
      data
    })
  }
})
  console.log(finishedObj)

    ////////////////////////////////////////

    const handleBarCodeScanned=({ type, data })=>{
     console.log("type",type);
     console.log("data",data);
      }
      const DATA = [
        {
          title: 'Main dishes',
          data: ['Pizza', 'Burger', 'Risotto'],
        },
        {
          title: 'Sides',
          data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
        },
        {
          title: 'Drinks',
          data: ['Water', 'Coke', 'Beer'],
        },
        {
          title: 'Desserts',
          data: ['Cheese Cake', 'Ice Cream'],
        },
      ];
      // console.log(DATA[0])
      const Item = ({ title }) => (
        <View style={styles.item}>
          <Text onPress={()=>console.log(title)} 
          style={styles.title}>{title}</Text>
        </View>
      );
      const handleChecked=()=>{
        //6130433000200
        //6133320000802
        let data=finishedObj[0].data;
        let dtt=[]
        data.map(dt=>{
          if(dt.Gting==scannedgting){
            dt.status="true";
          }
          dtt.push(dt)
        })
        finishedObj[0].data=dtt
        // console.log("dtt",dtt)
        // let result=[];
        // let thedata=[];
        // let res=finishedObj.map(fn=>{
        //   let data=fn.data;
        //   let dtres=data.filter(dt=>dt.Gting==scannedgting)
        //   // let newDtres=dtres.map(tt=>{
        //   //   tt.listName=fn.title
        //   // })
        //   // console.log(index)
          
        //   result.push({
        //     title:fn.title,
        //     data:dtres
        //   });
        //   thedata.push(dtres)
        //   })
          
        //   setdata(thedata)
        //   setScannedresult(result)
        //   // if(result.length==1){
            
        //     // }else{
              
        //       setResultmodal(true)
        //       // }
              
            }
            
            console.log(data)
      const handleChoose=(item)=>{
      let dttt=data.map(tr=>{
        console.log(tr)
      })
      
      }
      // console.log(Scannedresult[0])
return (
<Screen style={styles.container}>
<Text>selfServing</Text>
<Button
title="scan"
onPress={()=>setModalVisible(true)} />
<Button
title="exit selfServing mode"
onPress={()=>{
    context.setModes("")
navigation.navigate("modeScreen")}
} />

 {/* <List.Section title="listNames"> */}
 <FlatList
      data={finishedObj}
      keyExtractor={(finishedObj) => [finishedObj.title].toString()}
      
      renderItem={({ item }) => 
      {
        let data=item.data
          return (
            <List.Accordion
            expanded={true}
            title={"listName: "+item.title}
            // left={props => <List.Icon {...props} icon="folder" />}
            >
                {data.length==0&&<Text
                      style={{fontSize:50,alignSelf:"center"}}
                              >please add a product</Text>}
           <FlatList
              data={data}
              keyExtractor={(data) => data._id}
                  
              renderItem={({ item }) => 
              {
              return (
                <Card 
                style={{paddingTop:50}}
                // onPress={()=>handleDeleteChosen(item)}
                >
                {<Card.Cover source={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
                <Card.Content>
                  <Title>{item.brand+" "+
                  item.Gting+" quantity: "
                  +item.Quantity+" status: "+item.status}</Title>
                </Card.Content>
                
                </Card>
                  )
              }
    }
    />
          </List.Accordion>
          )
      }
    }
    />
    {/* </List.Section> */}
      
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
        onPress={()=>setModalVisible(false)} />
        <TextInput keyboardType="number-pad" 
        placeholder="gting"
        onChangeText={(text)=>{
          setScannedgting(text)
          // console.log(tex)
        }
          } />
        <Button
        title="checked"
        onPress={()=>handleChecked()} />
        {/* <View style={{flex:1,paddingTop:"50%",justifyContent:"center",alignItems:"center"}}>
          <BarCodeScanner
         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
         // barCodeTypes={[BarCodeScanner.Constants.Type.qr,BarCodeScanner.Constants.Type.ena13]}
       
         style={styles.bar}
          />
        {scanned && <Button title={'Tap to Scan'} onPress={() => setScanned(false)} />} 
  
</View> */}
      </Modal>
 <Modal
        animationType="slide"
        visible={Resultmodal}
        onRequestClose={() => {
          setResultmodal(false);
        }}
      >
        <Button
        title="done"
        onPress={()=>setResultmodal(false)} />
          <SectionList
      sections={Scannedresult}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => {
        console.log(item.status);
        return (    <ListItem
          checked={item.status}
          checkbox={true}
          title={item.brand}
          IconComponent={
            <Icon
              name="plus-circle"
              backgroundColor={colors.secondary}
              />
            }
            onPress={()=>handleChoose(item)}
        />)
    }}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
        
      </Modal>
</Screen>
 );
}
const styles = StyleSheet.create({
  bar:{
    width:"100%",
    height:"90%"
},
item: {
  backgroundColor: '#f9c2ff',
  padding: 20,
  marginVertical: 8,
},
header: {
  fontSize: 32,
  backgroundColor: '#fff',
},
title: {
  fontSize: 24,
},
})
export default SelfServingScreen;
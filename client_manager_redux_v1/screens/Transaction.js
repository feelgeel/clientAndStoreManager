import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View,FlatList } from 'react-native';
import Screen from '../components/Screen';
import listContext from '../list_context/list-context';
import { BarCodeScanner } from 'expo-barcode-scanner';
import *as listNamesAction from '../redux/listNames';
import {updateProducts} from '../api/productsApi';
import { ListItem, ListItemSeparator } from "../components/lists";
import {  Card, Title,List } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import SvgQRCode from 'react-native-qrcode-svg';
function Transaction({navigation,route}) {
    const transMode=useSelector(state=>state.entities.listNames.transMode)
    const listNames=useSelector(state=>state.entities.listNames.list)
    const theChosen=useSelector(state=>state.entities.addingGting.chosen)
    const theListName=useSelector(state=>state.entities.listNames.theList)
    const dispatch=useDispatch();
    const context=useContext(listContext)
    const [list, setList] = useState(true);
    const [qrcode, setQrcode] = useState(false);
    const [listNamesState, setlistNames] = useState(listNames);
    const [daListName, setTheListName] = useState();

    // const handleBarCodeScanned=({ type, data })=>{
    //     console.log("type",type);
    //     console.log("data",data);
    //      }

    // let objsent={user:"6124f745d7",
    //     data:[{
    //     gting:"613254685",
    //     quantity:"5",
    //          }]
    // }
    const handleList=(item)=>{
        let newListName=[...listNamesState];
        let list_index=listNamesState.findIndex(dt=>dt._id===item._id)
        let thenewListName={...newListName[list_index]};
        thenewListName.status=!thenewListName.status
        newListName[list_index]=thenewListName
        // console.log(list_index)
        setlistNames(newListName)
        setTheListName({
            _id:item._id
        })
    }
    console.log(daListName)
return (
<Screen >  
<Text>byu from store</Text>
<Button
title="exit byufromstore"
onPress={()=>{
    context.setModes("");
    dispatch(listNamesAction.setTransMode("modeScreen"));
navigation.navigate("modeScreen")}
} />
{list&&
<Screen> 
<Button
title="done"
onPress={()=>{
    setQrcode(true)  
    setList(false) 
}
} />
<FlatList
          data={listNamesState}
          keyExtractor={(listNamesState) => listNamesState._id}
          
          renderItem={({ item }) => 
          {
              return (
                <ListItem
          title={item.listName+" status :"+item.status}
            onPress={()=>handleList(item)}
        />
              )
          }
        }
        />

</Screen> 
    }

{qrcode&&
<View>
<Button
title="done"
onPress={()=>{
    setList(true)  
    setQrcode(false)  
}
} /> 
  <View style={{paddingTop:"50%",justifyContent:"center",alignItems:"center"}}>
 <SvgQRCode style={{paddingLeft:50}} size={300} logoSize={20} value={JSON.stringify(daListName)} />
     
   
 </View> 
 </View> 
}
</Screen>
)
}
const styles = StyleSheet.create({
    container:{

    }
})
export default Transaction;
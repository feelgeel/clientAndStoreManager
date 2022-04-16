import React, { useState } from 'react';
import { StyleSheet,View,Text } from 'react-native';
import Screen from '../../components/Screen';
import { ListItem } from '../../components/lists';
import Icon from '../../components/Icon';
import colors from '../../config/colors';
import {CancleListSaved,handleUnselected,handleSave,SellListSaved} from './showlistNamesfunc';
import AddProductModel from '../../components/AddProductModel';

function showlistNames1({children,style}) {
    const [selectedlistName, setselectedlistName] =useState({});
    const [chosen, setchosen] =useState([]);
    const [product, setproduct] =useState([]);
    const [modalAddList, setmodaladdlist] =useState(false);
    const [listname, setlistname] =useState([]);
return (
<Screen style={styles.screen}>
<View style={{height:150,paddingLeft:"5%",paddingTop:"10%"}}>
        <Text style={{color:"white"}}>HELLO CISCO</Text>
        <Text style={{color:"white"}}>Have a nice day</Text>
</View>
<ListItem
    title="ADD A LIST"
    IconComponent={
      <Icon
        name="plus-circle"
        backgroundColor={colors.secondary}
        />
      }
    //   onPress={()=>{setmodaladdlist(true)}}
  />
      <AddProductModel/>
</Screen>
 );S
}
const styles = StyleSheet.create({
    screen: {
        // padding: 20,
        backgroundColor: "#6f51ff",
      },
})
export default showlistNames1;
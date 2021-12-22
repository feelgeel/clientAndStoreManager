import React, { useState } from 'react';

import { Button, FlatList, Modal,
         Platform, StyleSheet,
         TouchableWithoutFeedback, View } from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import CustomColors from '../config/CustomColors';
import CustomText from './CustomText';
import ItemPicker from './ItemPicker';
function CustomePicker({icon,placeholder,
                        items,onSeletItem,
                        selectedItem,customwidth}) {
    const [modal,setModal]=useState(false)
    return (
 <>
<TouchableWithoutFeedback
    onPress={()=>setModal(true)}>

        <View style={[styles.container,{width:customwidth}]}>
        {icon&& <MaterialCommunityIcons
         name={icon}
         size={20}
         style={styles.icon}
         color={CustomColors.medium}
         />}
        {selectedItem?
        <CustomText style={styles.text}>{selectedItem.label}</CustomText>:
        <CustomText style={styles.placeholder}>{placeholder}</CustomText>}
          {icon&& <MaterialCommunityIcons
         name="chevron-down"
         size={20}
         color={CustomColors.medium}
         
         />}
     </View>
</TouchableWithoutFeedback>
<Modal visible={modal}
        animationType="slide"
>
    <Button title="close"
    onPress={()=>setModal(false)}/>
    <FlatList
    data={items}
    keyExtractor={item=>item.value.toString()}
    renderItem={({item})=>(
    <ItemPicker
    label={item.label}
    onPress={()=>{
        onSeletItem(item)
        setModal(false);
    }}
    />)}
    />
</Modal>
</>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:CustomColors.light,
        borderRadius:25,
        flexDirection:"row",
        
        padding:15,
        marginVertical:10
    },
    icon:{
        marginRight:10,
        
    },
    text:{
        flex:1
    },
    placeholder:{
        color:CustomColors.medium,
        flex:1,
    },
    textInput:{
        color:CustomColors.dark,
        fontSize:18,
        fontFamily:Platform.OS==="android"?"Roboto":"Avenir",

    }
})
export default CustomePicker;
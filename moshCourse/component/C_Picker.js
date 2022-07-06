import React, { useState } from 'react';
import { StyleSheet, View ,Modal,TouchableWithoutFeedback,Button,FlatList} from 'react-native';
import C_Text from './C_Text';
import  {MaterialCommunityIcons} from "@expo/vector-icons"
import colors from '../config/colors';
import Screen from './Screen';
import C_ItemPicker from './C_ItemPicker';


function C_Picker({placeholder,items,selectedItem,
    onSelectedItem,icon}) {
    const [modalVisible,setmodalVisible]=useState(false)
return (
<>
    <TouchableWithoutFeedback 
    onPress={()=> setmodalVisible(true)}>
        <View style={styles.container}>
        {icon && <MaterialCommunityIcons 
            size={30} 
            name={icon}
            color={colors.medium}
            style={styles.icon}
            />}
            <C_Text style={styles.text}
            >{selectedItem?selectedItem.label:placeholder}</C_Text>
            <MaterialCommunityIcons 
            size={20} 
            name="chevron-down"
            color={colors.medium}
            style={styles.icon}
            />
        </View>
    </TouchableWithoutFeedback>
    <Modal 
    visible={modalVisible}
    animationType="slide"
    >
    <Screen>

    <Button title="Close" onPress={()=> setmodalVisible(false)}/>
    <FlatList
    data={items}
    keyExtractor={(items) => items._id.toString()}
    renderItem={({ item }) => (
        <C_ItemPicker
        label={item.label}
        onPress={()=>{
            setmodalVisible(false)
            onSelectedItem(item)
        
        }}
        />
    )}
    />
    </Screen>
    </Modal>
</>
 );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.light,
        borderRadius:25,
        flexDirection: "row",
        width:"90%",
        padding:15,
        marginVertical: 10,
        marginHorizontal: 30,
        alignItems: "center",
        // justifyContent: "space-around",
        },
        TextInput:{
          fontSize: 18,  
        },
        icon:{
          padding:10
        
        },
        text:{
            flex:1
        }
})
export default C_Picker;
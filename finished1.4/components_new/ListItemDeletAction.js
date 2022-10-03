import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import CustomColors from '../config/CustomColors';
import {MaterialCommunityIcons} from "@expo/vector-icons"
function ListItemDeletAction({onPress}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="trash-can"
          size={35}
          color={CustomColors.white}
        />
      </View>
    </TouchableWithoutFeedback>
       
    );
}
const styles = StyleSheet.create({
    container:{
        // flex:1,
        backgroundColor:CustomColors.danger,
        width:70,
        justifyContent:"center",
        alignContent:"center"
    }
})
export default ListItemDeletAction;
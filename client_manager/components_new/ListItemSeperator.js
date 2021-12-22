import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomColors from '../config/CustomColors';

function ListItemSeperator(props) {
    return (
        <View style={styles.seperate}>
            
        </View>
    );
}
const styles = StyleSheet.create({
    seperate:{
        width:"100%",
        height:1,
        backgroundColor:CustomColors.light,

    }
})
export default ListItemSeperator;
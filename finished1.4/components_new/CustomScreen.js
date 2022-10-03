import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';


function CustomScreen({children,style}) {
    return (
        <SafeAreaView style={[styles.screen,style]}>
            <View style={[style,styles.subContainer]}>{children}</View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    screen:{
        flex:1,
        paddingTop:Platform.OS==="android"?StatusBar.currentHeight:0,
    },
    subContainer:{
        flex:1,
        // backgroundColor:"red",
    }
})
export default CustomScreen;
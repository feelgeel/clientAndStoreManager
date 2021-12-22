import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from "lottie-react-native";

function CustomActindicator({visible=false}) {
    if(!visible) return null;
return (
    <View style={styles.overlay}>

        <LottieView
        autoPlay
        loop
        source={require("../assets/animation/8684-loading-animation.json")}
        />
    </View>
 );
}
const styles = StyleSheet.create({
    overlay:{
        position: "absolute",
        backgroundColor: "white",
        height: "100%",
        opacity: 0.8,
        width: "100%",
        zIndex: 1,
}
})
export default CustomActindicator;
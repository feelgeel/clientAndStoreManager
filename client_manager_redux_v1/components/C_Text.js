import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

function C_Text({ children, style,...otherProps }) {
  return <Text style={[styles.text, style]} {...otherProps} >{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default C_Text;

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function C_Button({ title, onPress,
   color = "primary",
   width="100%",fontSize=18,padding }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color],width:width }]}
      onPress={onPress}
    >
      <Text style={[styles.text,{fontSize:fontSize,padding:padding}]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default C_Button;

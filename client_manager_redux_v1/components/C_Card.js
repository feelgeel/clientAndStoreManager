import React from "react";
import { View, StyleSheet, Image,TouchableWithoutFeedback } from "react-native";

import C_text from "./C_Text";
import colors from "../config/colors";

function C_Card({ image,title,onPress,subTitle }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View  style={styles.card}>
      <Image style={styles.image} source={image} />
      <View style={styles.detailsContainer}>
        <C_text style={styles.title}>{title}</C_text>
        <C_text style={styles.subTitle}>{subTitle}</C_text>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    marginHorizontal:10
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default C_Card;

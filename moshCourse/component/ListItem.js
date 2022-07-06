import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import C_Text from "./C_Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from "../config/colors";

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <C_Text style={styles.title}
            numberOfLines={1}>{title}</C_Text>
            {subTitle && <C_Text style={styles.subTitle}>{subTitle}</C_Text>}
          </View>
          <MaterialCommunityIcons
          name="chevron-right"
          // color="white"
          size={35}
        />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    marginLeft: 10,
    flex:1,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;

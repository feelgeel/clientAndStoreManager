import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons,AntDesign } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Checkbox } from 'react-native-paper';

import Text from "../Text";
import colors from "../../config/colors";

function TodoListItem({
  title,
  subTitle,
  image,
  IconComponent,
  IconEdit,
  IconDelete,
  editOnPress,
  deleteOnPress,
  checkbox,
  renderRightActions,
  status,
  onPress,
}) {
  // const [status,setStatus]=useState("checked")
  return (
    <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
          </View>
         {checkbox&& <Checkbox.Item onPress={onPress} label="" status={status} />}
         {IconEdit&& <AntDesign
         onPress={editOnPress}
            color={colors.primary}
            name={"edit"}
            size={40}
          />}
        
          

         {IconDelete&& <MaterialCommunityIcons
             onPress={deleteOnPress}
            color={colors.primary}
            name={"delete"}
            size={40}
          />}
        
        </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
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

export default TodoListItem;

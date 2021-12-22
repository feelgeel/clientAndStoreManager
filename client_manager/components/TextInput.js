import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons,FontAwesome5,FontAwesomes } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
let IconStores=[FontAwesome5,MaterialCommunityIcons,FontAwesomes];
let Icon=IconStores[1];
function AppTextInput({ store,icon, width = "100%",onChange, ...otherProps }) {
        Icon=IconStores[store];
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <Icon
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
      onChange={onChange}
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;

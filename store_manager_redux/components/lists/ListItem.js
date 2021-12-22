import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons,Feather } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../Text";
import colors from "../../config/colors";
import { Checkbox } from 'react-native-paper';

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  quantity,
  onPress,
  renderRightActions,
  renderLeftActions,
  onSwipeableLeftOpen,
  onSwipeableRightOpen,
  containerStyle,
  childrenContainerStyle,
  styling,
  checkbox,
  checked,
  theQuantity,
  onLongPress
}) {
  return (
    <Swipeable 
    onSwipeableLeftOpen={onSwipeableLeftOpen}
     renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions} 
      overshootLeft={false}
      overshootRight={false}
      childrenContainerStyle={childrenContainerStyle}
      containerStyle={containerStyle}
      onSwipeableRightOpen={onSwipeableRightOpen}>
      {/*  onSwipeableLeftOpen={()=>}> */}
      <TouchableHighlight underlayColor={colors.light} onPress={onPress} onLongPress={onLongPress}>
        <View style={styles.container}>
          {image && <Image style={styles.image} source={image} />}
          <View style={styling?styling:styles.detailsContainer}>
          {IconComponent}
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
          </View>
          {/* <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" /> */}
         
         {quantity&& <View style={{flexDirection:"row",alignItems:"flex-start"}}>
         <Feather
            color={colors.primary}
            // style={{paddingRight:80}}
            name={"x"}
            size={25}
            /><View ><Text >{theQuantity}</Text></View>
            </View>
            }
            
          {checkbox&& <MaterialCommunityIcons
            // style={{paddingRight:80}}
            color={colors.secondary}
            name={checked=="true"?"checkbox-marked":"checkbox-blank-outline"}
            size={25}
          />}
        
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
    justifyContent:"space-between",
  },
  detailsContainer: {
    flexDirection: "row",
    // flex: 1,
    marginLeft: 10,
    justifyContent: "flex-start",
    alignItems: "center",
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
    paddingLeft:10,
    fontWeight: "500",
  },
});

export default ListItem;

import React from 'react';
import { Image, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import CustomColors from '../config/CustomColors';
import CustomText from './CustomText';
import {MaterialCommunityIcons} from "@expo/vector-icons"
function ListItem({
    title,image,
    subTitle,IconComponent,
    onPress,renderRightActions
    }) {
    return (
        <Swipeable
        renderRightActions={renderRightActions}
        >
            
            <TouchableHighlight
            underlayColor={CustomColors.light}
            onPress={onPress}>

                <View style={styles.container} >
                    {IconComponent}
                   {image && <Image style={styles.image} 
                    source={image} />}
                    <View style={styles.detailsContainer} >
                    <CustomText
                    numberOfLines={1}
                    style={styles.title}
                     >{title}</CustomText>
                    {subTitle&&<CustomText
                     numberOfLines={1}  style={styles.subTitle}
                    >{subTitle}</CustomText>}
                    </View>
                   <MaterialCommunityIcons name="chevron-right"
                    size={30} />
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        padding:15,
        alignItems:"center",
        backgroundColor:"white",

    },
    detailsContainer:{
        marginLeft: 10,
        justifyContent:"center",
        flex:1
    },
    containerInfo:{
        borderRadius:50,
        borderColor:"blue"
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
      
      },
    title:{
       color:"black"
       
    },
    subTitle:{
        fontWeight: "500",
        color: CustomColors.medium,

    }
})
export default ListItem;
import React from 'react';
import { Image,StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import CustomColors from '../config/CustomColors';
import CustomText from './CustomText';
// import {Image} from "react-native-expo-image-cache";
function CustomCard({title,onPress,subTitle,imageUrl}) {
  const uri=imageUrl;
    return (
      <TouchableWithoutFeedback onPress={onPress}>

          <View  style={styles.card}>
         
          <Image style={styles.image} 
            source={{uri:imageUrl}}
          />
            <View style={styles.detailsContainer}>
                <CustomText style={styles.title}
                  >{title}</CustomText>
                <CustomText style={styles.subTitle}
                  >{subTitle}</CustomText>
                
            </View>

          </View>
      </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: CustomColors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: CustomColors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});
export default CustomCard;
import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomColors from '../config/CustomColors';
import CustomScreen from './CustomScreen';
import CustomText from './CustomText';

function OfflineNotice({}) {
    const netInfo=useNetInfo();
    if(netInfo.type!=="unknown"&& netInfo.isInternetReachable===false)
return (
    <CustomScreen>

        <View style={styles.container}>
            <CustomText style={styles.text}>
                No internet connection
            </CustomText>
        </View>
    </CustomScreen>
 );
 else return null;
}
const styles = StyleSheet.create({
container:{
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:CustomColors.primary,
    height:50,
    width:"100%",
    position:"absolute",
    zIndex:1
},
text:{
    color:CustomColors.white,
    fontSize:30
}
})
export default OfflineNotice;
import React from 'react';
import { StyleSheet } from 'react-native';
import CustomText from './CustomText';

function ErrMessage({err,visible}) {
    if(!visible||!err) return null;
    return (
        <CustomText
         style={styles.err}
         >
            {err}
        </CustomText>
    );
}
const styles = StyleSheet.create({
   err :{
       color:"red"
   }
})
export default ErrMessage;
import React from 'react';
import { StyleSheet, View } from 'react-native';
import C_Text from './C_Text';

function C_ErrorMessage({error,visible}) {
    if(!visible||!error) return null
return (
<View style={styles.container}>
<C_Text style={styles.error}>{error}</C_Text>
</View>
 );
}
const styles = StyleSheet.create({
    error:{
        color:"red"
}
})
export default C_ErrorMessage;
import React from 'react';
import { StyleSheet, View,TouchableOpacity } from 'react-native';
import C_Text from './C_Text';

function C_ItemPicker({label,onPress}) {
return (
<TouchableOpacity
 style={styles.container}
 onPress={onPress}
 >
<C_Text style={styles.text}
 onPress={onPress}>{label}</C_Text>
</TouchableOpacity>
 );
}
const styles = StyleSheet.create({
container:{

},
text:{
    padding:20
}
})
export default C_ItemPicker;
import React from 'react';
import { StyleSheet, View,Modal,Button,Text } from 'react-native';
import Screen from './Screen';
import AddSell from '../components/AddSell';

function AddProductModel() {

return (
<Screen style={styles.container}>
<AddSell/>
 </Screen>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default AddProductModel;
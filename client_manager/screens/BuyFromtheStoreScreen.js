import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import listContext from '../list_context/list-context';
import { BarCodeScanner } from 'expo-barcode-scanner';
function BuyFromtheStoreScreen({navigation,route}) {
    const context=useContext(listContext)
    const [scanned, setScanned] = useState(false);
    const handleBarCodeScanned=({ type, data })=>{
        console.log("type",type);
        console.log("data",data);
         }

    let objsent={user:"6124f745d7",
        data:[{
        gting:"613254685",
        quantity:"5",
             }]
    }
return (
<Screen style={styles.container}>  
<Text>byu from store</Text>
<Button
title="done"
onPress={()=>{
    context.setModes("");
navigation.navigate("modeScreen")}
} />
</Screen>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default BuyFromtheStoreScreen;
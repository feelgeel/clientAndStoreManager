import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Screen from '../components/Screen';

function ScannerScreen() {
    const [scanned, setScanned] = useState(false);
    const handleBarCodeScanned=({ type, data })=>{
        setScanned(true);
        console.log(data);
      }
return (
    <Screen>
    {/* <Text>{gting}</Text> */}
<View style={{flex:1,paddingTop:"50%",justifyContent:"center",alignItems:"center"}}>
<BarCodeScanner
       onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
       // barCodeTypes={[BarCodeScanner.Constants.Type.qr,BarCodeScanner.Constants.Type.ena13]}
       
       style={styles.bar}
     />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} 
  
</View>
   
 </Screen>
 );
}
const styles = StyleSheet.create({
    bar:{
        width:"100%",
        height:"90%"
    }
})
export default ScannerScreen;
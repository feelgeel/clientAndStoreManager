import React from 'react';
import { StyleSheet, View,Modal,Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import C_Button from './C_Button';
function ScanQrCode({setscanQrModal,scanQrModal,handleBarCodeScanned,setScanned,
        scanned}) {
return (
<View style={styles.container}>
<Modal
        animationType="slide"
        // transparent={true}
        visible={scanQrModal}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setscanQrModal(false);
        }}
      >
        <C_Button
        title="done"
        // color={buttonColor}
        onPress={()=>setscanQrModal(false)} />
         <C_Button
        title="get client obj"
        // color={buttonColor}
        onPress={()=>handleBarCodeScanned()} />

         {/* <View
        //   style={{flex:1,paddingTop:"50%",justifyContent:"center",alignItems:"center"}}
          >
          <BarCodeScanner
         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
         barCodeTypes={[BarCodeScanner.Constants.Type.qr]}
       
         style={styles.bar}
          />
        {scanned && <Button title={'Tap to Scan'} onPress={() => setScanned(false)} />} 
  
      </View> */}

</Modal>

</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ScanQrCode;
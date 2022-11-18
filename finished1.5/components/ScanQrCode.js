import React from 'react';
import { StyleSheet, View,Modal,Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
function ScanQrCode({setscanQrModal,scanQrModal,handleBarCodeScanned
  ,setScanned,scanned}) {
          let data={familyMemberId:"625afc18923af92368524f40",
    listId:"625bfddd187540187c66b6e8"}
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
        <Button
        title="done"
        // color={buttonColor}
        onPress={()=>setscanQrModal(false)} />
         <Button
        title="scan Qr code"
        // color={buttonColor}
        onPress={()=>{handleBarCodeScanned(data);
          setscanQrModal(false);
                      }} />

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
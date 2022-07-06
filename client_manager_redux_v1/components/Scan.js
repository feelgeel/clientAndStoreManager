import React from 'react';
import { StyleSheet, View,Modal,Button,Text,TextInput } from 'react-native';
import C_Button from './C_Button';
import C_TextInput from './C_TextInput';

function Scan({scanModal,setscanModal,setscannedGting,onScan,buttonColor}) {
return (
<View style={styles.container}>
<Modal
        animationType="slide"
        // transparent={true}
        visible={scanModal}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setscanModal(false);
        }}
      >
        <C_Button
        title="done"
        // color={buttonColor}
        onPress={()=>setscanModal(false)} />
        <C_TextInput
         keyboardType="number-pad" 
        placeholder="gting"
        onChangeText={(text)=>{
          setscannedGting(text)
          // console.log(tex)
        }
          } />
        <C_Button
      //  color={buttonColor}
        title="checked"
        onPress={()=>{
          onScan()
          // setResultmodal(true);
         }} />
        {/* <View style={{flex:1,paddingTop:"50%",justifyContent:"center",alignItems:"center"}}>
          <BarCodeScanner
         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
         // barCodeTypes={[BarCodeScanner.Constants.Type.qr,BarCodeScanner.Constants.Type.ena13]}
       
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
export default Scan;
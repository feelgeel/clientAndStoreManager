import React from 'react';
import { StyleSheet, View } from 'react-native';
import Screen from './Screen';
import SvgQRCode from 'react-native-qrcode-svg';

function GeneratedQrCode({data}) {
return (
<View style={styles.container}>
<Screen>
 <View style={{paddingTop:"50%",justifyContent:"center",alignItems:"center"}}>
 <SvgQRCode style={{paddingLeft:50}} size={300} logoSize={20} value={data} />
 </View>
  </Screen>
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default GeneratedQrCode;
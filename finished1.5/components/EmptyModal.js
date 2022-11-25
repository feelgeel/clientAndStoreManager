import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

function EmptyModal({
  tempmodal,
  settempmodal
}) {
return (
<View style={styles.container}>
<Modal
        animationType="slide"
        visible={tempmodal}
        onRequestClose={() => {
          settempmodal(false);
        }}
      >
     
      </Modal>
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default EmptyModal;
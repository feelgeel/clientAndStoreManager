import React from 'react';
import { StyleSheet, View,FlatList,Button,Modal } from 'react-native';
import Screen from '../../components/Screen';
import C_Card from '../../components/C_Card';

function ConfirmTranProd({confirmModal,setconfirmModal,transProd,onClick,onConfirm}) {
return (
<Screen style={styles.container}>
<Modal
        animationType="slide"
        visible={confirmModal}
        onRequestClose={() => {
            setconfirmModal(false);
        }}
      >
       <Button  title={"out"} 
                onPress={()=>setconfirmModal(false)}
                />
        <FlatList
    data={transProd}
    keyExtractor={(transProd) => transProd._id}
    
    renderItem={({ item }) => 
    {
        let totalprice=Number(item.price)*Number(item.stockQuantity)
        return (
          <C_Card
          image={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }}
          title={"brand: "+item.brands+"|| Stock : "+
          item.stockQuantity+"/"+
          item.quantity+"|| price:"+item.price+"X"+item.stockQuantity+"="+totalprice+"DA"}
          />
        )
    }
  }
  />
     <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                 <Button title='cancel'
                //  color={buttonColor}
                  onPress={()=>{
                    setconfirmModal(false)
                  }}
                 />
                 
                 <Button title='CONFIRM'
                //  color={buttonColor}
                  onPress={()=>{
                    onConfirm()
                    // setconfirmModal(false)
                    // Setquantity(1)
                  }}
                   />
         </View>
      </Modal>
</Screen>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ConfirmTranProd;
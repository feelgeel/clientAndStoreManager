import React from 'react';
import { StyleSheet,View,Text,Button,Modal } from 'react-native';
import {  Card, Title,List } from 'react-native-paper';
function AreUSure({areUSureModal,setareUSureModal,onOk,Message,theChosen,buttonColor,showPriceAreUSure,showBenefit}) {
  let thePrice=showPriceAreUSure?"||price:"+theChosen.price:"";
  let theBenefit=showBenefit?"||benefit:"+theChosen.benefit:"";
return (
  
<View style={styles.container}>
<Modal
        animationType="slide"
        visible={areUSureModal}
        onRequestClose={() => {
            setareUSureModal(false);
        }}
      >
        <Card 
        //   onPress={()=>onUnselected(item)}
          >
          {<Card.Cover source={{ uri: theChosen.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
          <Card.Content>
            <Title> {"Brand: "+theChosen.brands+"|| Gting : "+theChosen.Gting+
            "|| Quantity : "+theChosen.quantity+thePrice+theBenefit}</Title>
          </Card.Content>
          
        </Card>
      <Text style={{fontSize:30}}>{Message}</Text>
           <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
            <Button title='cancel'
            color={buttonColor}
             onPress={()=>{
                setareUSureModal(false)
             }}
            />
            
            <Button title='OK'
            color={buttonColor}
             onPress={()=>{
                 onOk()
             }}
              />
              </View>
      </Modal>
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default AreUSure;
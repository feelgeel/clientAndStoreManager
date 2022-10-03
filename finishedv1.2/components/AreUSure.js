import React from 'react';
import { StyleSheet,View,Text,Button,Modal } from 'react-native';
import C_Card from './C_Card';
import C_Button from './C_Button';
function AreUSure({
  areUSureModal,
  setareUSureModal,
  onOk,
  Message,
  titleButton="ok",
  theChosen,
  buttonColor,
  selfServing=false,
  sell,
}) {
  let byuPriceselfServing=selfServing?"||ByuPrice:"+theChosen.ByuPrice:"";
  let sellSellPrice=sell?" ||sellprice:"+theChosen.sellPrice:"";
  let sellTotalprice=sell?" ||totalPrice:"+Number(theChosen.sellPrice)*Number(theChosen.quantity):"";
  // let theBenefit=showBenefit?"||benefit:"+theChosen.benefit:"";
return (
  
<View style={styles.container}>
<Modal
        animationType="slide"
        visible={areUSureModal}
        onRequestClose={() => {
            setareUSureModal(false);
        }}
      >
        {theChosen.Gting&&
        <C_Card
        image={{ uri: theChosen.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }}
        title= {"Brand: "+theChosen.brands+"|| Gting : "+theChosen.Gting+
        "|| Quantity : "+theChosen.quantity+byuPriceselfServing+sellSellPrice+
        sellTotalprice}
        
        />
        // <Card 
        // //   onPress={()=>onUnselected(item)}
        //   >
        //   {<Card.Cover source={{ uri: theChosen.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
        //   <Card.Content>
        //     <Title> {"Brand: "+theChosen.brands+"|| Gting : "+theChosen.Gting+
        //     "|| Quantity : "+theChosen.quantity+byuPriceselfServing+sellSellPrice+
        //     sellTotalprice}</Title>
        //   </Card.Content>
          
        // </Card>
      }
      <Text style={{fontSize:30}}>{Message}</Text>
           <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
            <C_Button
             title='cancel'
            // color={buttonColor}
            width="20%"
             onPress={()=>{
                setareUSureModal(false)
             }}
            />
            
            <C_Button 
            title={titleButton}
            width="20%"

            // color={buttonColor}
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
paddingHorizontal:10
}
})
export default AreUSure;
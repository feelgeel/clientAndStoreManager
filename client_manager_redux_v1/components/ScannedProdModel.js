import React from 'react';
import { StyleSheet, View,Modal,Button,Text,TextInput,FlatList } from 'react-native';
import {  Card, Title,List } from 'react-native-paper';

function ScannedProdModel({scannedProd,scannedProdModel,setscannedProdModel,
  setquantity,setprice,theChosen,onAddScannedProd,buttonColor,setbenefit,showPriceScannedProd,showBenefit}) {
    let thePrice=showPriceScannedProd?"||price:"+theChosen.price:"";
    let theBenefit=showBenefit?"||benefit:"+theChosen.benefit:"";
return (
<View style={styles.container}>
<Modal
        animationType="slide"
        visible={scannedProdModel}
        onRequestClose={() => {
          setscannedProdModel(false);
        }}
      >
        <Button
        title="done"
        color={buttonColor}
        onPress={()=>setscannedProdModel(false)} />
        
        <View style={{flexDirection:"row",justifyContent:"center"}}>
             <Text style={{paddingRight:20,fontSize:30}}>quantity :</Text>
            <TextInput
            keyboardType="number-pad" 
              onChangeText={(t)=>setquantity(t)}
            placeholder="quantity" style={{fontSize:30}}/>
            </View>
       {showPriceScannedProd&& <View style={{flexDirection:"row",justifyContent:"center"}}>
             <Text style={{paddingRight:20,fontSize:30}}>price :</Text>
            <TextInput
            keyboardType="number-pad" 
              onChangeText={(t)=>setprice(t)}
            placeholder="price" style={{fontSize:30}}/>
            </View>}
       {showBenefit&& <View style={{flexDirection:"row",justifyContent:"center"}}>
             <Text style={{paddingRight:20,fontSize:30}}>benefit :</Text>
            <TextInput
            keyboardType="number-pad" 
              onChangeText={(t)=>setbenefit(t)}
            placeholder="benefit" style={{fontSize:30}}/>
            </View>}
            <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
            <Button title='cancel'
            color={buttonColor}
             onPress={()=>{
              setscannedProdModel(false)
             }}
            />
            
            <Button title='OK'
            color={buttonColor}
             onPress={()=>{
              onAddScannedProd()
              setscannedProdModel(false)
             }}
              />
              </View>

          <Card 
        //   onPress={()=>onUnselected(item)}
          >
          {<Card.Cover source={{ uri: scannedProd.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
          <Card.Content>
            <Title> {"Brand: "+scannedProd.brands+"|| Gting : "+scannedProd.Gting+
            "|| Quantity : "+scannedProd.quantity+thePrice+theBenefit}</Title>
          </Card.Content>
          
        </Card>
   
        <Text style={{fontSize:30}}>_______________________________________</Text>
        <Text style={{fontSize:30}}>
        {theChosen.Gting?"already exist":"scanned prod doesn't exist in our list yet"}</Text>
  {theChosen.Gting&&
  <View>

  
          <Card 
        //   onPress={()=>onUnselected(scannedProd)}
        >
          {<Card.Cover source={{ uri: theChosen.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
          <Card.Content>
            <Title> {"brand: "+theChosen.brands+"|| Gting : "+theChosen.Gting+
            "|| Quantity : "+theChosen.quantity+thePrice+theBenefit}</Title>
          </Card.Content>
          
        </Card>
  </View>
        }
        
  </Modal>
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ScannedProdModel;
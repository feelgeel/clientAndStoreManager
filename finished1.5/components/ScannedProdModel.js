import React from 'react';
import { StyleSheet, View,Modal,Button,Text,TextInput,FlatList,ScrollView } from 'react-native';
import {  Card, Title,List } from 'react-native-paper';
import { ListItem } from './lists';
import C_Card from './C_Card';
import C_Button from './C_Button';
import C_Form from './C_Form';
import C_FormField from './C_FormField';
import C_SubmitButton from './C_SubmitButton';
import * as Yup from "yup"
import C_DatePicker from './C_DatePicker';

const manualOrderValidSchema = Yup.object().shape({
  quantity: Yup.number().required().label("quantity"),
  ByuPrice: Yup.number().required().label("ByuPrice"),
  benefit: Yup.number().required().label("benefit"),
  perimationDate: Yup.string().required().label("perimationDate"),
  stockAlert: Yup.number().required().label("stockAlert"),
  perimationAlert: Yup.number().required().label("perimationAlert"),
})
const listOrderSchema = Yup.object().shape({
  quantity: Yup.number().required().label("quantity"),
})
function ScannedProdModel({
  scannedProd,
  scannedProdModel,
  setscannedProdModel,
  setquantity,
  setprice,
  theChosen,
  onAddScannedProd,
  buttonColor,
  setbenefit,
  setstockAlert,
  // showPriceScannedProd,
  // showBenefit,
  manualOrder=false,
  quantity,
  price,
  benefit,
  stockAlert,
  selfServing=false,
  clientList=false,
  sell=false,
  selectedStock,
  setselectedStock,
  scannedgtingResProd,
  scannedgtingResChosen,
  selectedProd,
  setselectedProd,
  listOrder,
}) {
    // let scannedProdSellPrice=Number(price)*(1+(Number(benefit)/100))
    // let thePrice=showPriceScannedProd?"||price:"+theChosen.price:"";
    // let theBenefit=showBenefit?"||benefit:"+benefit:"";

    let sellPrice=Number(theChosen.price)*(1+(Number(theChosen.benefit)/100))
    let SellPriceLocal=Number(price)*(1+(Number(benefit)/100))
    let selfServingByuPrice=selfServing?"||ByuPrice:"+price:"";
    let sellSellPrice=sell?" ||sellprice:"+theChosen.sellPrice:"";
    let sellTotalprice=sell?" ||totalPrice:"+Number(theChosen.sellPrice)*Number(quantity):"";
    let localByuPrice=manualOrder?"||ByuPrice:"+price:"";
    let localTheBenefit=manualOrder?"||benefit:"+benefit:"";
    let localSellPrice=manualOrder?"||sellPrice:"+SellPriceLocal:"";
    let manOrderByuPrice=manualOrder?"||ByuPrice:"+theChosen.ByuPrice:"";
    let manOrderTheBenefit=manualOrder?"||benefit:"+theChosen.benefit:"";
    let manOrderSellPrice=manualOrder?"||sellPrice:"+sellPrice:"";
    // console.log("scannedgtingResProd",scannedProd)
return (
<View >
<Modal
        animationType="slide"
        visible={scannedProdModel}
        onRequestClose={() => {
          setscannedProdModel(false);
        }}
      >
      <ScrollView style={styles.container}>

      
        <C_Button
        title="done"
        // color={buttonColor}
        onPress={()=>setscannedProdModel(false)} 
        />
      {(!theChosen.Gting&&selfServing)&&
        <View>
           <View style={{flexDirection:"row",justifyContent:"center"}}>
             <Text style={{paddingRight:20,fontSize:30}}>price :{price}</Text>
            <TextInput
            keyboardType="number-pad" 
              onChangeText={(t)=>setprice(t)}
            placeholder="price" style={{fontSize:30}}/>
              </View>
        </View>
        }   
        
        {listOrder&&
        <View>
          {selectedProd.Gting&&
          <View>
             <C_Card
            image={{ uri: selectedProd.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }}
            title= {"|| Gting : "+selectedProd.Gting+
            "|| Quantity : "+quantity}
            />
        
        </View>
      
      }
      {!scannedgtingResChosen._id&&<Text style={{fontSize:30}}>
      this prod doesn't exist in chosen</Text>}
      {scannedgtingResChosen._id&&<Text style={{fontSize:30}}>list of chosen with the same gting</Text>}
      
      <C_Form
         initialValues={{
           quantity:5,
        }}
         onSubmit={(values)=>{
          onAddScannedProd(values)
          setscannedProdModel(false)
          }}
         validationSchema={listOrderSchema}
         >
         <C_FormField
             name="quantity"
            //  icon="email"
             autoCapitalize="none"
             autoCorrect={false}
             keyboardType="number-pad"
             placeholder="qunatity"
             />
         <C_SubmitButton title='submit' />
         </C_Form>
     
       
        
        <FlatList
        data={scannedgtingResChosen}
        keyExtractor={(scannedgtingResChosen) => scannedgtingResChosen._id}
            
        renderItem={({ item }) => 
        {
          return (
            <ListItem
            title={"gting :"+item.Gting}
            onPress={()=>{
              setselectedProd(item)
            }}
            onLongPress={()=>{
              
            }}
            />
            )
          }
        }
/> 
        <FlatList
        data={scannedgtingResChosen}
        keyExtractor={(scannedgtingResChosen) => scannedgtingResChosen._id}
            
        renderItem={({ item }) => 
        {
          return (
            <ListItem
            title={"gting :"+item.Gting}
            onPress={()=>{
              setselectedProd(item)
            }}
            onLongPress={()=>{
              
            }}
            />
            )
          }
        }
/> 
        </View>
        }
        {clientList&&
        <View>
          {selectedProd.Gting&&
          <View>
             <C_Card
            image={{ uri: selectedProd.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }}
            title= {"|| Gting : "+selectedProd.Gting+
            "|| Quantity : "+quantity}
            />
        
        </View>
      
      }
      {!scannedgtingResChosen._id&&<Text style={{fontSize:30}}>
      this prod doesn't exist in chosen</Text>}
      {scannedgtingResChosen._id&&<Text style={{fontSize:30}}>list of chosen with the same gting</Text>}
      
      <C_Form
         initialValues={{
           quantity:5,
        }}
         onSubmit={(values)=>{
          onAddScannedProd(values)
          setscannedProdModel(false)
          }}
         validationSchema={listOrderSchema}
         >
         <C_FormField
             name="quantity"
            //  icon="email"
             autoCapitalize="none"
             autoCorrect={false}
             keyboardType="number-pad"
             placeholder="qunatity"
             />
         <C_SubmitButton title='submit' />
         </C_Form>
     
       
        
        <FlatList
        data={scannedgtingResChosen}
        keyExtractor={(scannedgtingResChosen) => scannedgtingResChosen._id}
            
        renderItem={({ item }) => 
        {
          return (
            <ListItem
            title={"gting :"+item.Gting}
            onPress={()=>{
              setselectedProd(item)
            }}
            onLongPress={()=>{
              
            }}
            />
            )
          }
        }
/> 
        <FlatList
        data={scannedgtingResChosen}
        keyExtractor={(scannedgtingResChosen) => scannedgtingResChosen._id}
            
        renderItem={({ item }) => 
        {
          return (
            <ListItem
            title={"gting :"+item.Gting}
            onPress={()=>{
              setselectedProd(item)
            }}
            onLongPress={()=>{
              
            }}
            />
            )
          }
        }
/> 
        </View>
        }
        {manualOrder&&
        <View>
          {selectedProd.Gting&&
          <View>
          <C_Card
            image={{ uri: selectedProd.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }}
            title= {"|| Gting : "+selectedProd.Gting+
            "|| Quantity : "+quantity+"||byuPrice :"+price+
            "||benefit :"+benefit+"||stockAlert :"+stockAlert}
            />
        </View>
      
      }
         {!scannedgtingResChosen._id&&<Text style={{fontSize:30}}>
         this prod doesn't exist in chosen</Text>}
         {scannedgtingResChosen._id&&<Text style={{fontSize:30}}>list of chosen with the same gting</Text>}
        <FlatList
        data={scannedgtingResChosen}
        keyExtractor={(scannedgtingResChosen) => scannedgtingResChosen._id}
            
        renderItem={({ item }) => 
        {
          return (
            <ListItem
            title={"gting :"+item.Gting+" ||quantity :"+item.quantity}
            onPress={()=>{
              setselectedProd(item)
            }}
            onLongPress={()=>{
              
            }}
            />
            )
          }
        }
/> 
      <C_Form
         initialValues={{
           quantity:5,
           ByuPrice:5,
         benefit:5,
         stockAlert:5,
          perimationDate:"22-10-2022",
         perimationAlert:5
        }}
         onSubmit={(values)=>{
          onAddScannedProd(values)
          setscannedProdModel(false)
          }}
        //  validationSchema={manualOrderValidSchema}
         >
         <C_FormField
             name="quantity"
            //  icon="email"
             autoCapitalize="none"
             autoCorrect={false}
             keyboardType="number-pad"
             placeholder="qunatity"
             />
         <C_FormField
             name="ByuPrice"
            //  icon="email"
             autoCapitalize="none"
             autoCorrect={false}
             keyboardType="number-pad"
             placeholder="ByuPrice"
             />
         <C_FormField
             name="benefit"
            //  icon="email"
             autoCapitalize="none"
             autoCorrect={false}
             keyboardType="number-pad"
             placeholder="benefit"
             />
         <C_FormField
             name="stockAlert"
            //  icon="email"
             autoCapitalize="none"
             autoCorrect={false}
             keyboardType="number-pad"
             placeholder="stockAlert"
             />
         <C_DatePicker
             name="perimationDate"
             />
         <C_FormField
             name="perimationAlert"
            //  icon="email"
             autoCapitalize="none"
             autoCorrect={false}
             keyboardType="number-pad"
             placeholder="perimationAlert"
             />
         <C_SubmitButton title='submit' />
         </C_Form>
     
       
        </View>}
     {sell&&
    <View>
       {selectedStock.Gting&&
         <View>
            <View style={{flexDirection:"row",justifyContent:"center"}}>
             <Text style={{paddingRight:20,fontSize:30}}>quantity :{quantity}</Text>
            <TextInput
            keyboardType="number-pad" 
            onChangeText={(t)=>setquantity(t)}
            placeholder="quantity" style={{fontSize:30}}/>
            </View>
        
        
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
            
        </View>
      }
      {selectedStock.Gting&&<Card 
        //   onPress={()=>onUnselected(scannedProd)}
        >
          {<Card.Cover source={{ uri: selectedStock.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
          <Card.Content>
            <Title> {"|| Gting : "+selectedStock.Gting+
            "|| Quantity : "+selectedStock.quantity+"||sellPrice :"+selectedStock.sellPrice}</Title>
          </Card.Content>
          
        </Card>}
        <Text style={{fontSize:30}}>
        {
  scannedgtingResProd.length==0?"no stock match with the scanned Gting ":
  "list of stock stock with the same gting"
  }</Text>

           {scannedgtingResProd.length!==0&&<FlatList
              data={scannedgtingResProd}
              keyExtractor={(scannedgtingResProd) => scannedgtingResProd._id}
                  
              renderItem={({ item }) => 
              {
              return (
                <ListItem
          title={"|| Gting : "+item.Gting+
          "|| Quantity : "+item.quantity+"||sellPrice :"+item.sellPrice}
          
            onPress={()=>{
              setselectedStock(item)
            }}
            onLongPress={()=>{
             
            }}
        />
                  )
              }
    }
    /> }
    <Text style={{fontSize:30}}>
        {
  scannedgtingResChosen.length==0?"no chosen match with the scanned Gting ":"list of chosen stock with the same gting"
  }</Text>
 {scannedgtingResChosen.length!==0&& <FlatList
              data={scannedgtingResChosen}
              keyExtractor={(scannedgtingResChosen) => scannedgtingResChosen._id}
                  
              renderItem={({ item }) => 
              {
              return (
                <ListItem
          title={"|| Gting : "+item.Gting+
          "|| Quantity : "+item.quantity+"||sellPrice :"+item.sellPrice}
          
            onPress={()=>{
              
            }}
            onLongPress={()=>{
             
            }}
        />
                  )
              }
    }
    />} 
    </View>
    }   
    </ScrollView>
  </Modal>
</View>
 );
}
const styles = StyleSheet.create({
container:{
flex:1,
height:"100%"
}
})
export default ScannedProdModel;
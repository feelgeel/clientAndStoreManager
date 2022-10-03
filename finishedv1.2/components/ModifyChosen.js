import React from 'react';
import { StyleSheet, View,Modal,Button,Text,TextInput } from 'react-native';
// import {  Card, Title,List } from 'rea0.ct-native-paper';
import C_Button from './C_Button';
import C_Form from './C_Form';
import C_FormField from './C_FormField';
import C_SubmitButton from './C_SubmitButton';
import * as Yup from "yup"
import C_DatePicker from './C_DatePicker';

import C_Card from './C_Card';

const listOrderValidSchema = Yup.object().shape({
  quantity: Yup.number().required().label("quantity"),
})
const manualOrderValidSchema = Yup.object().shape({
  quantity: Yup.number().required().label("quantity"),
  ByuPrice: Yup.number().required().label("ByuPrice"),
  benefit: Yup.number().required().label("benefit"),
  perimationDate: Yup.string().required().label("perimationDate"),
  stockAlert: Yup.number().required().label("stockAlert"),
  perimationAlert: Yup.number().required().label("perimationAlert"),
})
function ModifyChosen({
  modifyChosenModal,
  setmodifyChosenModal,
  Theproduct,
  setquantity,
    setprice,
    setbenefit,
    setstockAlert,
    onUpdateTheChosenQuant,
  //   setbenefit,
    onDelete,
    buttonColor,
  //   showStock=false,
  //   setstockAlert,
    //  modifyTransProd=false,
     quantity,
     price,
     benefit,
     stockAlert,
  selfServing=false,
  manualOrder=false,
  listOrder=false,
  sell,
  perimationDate,
  setperimationDate,
  perimationAlert,
  setperimationAlert,
}) {
        // let totalprice=Number(Theproduct.byuPrice)*Number(quantity)
        let sellPrice=Number(Theproduct.ByuPrice)*(1+(Number(Theproduct.benefit)/100))
        let selfServingByuPrice=selfServing?"||byuPrice:"+Theproduct.ByuPrice:"";
        let selfServingstockAlert=selfServing?"||stockAlert:"+Theproduct.stockAlert:"";
        let manOrderByuPrice=manualOrder?"||byuPrice:"+Theproduct.ByuPrice:"";
        let manOrderTheBenefit=manualOrder?"||benefit:"+Theproduct.benefit:"";
        let manOrderPerimationDate=manualOrder?"||perimationDate:"+Theproduct.perimationDate:"";
        let manOrderPerimationAlert=manualOrder?"||perimationAlert:"+Theproduct.perimationAlert:"";
        let manOrderSellPrice=manualOrder?"||sellPrice:"+sellPrice:"";
        let manOrderStockAlert=manualOrder?"||StockAlert:"+Theproduct.stockAlert:"";
        let sellSellPrice=sell?" ||sellprice:"+Theproduct.sellPrice:"";
        let sellTotalprice=sell?" ||totalPrice:"+Number(Theproduct.sellPrice)*Number(Theproduct.quantity):"";
return (
<View style={styles.container}>
<Modal
animationType="slide"
visible={modifyChosenModal}
onRequestClose={() => {
    setmodifyChosenModal(false);
}}>
    <C_Button title='exit'
     onPress={()=>{
      setmodifyChosenModal(false)
     }}
    />
    <C_Button title='delete product'
     onPress={()=>{
      onDelete()
     }}
    />
     <C_Card
            image={{ uri: Theproduct.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }}
            title= {"brand: "+Theproduct.brands+" quantity :"+Theproduct.quantity+
            selfServingByuPrice+selfServingstockAlert+manOrderByuPrice+manOrderTheBenefit+
            manOrderSellPrice+manOrderStockAlert+sellSellPrice
            +sellTotalprice+manOrderPerimationDate+manOrderPerimationAlert}
            onPress={()=>onSelected(Theproduct)}
            />
     {/* <Card 
        //   onPress={()=>onClick(Theproduct)}
          >
          {<Card.Cover source={{ uri: Theproduct.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
          <Card.Content>
            <Title> {"brand: "+Theproduct.brands+" quantity :"+Theproduct.quantity+
            selfServingByuPrice+selfServingstockAlert+manOrderByuPrice+manOrderTheBenefit+
            manOrderSellPrice+manOrderStockAlert+sellSellPrice+sellTotalprice}</Title>
          </Card.Content>
          
        </Card> */}
        {/* <View style={{flexDirection:"row",justifyContent:"center"}}>
              
              <Text style={{fontSize:30}}>
              old quantity  {quantity} :   </Text>   
                                <TextInput  onChangeText={(t)=>setquantity(t)} 
                                // value={Theproduct.stockQuantity}
                                keyboardType="number-pad"
                                placeholder="new QUANTITY" style={{fontSize:30}}/>
                      
     </View> */}
     {listOrder&&
      <C_Form
      initialValues={{quantity:""}}
      onSubmit={(values)=>{
        onUpdateTheChosenQuant(values)
        setmodifyChosenModal(false)
       }}
      validationSchema={listOrderValidSchema}
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
    }
    {manualOrder&&
    <C_Form
    initialValues={{
      quantity:"",
      ByuPrice:"",
    benefit:"",
    stockAlert:"",
     perimationDate:"",
    perimationAlert:""
   }}
    onSubmit={(values)=>{
     //  setquantity(values.quantity)
      onAddQuantity(values)
     //  console.log(values)
     }}
    validationSchema={manualOrderValidSchema}
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
    }
     {manualOrder&&<View>

{/*                                 byuPrice                       */}
<View style={{flexDirection:"row",justifyContent:"center"}}>
 <Text style={{paddingRight:20,fontSize:30}}>byuPrice :{price}</Text>
<TextInput
keyboardType="number-pad" 
onChangeText={(t)=>setprice(t)}
placeholder="price" style={{fontSize:30}}/>
</View>
{/*                                 benefit                       */}
<View style={{flexDirection:"row",justifyContent:"center"}}>
<Text style={{paddingRight:20,fontSize:30}}>benefit :{benefit}</Text>
<TextInput
keyboardType="number-pad" 
onChangeText={(t)=>setbenefit(t)}
placeholder="benefit" style={{fontSize:30}}/>
</View>
{/*                                 stock alert                       */}
<View style={{flexDirection:"row",justifyContent:"center"}}>
<Text style={{paddingRight:20,fontSize:30}}>stockAlert :{stockAlert}</Text>
<TextInput
keyboardType="number-pad" 
onChangeText={(t)=>setstockAlert(t)}
placeholder="stockAlert" style={{fontSize:30}}/>
</View>
 {/*                                 perimation date                       */}
          <View style={{flexDirection:"row",justifyContent:"center"}}>
            <Text style={{paddingRight:20,fontSize:30}}>perimationDate :{perimationDate}</Text>
           <TextInput
            keyboardType="number-pad" 
            onChangeText={(t)=>setperimationDate(t)}
            placeholder="perimationDate" style={{fontSize:30}}/>
            </View>
{/*                                 perimation date alert                       */}
            <View style={{flexDirection:"row",justifyContent:"center"}}>
            <Text style={{paddingRight:20,fontSize:30}}>primationAlert :{perimationAlert}</Text>
           <TextInput
            keyboardType="number-pad" 
            onChangeText={(t)=>setperimationAlert(t)}
            placeholder="primationAlert" style={{fontSize:30}}/>
            </View>
 <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
    
  </View>
</View>
}
        {selfServing&&
        <View>

    
<View style={{flexDirection:"row",justifyContent:"center"}}>
              
              <Text style={{fontSize:30}}>
              old price  {price} :   </Text>   
                                <TextInput  onChangeText={(t)=>setprice(t)} 
                                // value={Theproduct.stockprice}
                                keyboardType="number-pad"
                                  placeholder="new price" style={{fontSize:30}}/>
                      
     </View>
<View style={{flexDirection:"row",justifyContent:"center"}}>
              
              <Text style={{fontSize:30}}>
              stockAlert  {stockAlert} :   </Text>   
                                <TextInput  onChangeText={(t)=>setstockAlert(t)} 
                                // value={Theproduct.stockprice}
                                keyboardType="number-pad"
                                  placeholder="stockAlert" style={{fontSize:30}}/>
                      
     </View>
</View>
    }
{/* <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                 <Button title='cancel'
                 color={buttonColor}
                  onPress={()=>{
                    setmodifyChosenModal(false)
                  }}
                 />
                 
                 <Button title='OK'
                 color={buttonColor}
                  onPress={()=>{
                    onUpdateTheChosenQuant()
                    setmodifyChosenModal(false)
                    setquantity(1)
                  }}
                   />
         </View> */}
        
</Modal> 

</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ModifyChosen;
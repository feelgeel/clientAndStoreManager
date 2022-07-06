import React from 'react';
import { StyleSheet, View,Modal,TextInput,Button,Text,FlatList } from 'react-native';
import {  Card, Title,List } from 'react-native-paper';
import { ListItem } from './lists';
import C_Button from './C_Button';
import C_Form from './C_Form';
import C_FormField from './C_FormField';
import C_SubmitButton from './C_SubmitButton';
import * as Yup from "yup"
import C_DatePicker from './C_DatePicker';
import C_Card from './C_Card';
import colors from '../config/colors';

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
function AddQuantity({
    chosenmodal,
    setchosenmodal,
    onAddQuantity,
    setquantity,
    setprice,
    setbenefit,
    setstockAlert,
    sell=false,
    manualOrder=false,
    buttonColor,
    selectedStock,
    quantity,
    price,
    benefit,
    stockAlert,
    selfServing=false,
    clientStock,
    theChosen,
    duplication,
    setselectedStock,
    scannedgtingResProd,
    scannedgtingResChosen,
    listOrder=false,
    perimationDate,
    setperimationDate,
    perimationAlert,
    setperimationAlert,
}) {
  console.log("ma var ",selectedStock)
  // let minQuant=selectedStock.quantity?selectedStock.quantity:10000000
  const sellValidationSchema = Yup.object().shape({
    quantity: Yup.number().min(0).required().label("quantity"),
  })
return (
 
<View style={styles.container}>

<Modal
animationType="slide"
visible={chosenmodal}
onRequestClose={() => {
    setchosenmodal(false);
}}
>
<C_Button
title="exit"
onPress={()=>{
  setchosenmodal(false) 
}}
/>
     {!sell&& 
      <C_Card
      image={{ uri: theChosen.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }}
      title={"brand: "+theChosen.brands+" quantity :"+quantity+
      " gting :"+theChosen.Gting}
          onPress={()=>onUnselected(item)}
      />
    //  <Card 
    //     //   onPress={()=>onClick(Theproduct)}
    //       >
    //       {<Card.Cover source={{ uri: theChosen.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
    //       <Card.Content>
    //         <Title> {"brand: "+theChosen.brands+" quantity :"+quantity+
    //       " gting :"+theChosen.Gting}</Title>
    //       </Card.Content>
          
    //     </Card>
      }
            {listOrder&&
         <C_Form
         initialValues={{quantity:""}}
         onSubmit={(values)=>{
           setquantity(values.quantity)
           onAddQuantity(values)
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
            {sell&&
            //prevet from giving an old perimation date
        <View>
           <C_Card
      image={{ uri: selectedStock.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }}
      title={"brand: "+selectedStock.brands+" quantity :"+selectedStock.quantity+
      " gting :"+selectedStock.Gting+"||sellPrice :"+selectedStock.sellPrice}
          onPress={()=>onUnselected(item)}
      />
           <C_Form
         initialValues={{
           quantity:"",
        }}
         onSubmit={(values)=>{
          //  setquantity(values.quantity)
           onAddQuantity(values)
          //  console.log(values)
          }}
         validationSchema={sellValidationSchema}
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
        </View>
            }
            {selfServing&&
            <View>

              <View style={{flexDirection:"row",justifyContent:"center"}}>
                <Text style={{paddingRight:20,fontSize:30}}>byuPrice :{price}</Text>
                <TextInput
                keyboardType="number-pad" 
                onChangeText={(t)=>setprice(t)}
                placeholder="price" style={{fontSize:30}}/>
              </View>
              <View style={{flexDirection:"row",justifyContent:"center"}}>
                  <Text style={{paddingRight:20,fontSize:30}}>stockAlert :{stockAlert}</Text>
                  <TextInput
                    keyboardType="number-pad" 
                    onChangeText={(t)=>setstockAlert(t)}
                  placeholder="stockAlert" style={{fontSize:30}}/>
              </View>
            </View>
          }
            {manualOrder&&<View>
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
            </View>
          }
</Modal> 

</View>
 );
}
const styles = StyleSheet.create({
container:{
  // backgroundColor: colors.light,
}
})
export default AddQuantity;
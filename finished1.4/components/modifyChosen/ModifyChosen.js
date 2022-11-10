import React from 'react';
import { StyleSheet, View,Modal,Button,Text,TextInput } from 'react-native';
import {  Card, Title,List } from 'react-native-paper';
import C_Button from '../C_Button';
import C_Form from '../C_Form';
import C_FormField from './C_FormField';
import C_SubmitButton from '../C_SubmitButton';
import FormManOrder from './theForms/FormManOrder';
import * as Yup from "yup"
import C_DatePicker from '../C_DatePicker';

import C_Card from '../C_Card';
import ModChosenListOrder from './ModChosenListOrder';
import FormListOrder from '../theForms/FormListOrder';

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
   
     {listOrder&&
     <FormListOrder 
     setquantity={(values)=>setmodifyChosenModal(values)}
  onAddQuantity={(values)=>onUpdateTheChosenQuant(values)}/>
      // <C_Form
      // initialValues={{quantity:""}}
      // onSubmit={(values)=>{
      //   onUpdateTheChosenQuant(values)
      //   setmodifyChosenModal(false)
      //  }}
      // validationSchema={listOrderValidSchema}
      // >
      // <C_FormField
      //     name="quantity"
      //    //  icon="email"
      //     autoCapitalize="none"
      //     autoCorrect={false}
      //     keyboardType="number-pad"
      //     placeholder="qunatity"
      //     />
      // <C_SubmitButton title='submit' />
      // </C_Form>
    }
    {manualOrder&&
    <FormManOrder onAddQuantity={(values)=>onAddQuantity(values)}/>
  //   <C_Form
  //   initialValues={{
  //     quantity:"",
  //     ByuPrice:"",
  //   benefit:"",
  //   stockAlert:"",
  //    perimationDate:"",
  //   perimationAlert:""
  //  }}
  //   onSubmit={(values)=>{
  //    //  setquantity(values.quantity)
  //     onAddQuantity(values)
  //    //  console.log(values)
  //    }}
  //   validationSchema={manualOrderValidSchema}
  //   >
  //   <C_FormField
  //       name="quantity"
  //      //  icon="email"
  //       autoCapitalize="none"
  //       autoCorrect={false}
  //       keyboardType="number-pad"
  //       placeholder="qunatity"
  //       />
  //   <C_FormField
  //       name="ByuPrice"
  //      //  icon="email"
  //       autoCapitalize="none"
  //       autoCorrect={false}
  //       keyboardType="number-pad"
  //       placeholder="ByuPrice"
  //       />
  //   <C_FormField
  //       name="benefit"
  //      //  icon="email"
  //       autoCapitalize="none"
  //       autoCorrect={false}
  //       keyboardType="number-pad"
  //       placeholder="benefit"
  //       />
  //   <C_FormField
  //       name="stockAlert"
  //      //  icon="email"
  //       autoCapitalize="none"
  //       autoCorrect={false}
  //       keyboardType="number-pad"
  //       placeholder="stockAlert"
  //       />
  //   <C_DatePicker
  //       name="perimationDate"
  //       />
  //   <C_FormField
  //       name="perimationAlert"
  //      //  icon="email"
  //       autoCapitalize="none"
  //       autoCorrect={false}
  //       keyboardType="number-pad"
  //       placeholder="perimationAlert"
  //       />
  //   <C_SubmitButton title='submit' />
  //   </C_Form>
    }
     {manualOrder&&
   <FormManOrder price={price}   setprice={(t)=>setprice(t)} benefit={benefit}
   setbenefit={(t)=>setbenefit(t)} stockAlert={stockAlert} 
   setstockAlert={(t)=>setstockAlert(t)}
    perimationDate={perimationDate} setperimationDate={(t)=>setperimationDate(t)} 
    perimationAlert={perimationAlert}
   setperimationAlert={(t)=>setperimationAlert(t)}
   />
}
        {selfServing&&
        <ModChosenListOrder price={price} setprice={(t)=>setprice(t)} 
        stockAlert={stockAlert} setstockAlert={(t)=>setstockAlert(t)}
        />
    }

        
</Modal> 

</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ModifyChosen;
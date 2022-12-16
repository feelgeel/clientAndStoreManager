import React from 'react';
import { StyleSheet, View,Modal,TextInput,Button,Text,FlatList } from 'react-native';
import C_Button from './C_Button';
import * as Yup from "yup"
import C_Card from './C_Card';
import { useFormikContext } from 'formik';
import FormClient from './theForms/FormClient';
import FormListOrder from './theForms/FormListOrder';
import FormSell from './theForms/FormSell';
import FormSelfServe from './theForms/FormSelfServe';
import FormManOrder from './theForms/FormManOrder';

const listOrderValidSchema = Yup.object().shape({
  quantity: Yup.number().required().label("quantity"),
})
const selfServiceValidSchema = Yup.object().shape({
  quantity: Yup.number().required().label("quantity"),
  ByuPrice: Yup.number().required().label("ByuPrice"),
  perimationDate: Yup.string().required().label("perimationDate"),
  stockAlert: Yup.number().required().label("stockAlert"),
  perimationAlert: Yup.number().required().label("perimationAlert"),
})
function AddQuantity({
     quantityModal,
    setquantityModal,
    onAddQuantity,
    sell=false,
    manualOrder=false,
    selfServing=false,
    listOrder=false,
    clientList=false,
    setquantity,
    selectedStock,
    quantity,
    theChosen={},
}) {
  // const formRef = useRef();
  // const dt=useFormikContext()
  // console.log("addQuantity formik val",manualOrder)
  // let minQuant=selectedStock.quantity?selectedStock.quantity:10000000
  const sellValidationSchema = Yup.object().shape({
    quantity: Yup.number().min(0).required().label("quantity"),
  })
return (
 
<View style={styles.container}>

<Modal
animationType="slide"
visible={quantityModal}
onRequestClose={() => {
    setquantityModal(false);
}}
>
<C_Button
title="exit"
onPress={()=>{
  setquantityModal(false) 
}}
/>
     {!sell&&<C_Card
      image={{ uri: theChosen.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }}
      title={"brand: "+theChosen.brands+" quantity :"+quantity+
      " gting :"+theChosen.Gting}
          onPress={()=>onUnselected(item)} 
      />
      }
      {clientList&&<FormClient setquantity={(values)=>setquantity(values)}
    onAddQuantity={(values)=>onAddQuantity(values)} />
}
            {listOrder&&<FormListOrder 
            setquantity={(values)=>setquantity(values)}
         onAddQuantity={(values)=>onAddQuantity(values)}/>
            }
            {sell&&<FormSell onAddQuantity={(values)=>onAddQuantity(values)} 
      selectedStock={selectedStock} />
            }
            {selfServing&& <FormSelfServe setquantity={(values)=>setquantity(values)}
           onAddQuantity={(values)=>onAddQuantity(values)}/>
          }
            {manualOrder&&<FormManOrder onAddQuantity={(values)=>onAddQuantity(values)}/>
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
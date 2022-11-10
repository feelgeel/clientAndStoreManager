import React, { useState } from 'react';
import { StyleSheet, View,Button,FlatList,Text } from 'react-native';
import AddListGlobal from '../../components/add list global/AddListGlobal';
import Screen from '../../components/Screen';
import { handleAddproducts, handleUnselected,
     handleAddToChosen, 
     handleChosenClicked,
     handleUpdateTheChosenQuant,
     handleDeleteProduct,
     handleAddScannedProd,
     handleScannedGting,
     handleSaveSelfServing,
     handleCallClientList,
     handleAddToSelfServing,
     handleSetClientList,handleRefresh} from '../selfServing/sonselfServingFunc';
import { useSelector, useDispatch } from "react-redux";
import { ListItem } from '../../components/lists';
import AddProductModal from '../../components/AddProductModal';
import AddQuantity from '../../components/addQuantity/AddQuantity';
import C_Button from '../../components/C_Button';

function SonSelfServingScreen({children,style}) {
    const dispatch=useDispatch();
    const user=useSelector(state=>state.entities.users.list)
  const family=useSelector(state=>state.entities.family.familyDt)

    const stockRedux=useSelector(state=>state.entities.clientStock.list)
const[selfServingModal,setselfServingModal]=useState(false)
const[quantityModal,setquantityModal]=useState(false)
const[modifyChosenModal,setmodifyChosenModal]=useState(false)
const[areUSureModal,setareUSureModal]=useState(false)
const[scanModal,setscanModal]=useState(false)
const[scannedGting,setscannedGting]=useState("6130760003769")
const[scannedProdModel,setscannedProdModel]=useState(false)
const[selfServModal,setselfServModal]=useState(false)
const[areUSeureMessage,setareUSeureMessage]=useState("")
const[product,setproduct]=useState([])
const[clientList,setclientList]=useState([])
const[chosen,setchosen]=useState([])
const[quantity,setquantity]=useState(1)
const[stockAlert,setstockAlert]=useState(0)
const[price,setprice]=useState(1)
const[selfServingList,setselfServingList]=useState([])
const[selfServingProd,setselfServingProd]=useState([])
const[clientProd,setclientProd]=useState([])
const[selectedProd,setselectedProd]=useState({})
const[selectedListName,setselectedListName]=useState({})
const[theChosen,settheChosen]=useState({})
const[scannedProd,setscannedProd]=useState({})
// console.log("clientProd",clientProd)
return (
<Screen style={styles.container}>
<Text>sonSelfServing</Text>
{/* <C_Button
title="Add A list"
onPress={()=>setselfServingModal(true)}
/> */}
<C_Button
title="refresh list"
onPress={()=>handleCallClientList(setclientList,family)}
/>

         <FlatList
              data={clientList}
              keyExtractor={(clientList) => clientList._id}
                  
              renderItem={({ item }) => 
              {
              return (
                <ListItem
          title={item.listName}
          
            onPress={()=>{
                setselfServModal(true)
                handleSetClientList(user,item,setselectedListName,
                    setselfServingModal,setselfServingProd,setchosen,
                    setclientProd)
               
                // console.log(item)
            }}
            onLongPress={()=>{
             
            }}
        />
                  )
              }
    }
    /> 

<AddProductModal
 chosen={chosen}
 product={selfServingProd}
 prodModal={selfServModal}
 onSetProdModal={(dt)=>setselfServModal(dt)}
 onAddProduct
 onUnselected={(dt)=>handleUnselected(dt,setquantityModal,
    settheChosen,setclientProd)}
 onSaveChosen={()=>handleAddToSelfServing(chosen,selfServingProd,user,
    selectedListName,setselfServModal)}
 onSelected
 onScan
 showDelete={false}
 manualOrder={false}
 onDelete
 buttonColor
 selfServing={false}
 clientStock={false}
 verification={true}
 onAddStockAlert
 sell={false}
 buttonColor
onRefresh={()=>handleRefresh(user,selectedListName)}
 refresh={false}
/>
<AddQuantity
chosenmodal={quantityModal}
setchosenmodal={(dt)=>setquantityModal(dt)}
onAddQuantity={(dt)=>handleAddToChosen(dt,theChosen,setchosen,setquantityModal,
    selfServingProd,setselfServingProd)}
    setquantity={(dt)=>setquantity(dt)}
    setprice
    setbenefit
    setstockAlert={(dt)=>setstockAlert(dt)}
    sell={false}
    manualOrderAddQuant={false}
    quantity={quantity}
    price
    benefit
    theChosen={theChosen}
    stockAlert={stockAlert}
    selfServing={true}
    clientList={false}
    selectedStock
    duplication
    setselectedStock
    listOrder={false}
/>
</Screen>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default SonSelfServingScreen;
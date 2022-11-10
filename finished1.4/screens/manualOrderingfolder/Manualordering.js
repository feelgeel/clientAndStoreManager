import React, { useState } from 'react';
import { StyleSheet, View,Modal,Button,Text,FlatList } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import *as listNamesAction from '../../redux/listNames';
import Screen from '../../components/Screen';
import { handleAddproducts, handleUnselected,handleAddToChosen,
     handleSaveManualListAndProd, handleChosenClicked,
     handleUpdateTheChosenQuant, 
     handleScannedGting,
     handleAddScannedProd,
     handleDeleteProduct,
     handleSetListProducts,
     handleUpdateManualListAndProd,handleGetStock} from './manualOrderingFunc';
import { ListItem } from '../../components/lists';
import AddListManualOrder from '../../components/add list global/AddListGlobal';
import ModifyListManualOrder from '../../components/add list global/AddListGlobal';
import C_Button from '../../components/C_Button';
function Manualordering({navigation}) {
    const dispatch=useDispatch();
    const user=useSelector(state=>state.entities.users.list)
    const listproducts=useSelector(state=>state.entities.storeMaualorderList.listproducts)
    const theChosenRedux=useSelector(state=>state.entities.storeMaualorderList.theChosen)
    const[scanModal,setscanModal]=useState(false)
    const[chosenModal,setchosenModal]=useState(false)
    const[quantityModal,setquantityModal]=useState(false)
    const[modifyChosenModal,setmodifyChosenModal]=useState(false) 
    const[modifyproductModal,setmodifyproductModal]=useState(false) 
    const[scannedProdModel,setscannedProdModel]=useState(false) 
    const[areUSureModal,setareUSureModal]=useState(false) 
    const[quantity,setquantity]=useState(1)
    const[price,setprice]=useState(1)
    const[benefit,setbenefit]=useState(30)
    const[perimationDate,setperimationDate]=useState("")
    const[perimationAlert,setperimationAlert]=useState(5)
    const[stockAlert,setstockAlert]=useState(0)
    const[chosen,setchosen]=useState([])
    const[product,setproduct]=useState([])
    const[duplication,setduplication]=useState([])
    const[manualOrderLists,setmanualOrderLists]=useState([])
    const[selectedStock,setselectedStock]=useState([]) 
    const[scannedgtingResChosen,setscannedgtingResChosen]=useState([]) 
    const[scannedgtingResProd,setscannedgtingResProd]=useState([]) 
    const[scannedProd,setscannedProd]=useState({})
    const[selectedProd,setselectedProd]=useState({})
    const[theChosen,settheChosen]=useState({})
    const[selectedListName,setselectedListName]=useState({})
    const [scannedGting, setscannedGting] = useState("6130760003769");
    const [areUSeureMessage, setareUSeureMessage] = useState("");
    //modify manual List
    const[scanModal1,setscanModal1]=useState(false)
    const[modifyProductslistModal,setmodifyProductslistModal]=useState(false)
    const[quantityModal1,setquantityModal1]=useState(false)
    const[modifyChosenModal1,setModifyChosenModal1]=useState(false) 
    const[scannedProdModel1,setscannedProdModel1]=useState(false) 
    const[areUSureModal1,setareUSureModal1]=useState(false) 

return (
<Screen style={styles.container}>
<Text>manual ordering</Text>
{/* <Button
title="scan"
onPress={()=>setscanModal(true)} /> */}
<C_Button
title="choose"
onPress={()=>{setchosenModal(true);setchosen([]);setproduct([])}} />
<C_Button
title="exit manualOrdering mode"
onPress={()=>{
    // context.setModes("")
    dispatch(listNamesAction.setTransMode("modeScreen"));
navigation.navigate("modeScreen")
}
} />
         <FlatList
              data={manualOrderLists}
              keyExtractor={(manualOrderLists) => manualOrderLists._id}
                  
              renderItem={({ item }) => 
              {
              return (
                <ListItem
          title={item.listName}
          
            onPress={()=>{
                setselectedListName(item)
                handleSetListProducts(item,setchosen,listproducts,setproduct,dispatch)
                setmodifyProductslistModal(true)
            }}
            onLongPress={()=>{
             
            }}
        />
                  )
              }
    }
    />  
    {/*
        /////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////
        /////////////////         ADD PRODUCT        ///////////
        ////////////////////////////////////////////////////////    
        ////////////////////////////////////////////////////////    
*/}
  
  <AddListManualOrder
 //add product
//  chosen,product,chosenModal,setchosenModal,
//  setscanModal,onSaveChosen,onSelected,onAddProduct,
//  showDelete,onDelete,onUnselected,buttonColor,
//  selfServing,clientStock,verification,onAddStockAlert,manualOrder
chosen={chosen}
product={product}
chosenModal={chosenModal}
setchosenModal={(dt)=>setchosenModal(dt)}
setproduct={(dt)=>setproduct(dt)}
setscanModal={(dt)=>setscanModal(dt)}
onSaveChosen={()=>handleSaveManualListAndProd(chosen,user,setmanualOrderLists,
manualOrderLists,dispatch,setchosenModal,setchosen,setselectedListName,selectedListName,benefit)}
onSelected={(dt)=>handleChosenClicked(dt,settheChosen,setmodifyChosenModal,
        dispatch,setprice,setquantity,setbenefit,chosen)}
 onAddProduct={(store,categ)=>handleAddproducts(store,categ,setproduct,chosen)}
 showDelete={false}
 manualOrderLists={manualOrderLists}
 onUnselected={(dt)=>handleUnselected(dt,setquantityModal,settheChosen,user,
     setselectedStock)}
buttonColor="#dc3545"
manualOrder={true}
onAddStockAlert={()=>handleGetStock(user,setproduct)}



 //Add quantity
//  quantityModal,onAddQuantity,setbenefit,selectedStock,quantity,
//  stockAlert,setquantityModal,sell,
// setquantity,setprice,price,benefit,duplication,setselectedStock,listOrder,
// perimationDate,setperimationDate,perimationAlert,setperimationAlert,
quantityModal={quantityModal}
setquantityModal={(dt)=>setquantityModal(dt)}
onAddQuantity={(values)=>handleAddToChosen(
    theChosen,selectedListName,
    quantity,setquantityModal,
    product,setproduct,chosen,setchosen,
    user,price,benefit,stockAlert,perimationDate,perimationAlert,values)}
    setquantity={(dt)=>setquantity(dt)}
    setprice={(dt)=>setprice(dt)}
    setbenefit={(dt)=>setbenefit(dt)}
    setstockAlert={(dt)=>setstockAlert(dt)}
    sell={false}
    manualOrderAddQuant={false}
    quantity={quantity}
    price={price}
    benefit={benefit}
    theChosen={theChosen}
    stockAlert={stockAlert}
    selfServing={false}
    selectedStock={selectedStock}
    duplication={duplication}
    setselectedStock={(dt)=>setselectedStock(dt)}
    listOrder={false}
    perimationDate={perimationDate}
    setperimationDate={(dt)=>setperimationDate(dt)}
    perimationAlert={perimationAlert}
    setperimationAlert={(dt)=>setperimationAlert(dt)}
//modify chosen
//modifyChosenModal,setareUSureModal,
// setareUSeureMessage,
//onUpdateTheChosenQuant,modifyTransProd,
// modifyManOrderProd,
//setmodifyChosenModal,
modifyChosenModal={modifyChosenModal}
setareUSureModal={(dt)=>setareUSureModal(dt)}
theChosen={theChosen}
setareUSeureMessage={(dt)=>setareUSeureMessage(dt)}
onUpdateTheChosenQuant={()=>handleUpdateTheChosenQuant(quantity,price,
    settheChosen,chosen,setchosen,theChosen,benefit,stockAlert)}
    modifyManOrderProd={true}
    setmodifyChosenModal={(dt)=>setmodifyChosenModal(dt)}
//scan
// scanModal,setscannedGting,onScan,
scanModal={scanModal}
setscannedGting={(dt)=>setscannedGting(dt)}
onScan={()=>handleScannedGting(scannedGting,setscannedProd,
    setscannedProdModel,user,settheChosen,theChosen,chosen,dispatch,
    setscannedgtingResChosen,setscannedgtingResProd,setselectedProd)}
//scanned prod
// scannedProd,scannedProdModel,onAddScannedProd,
// manOrderScanProd,setscannedProdModel,
// scannedgtingResProd,scannedgtingResChosen,
scannedProd={scannedProd}
scannedProdModel={scannedProdModel}
setscannedProdModel={(dt)=>setscannedProdModel(dt)}
onAddScannedProd={(values)=>handleAddScannedProd(theChosen,scannedProd,quantity,price,
    setchosen,user,chosen,setproduct,benefit,stockAlert,values,scannedgtingResProd)}
    setbenefit={(dt)=>setbenefit(dt)}
    scannedgtingResProd={scannedgtingResProd}
scannedgtingResChosen={scannedgtingResChosen} 
selectedProd={selectedProd}
setselectedProd={(dt)=>selectedProd(dt)}
    //are u sure modal
// areUSureModal,onOk,areUSeureMessage
areUSureModal={areUSureModal}
onOk={()=>handleDeleteProduct(chosen,theChosen,setchosen,setareUSureModal,
    setmodifyChosenModal,setproduct)}
    areUSeureMessage={areUSeureMessage}
/>


    {/*
        ////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////
        ////////         ADD and modify PRODUCT        /////////
        ////////////////////////////////////////////////////////    
        ////////////////////////////////////////////////////////    
*/}
 <ModifyListManualOrder
 //add product
chosen={chosen}
product={product}
chosenModal={modifyProductslistModal}
// user={user}
// dispatch={dispatch}
manualOrderLists={manualOrderLists}
setmanualOrderLists={(dt)=>setmanualOrderLists(dt)}
setchosen={(dt)=>setchosen(dt)}
setchosenModal={(dt)=>setmodifyProductslistModal(dt)}
setproduct={(dt)=>setproduct(dt)}
settheChosen={(dt)=>settheChosen(dt)}
setModifyChosenModal={(dt)=>setModifyChosenModal1(dt)}
setscanModal={(dt)=>setscanModal1(dt)}
setquantityModal={(dt)=>setquantityModal1(dt)}
setselectedListName={(dt)=>setselectedListName(dt)}
selectedListName={selectedListName}
onSaveChosen={()=>handleUpdateManualListAndProd(chosen,user,setmanualOrderLists,
    manualOrderLists,dispatch,setchosenModal,setchosen,setselectedListName,
    selectedListName,theChosenRedux,benefit)}
onSelected={(dt)=>handleChosenClicked(dt,settheChosen,setModifyChosenModal1,
        dispatch,setprice,setquantity,setbenefit)}
onAddProduct={(store,categ)=>handleAddproducts(store,categ,setproduct,chosen)}
onUnselected={(dt)=>handleUnselected(dt,setquantityModal,settheChosen,user,
    setselectedStock)}
// showPrice={true}
// showDelete={false}
// showBenefit={true}
manOrderScanProd={true}
// buttonColor="#dc3545"
//scan
scanModal={scanModal1}
scannedGting={scannedGting}
theChosen={theChosen}
setscannedGting={(dt)=>setscannedGting(dt)}
setscannedProd={(dt)=>setscannedProd(dt)}
setscannedProdModel={(dt)=>setscannedProdModel1(dt)}
onScan={()=>handleScannedGting(scannedGting,setscannedProd,
    setscannedProdModel,user,settheChosen,theChosen,chosen,dispatch)}
//scanned prod
scannedProd={scannedProd}
scannedProdModel={scannedProdModel1}
quantity={quantity}
price={price}
setquantity={(dt)=>setquantity(dt)}
setprice={(dt)=>setprice(dt)}
onAddScannedProd={()=>handleAddScannedProd(theChosen,scannedProd,quantity,price,
    setchosen,user,chosen,setproduct,benefit,stockAlert)}
//add quantity
quantityModal={quantityModal1}
selectedListName={selectedListName}
setstockAlert={(dt)=>setstockAlert(dt)}
onAddQuantity={()=>handleAddToChosen(
    theChosen,selectedListName,
    quantity,setquantityModal1,
    product,setproduct,
    chosen,setchosen,user,price,benefit,stockAlert)}
    selectedStock={selectedStock}
    manualOrderAddQuant={true}
    stockAlert={stockAlert}
//modify chosen
modifyChosenModal={modifyChosenModal1}
setareUSureModal={(dt)=>setareUSureModal1(dt)}
onUpdateTheChosenQuant={()=>handleUpdateTheChosenQuant(quantity,price,
    settheChosen,chosen,setchosen,theChosen,benefit,stockAlert)}
    setareUSeureMessage={(dt)=>setareUSeureMessage(dt)}
    modifyManOrderProd={true}
//are u sure modal
areUSureModal={areUSureModal1}
onOk={()=>handleDeleteProduct(chosen,theChosen,setchosen,setareUSureModal,
    setmodifyChosenModal,setproduct)}
    areUSeureMessage={areUSeureMessage}
 />
</Screen>
 );
}
const styles = StyleSheet.create({
container:{
    backgroundColor: "#6f51ff",
}
})
export default Manualordering;
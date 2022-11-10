import React, { useState } from 'react';
import { StyleSheet, View,Modal,Button,Text,FlatList } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import *as listNamesAction from '../../redux/listNames';
import Screen from '../../components/Screen';
import AddOrderList from '../../components/add list global/AddListGlobal';
import ModifyOrderList from '../../components/add list global/AddListGlobal';
import { handleSaveOrderList, handleChosenClicked, 
    handleAddproducts, handleScannedGting,
     handleAddScannedProd, handleAddToChosen, handleUpdateTheChosenQuant, handleDeleteProduct,handleUnselected } from './ListOrderFunc';
import { ListItem } from '../../components/lists';
function ListOrderScreen({}) {
    const dispatch=useDispatch();
    const user=useSelector(state=>state.entities.users.list)
    const listproducts=useSelector(state=>state.entities.storeMaualorderList.listproducts)
    const theChosenRedux=useSelector(state=>state.entities.storeMaualorderList.theChosen)
    const[scanModal,setscanModal]=useState(false)
    const[chosenModal,setchosenModal]=useState(false)
    const[quantityModal,setquantityModal]=useState(false)
    const[modifyChosenModal,setModifyChosenModal]=useState(false) 
    const[modifyproductModal,setmodifyproductModal]=useState(false) 
    const[scannedProdModel,setscannedProdModel]=useState(false) 
    const[areUSureModal,setareUSureModal]=useState(false) 
    const[quantity,setquantity]=useState(1)
    const[price,setprice]=useState(1)
    const[benefit,setbenefit]=useState(30)
    const[chosen,setchosen]=useState([])
    const[product,setproduct]=useState([])
    const[orderList,setorderList]=useState([])
    const[scannedProd,setscannedProd]=useState({})
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
<Text>list Order Screen</Text>
{/* <Button
title="scan"
onPress={()=>setscanModal(true)} /> */}
<Button
title="choose"
onPress={()=>{setchosenModal(true);setchosen([]);setproduct([])}}
 />
<Button
title="exit ListOrder mode"
onPress={()=>{
    // context.setModes("")
    dispatch(listNamesAction.setTransMode("modeScreen"));
navigation.navigate("modeScreen")
}
} />
         <FlatList
              data={orderList}
              keyExtractor={(listOrder) => listOrder._id}
                  
              renderItem={({ item }) => 
              {
              return (
                <ListItem
          title={item.listName}
          
            onPress={()=>{
                // setselectedListName(item)
                // handleSetListProducts(item,setchosen,listproducts,setproduct,dispatch)
                // setmodifyProductslistModal(true)
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
        ////////////////////////////////////////////////////////    */}

  <AddOrderList
//add product
chosen={chosen}
product={product}
chosenModal={chosenModal}
user={user}
dispatch={dispatch}
listOrder={orderList}
setlistOrder={(dt)=>setorderList(dt)}
setchosen={(dt)=>setchosen(dt)}
setchosenModal={(dt)=>setchosenModal(dt)}
setproduct={(dt)=>setproduct(dt)}
settheChosen={(dt)=>settheChosen(dt)}
setModifyChosenModal={(dt)=>setModifyChosenModal(dt)}
setscanModal={(dt)=>setscanModal(dt)}
setquantityModal={(dt)=>setquantityModal(dt)}
setselectedListName={(dt)=>setselectedListName(dt)}
selectedListName={selectedListName}
onSaveChosen={()=>handleSaveOrderList(chosen,user,setorderList,
    orderList,dispatch,setchosenModal,setchosen,setselectedListName,selectedListName,benefit)}
onSelected={(dt)=>handleChosenClicked(dt,settheChosen,setModifyChosenModal,
        dispatch)}
onAddProduct={(store,categ)=>handleAddproducts(store,categ,setproduct,chosen)}
showPrice={false}
showDelete={false}
showBenefit={false}
buttonColor="#dc3545"
onUnselected={(dt)=>handleUnselected(dt,setquantityModal,settheChosen,user)}
//scan
scanModal={scanModal}
scannedGting={scannedGting}
theChosen={theChosen}

setscannedGting={(dt)=>setscannedGting(dt)}
setscannedProd={(dt)=>setscannedProd(dt)}
setscannedProdModel={(dt)=>setscannedProdModel(dt)}
onScan={()=>handleScannedGting(scannedGting,setscannedProd,
    setscannedProdModel,user,settheChosen,theChosen,chosen,dispatch,setquantity,quantity)}
//scanned prod
scannedProd={scannedProd}
scannedProdModel={scannedProdModel}
quantity={quantity}
price={price}
setquantity={(dt)=>setquantity(dt)}
setprice={(dt)=>setprice(dt)}
onAddScannedProd={()=>handleAddScannedProd(theChosen,scannedProd,quantity,price,
    setchosen,user,chosen,setproduct,benefit)}
    setbenefit={(dt)=>setbenefit(dt)}
    //add quantity
quantityModal={quantityModal}
selectedListName={selectedListName}
setBenefit={(dt)=>setBenefit(dt)}
onAddQuantity={()=>handleAddToChosen(
    theChosen,selectedListName,
    quantity,setquantityModal,
    product,setproduct,
    chosen,setchosen,user)}
showPrice={false}

    //modify chosen
modifyChosenModal={modifyChosenModal}
setareUSureModal={(dt)=>setareUSureModal(dt)}
onUpdateTheChosenQuant={()=>handleUpdateTheChosenQuant(quantity,price,
    settheChosen,chosen,setchosen,theChosen,benefit)}
    setareUSeureMessage={(dt)=>setareUSeureMessage(dt)}
//are u sure modal
areUSureModal={areUSureModal}
onOk={()=>handleDeleteProduct(chosen,theChosen,setchosen,setareUSureModal,
    setModifyChosenModal,setproduct)}
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
export default ListOrderScreen;
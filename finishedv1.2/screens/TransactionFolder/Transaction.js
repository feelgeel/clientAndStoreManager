import React, { useState } from 'react';
import { StyleSheet, View,Button,FlatList } from 'react-native';
import ScanQrCode from '../../components/ScanQrCode';
import Screen from '../../components/Screen';
import { handleBarCodeScanned, handleCallTransactions,
     handleVerificationList, handleunselected, handleVerified,
      handleSaveVerified
} from './TransactionFuncs';
import { useSelector, useDispatch } from "react-redux";
import { ListItem } from '../../components/lists';
import AddProductModal from '../../components/AddProductModal';
import AreUSure from '../../components/AreUSure';
import { getTransactionProd } from '../../api/transactionProdApi';
import C_Button from '../../components/C_Button';


function Transaction({children,style}) {
    const dispatch=useDispatch();
    const user=useSelector(state=>state.entities.users.list)
    const counter=useSelector(state=>state.entities.counter.count)
    const[scanQrModal,setscanQrModal]=useState(false) 
    const[verificationModal,setverificationModal]=useState(false) 
    const[scanned,setscanned]=useState(false)
    const[verifiedModal,setverifiedModal]=useState(false)
    const[listExistModal,setlistExistModal]=useState(false)
    const[scannedObj,setscannedObj]=useState({clientId:"625afc18923af92368524f40",
    listId:"625bfddd187540187c66b6e8"})
    const[transProd,settransProd]=useState([])
    const[verified,setverified]=useState([])
    const[Theproduct,setTheproduct]=useState({})
    const[selectedTransList,setselectedTransList]=useState({})
    const[theList,settheList]=useState({})
    const[transactionList,settransactionList]=useState([])
return (
<Screen style={styles.container}>
<C_Button
        title="scan QRCode"
        // color={buttonColor}
        onPress={()=>setscanQrModal(true)} />
<C_Button
        title="refresh transactionlist"
        // color={buttonColor}
        onPress={()=>handleCallTransactions(user,settransactionList)} />
         <FlatList
              data={transactionList}
              keyExtractor={(transactionList) => transactionList._id}
                  
              renderItem={({ item }) => 
              {
                let newitem={...item}
                if(item.status=="waiting for verification from the store"){
                    newitem.status="pls verify the client products"
                  }
                  else if(item.status=="waiting for client to get his product"){
                    newitem.status="pls give the products to the client"

                  }
                  else{
                      newitem.status=item.status
                  }
              return (
                <ListItem
          title={newitem.status+"||TICKET:"+newitem.ticket}
          
            onPress={async()=>{
                const {data:transProddb}=await getTransactionProd(item._id)
                setselectedTransList(item)
                settransProd(transProddb)
                if(item.status=="waiting for verification from the store"){
                    handleVerificationList(item,setverificationModal,
                        settransProd,setverified,verified,settheList)
                 }
               
            }}
            onLongPress={()=>{
             
            }}
        />
                  )
              }
    }
    /> 

<ScanQrCode
scanQrModal={scanQrModal}
setscanQrModal={(dt)=>setscanQrModal(dt)}
scanned={scanned}
setscanned={(dt)=>setscanned(dt)}
handleBarCodeScanned={()=>handleBarCodeScanned(user,scannedObj,setscanQrModal,dispatch,
    settransactionList,transactionList,counter,setlistExistModal)}
setscannedObj={(dt)=>setscannedObj(dt)}
/>
<AddProductModal
   chosen={verified}
   product={transProd}
   prodModal={verificationModal}
   onSetProdModal={(dt)=>{
       setverificationModal(dt)
       settransProd([])
       setverified([])
    }}
   onAddProduct
   onUnselected={(dt)=>handleunselected(dt,setTheproduct,setverifiedModal)}
   verification={true}
   onSaveChosen={()=>handleSaveVerified(theList,settheList,settransactionList,
    transactionList,setverificationModal)}
//    onSelected={(dt)=>}
//    showPriceAddprod={}
//    onScan={()=>}
//    showDelete={false}
//    showBenefit={false}
//    onDelete={(dt)=>onDelete(dt)}
//    buttonColor
/>
<AreUSure
areUSureModal={verifiedModal}
setareUSureModal={()=>setverifiedModal}
onOk={()=>handleVerified(Theproduct,setTheproduct,transProd,
    settransProd,setverifiedModal,setverified,verified)}
Message="did u verify this prod"
theChosen={Theproduct}
verification={true}
/>
<AreUSure
areUSureModal={listExistModal}
setareUSureModal={()=>setlistExistModal}
onOk={()=>setlistExistModal(false)}
Message="list already added"
theChosen={Theproduct}
verification={false}
/>
</Screen>
 );
}
const styles = StyleSheet.create({
container:{
    backgroundColor: "#6f51ff",
}
})
export default Transaction;
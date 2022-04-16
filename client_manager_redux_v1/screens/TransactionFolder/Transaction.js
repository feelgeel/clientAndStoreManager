import React, { useState } from 'react';
import { StyleSheet, View,Button,FlatList } from 'react-native';
import ScanQrCode from '../../components/ScanQrCode';
import Screen from '../../components/Screen';
import { handleBarCodeScanned, handleCallTransactions
} from './TransactionFuncs';
import { useSelector, useDispatch } from "react-redux";
import { ListItem } from '../../components/lists';

function Transaction({children,style}) {
    const dispatch=useDispatch();
    const user=useSelector(state=>state.entities.users.list)
    const[scanQrModal,setscanQrModal]=useState(false) 
    const[scanned,setscanned]=useState(false) 
    const[transactionList,settransactionList]=useState([]) 
return (
<Screen style={styles.container}>
<Button
        title="scan QRCode"
        // color={buttonColor}
        onPress={()=>setscanQrModal(true)} />
<Button
        title="refresh transactionlist"
        // color={buttonColor}
        onPress={()=>handleCallTransactions(user,settransactionList)} />
         <FlatList
              data={transactionList}
              keyExtractor={(transactionList) => transactionList._id}
                  
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

<ScanQrCode
scanQrModal={scanQrModal}
setscanQrModal={(dt)=>setscanQrModal(dt)}
scanned={scanned}
setscanned={(dt)=>setscanned(dt)}
handleBarCodeScanned={(dt)=>handleBarCodeScanned(dt)}
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
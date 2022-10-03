import React, { useState } from 'react';
import { StyleSheet, View,Button,FlatList } from 'react-native';
import Screen from '../../components/Screen';
import ScanQrCode from '../../components/ScanQrCode';
import { getAUser, updateUser } from '../../api/users';
import { addcashtransaction } from '../../api/cashTransactionApi';
import { useSelector, useDispatch } from "react-redux";
import { ListItem } from '../../components/lists';

function StoreCashScreen({children,style}) {
    const dispatch=useDispatch();
    const user=useSelector(state=>state.entities.users.list)
    const[scanQrModal,setscanQrModal]=useState(false)
    const[cashTrans,setcashTrans]=useState([])
    const[scannedObj,setscannedObj]=useState({
        type:"cash",
        clientId:"6181826ffcdba81964ffbab7",
        cashWanted:5000,})
        const handleCash=async(scannedObj)=>{
            let newCashTrans=[...cashTrans]
            const {data:dauser}=await getAUser(scannedObj.clientId)
            let cashTransObj={
                to:scannedObj.clientId,
                from:user.userId,
                timeStamp:Date.now(),
                status:false,
                cash:scannedObj.cashWanted
            }
            const {data:transaction}=await addcashtransaction(cashTransObj)
            newCashTrans.push(transaction)
            setcashTrans(newCashTrans)
            let newDaUser={...dauser[0]}
            newDaUser.cash=scannedObj.cashWanted
            const {data:updatedUser}=await updateUser(newDaUser._id,newDaUser)
            
        console.log("update user",updatedUser)
        setscanQrModal(false)
        }
return (
<Screen style={styles.container}>
<Button
        title="scan Cash Qr"
        // color={buttonColor}
        onPress={()=>setscanQrModal(true)} 
        />
            <FlatList
              data={cashTrans}
              keyExtractor={(cashTrans) => cashTrans._id}
                  
              renderItem={({ item }) => 
              {
                  console.log(item)
              return (
                <ListItem
          title={"from :"+item.from+"||cash :"+item.cash+"||To :"+item.to}
          
            onPress={()=>{}}
            onLongPress={()=>{}}
        />
                  )
              }
    }
    /> 
<ScanQrCode
setscanQrModal={(dt)=>setscanQrModal(dt)}
scanQrModal={scanQrModal}
handleBarCodeScanned={(dt)=>handleCash(scannedObj)}
/>
</Screen>
 );
}
const styles = StyleSheet.create({
container:{
    backgroundColor: "#6f51ff",
}
})
export default StoreCashScreen;
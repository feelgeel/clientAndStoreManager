import React, { useState } from 'react';
import { StyleSheet, View,Text,TextInput } from 'react-native';
import Screen from '../../components/Screen';
import { useSelector, useDispatch } from "react-redux";
import { ListItem } from '../../components/lists';
import GeneratedQrCode from '../../components/GeneratedQrCode';
import C_TextInput from '../../../finishedApp_v1.0/components/C_TextInput';
 
function ClientCashScreen({children,style}) {
    const dispatch=useDispatch();
    const user=useSelector(state=>state.entities.users.list)
    const[creditCash,setcreditCash]=useState(0)
    console.log(user)
    let newData= {
        type:"cash",
        clientId:user._id,
        cashWanted:creditCash,
    }
    newData=JSON.stringify(newData)
return (
<Screen style={styles.container}>
    <ListItem
            title={"userNAme : "+user.userName+" CASH :"+user.cash}
            
                onPress={()=>{
                }}
                onLongPress={()=>{
                
                }}
            />
     <C_TextInput  onChangeText={(t)=>setcreditCash(t)} 
     keyboardType="number-pad"
     placeholder="set ur credit"
     style={{fontSize:30}}/>
    <GeneratedQrCode
    data={newData}
    />
</Screen>
 );
}
const styles = StyleSheet.create({
container:{
    backgroundColor: "#6f51ff",
}
})
export default ClientCashScreen;
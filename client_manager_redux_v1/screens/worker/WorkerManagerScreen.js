import React, { useState } from 'react';
import { StyleSheet, View,Modal,Button,Text,FlatList } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import *as listNamesAction from '../../redux/listNames';
import Screen from '../../components/Screen';
import { ListItem } from '../../components/lists';
import { getownerByUserId, addOwner } from '../../api/ownerApi';
import ScanQrCode from '../../components/ScanQrCode';
import { addWorker, getWorkerByUserId, deleteWorker } from '../../api/workerApi';
import AreUSure from '../../components/AreUSure';
function WorkerManagerScreen({navigation}) {
    const dispatch=useDispatch();
    const user=useSelector(state=>state.entities.users.list)
    const listproducts=useSelector(state=>state.entities.storeMaualorderList.listproducts)
    const theChosenRedux=useSelector(state=>state.entities.storeMaualorderList.theChosen)
    const[scanModal,setscanModal]=useState(false)
    const[deleteModal,setdeleteModal]=useState(false)
    const[workers,setworkers]=useState([])
    const[theWorker,settheWorker]=useState({})
    const[scannedObj,setscannedObj]=useState({workerId:"6181826ffcdba81964ffbab7"})
    const[scanQrModal,setscanQrModal]=useState(false) 
    // const[scanned,setscanned]=useState(false)
 let handleBarCodeScanned=async(user)=>{
    const{data:workerDb}=await getWorkerByUserId(scannedObj.workerId)
    if(workerDb.length==0){
        let worker={
            storeId:"6297ef6b556bc3283815f467",
            userId:scannedObj.workerId,

        }
        const{data:addownerdb}=await addWorker(worker)
        
    }else{

          console.log("already exist")  
    }

        }
const handleDelete=async()=>{
    const {data:deleteWorkerdb}=await deleteWorker(theWorker._id)
    setdeleteModal(false)
    console.log(deleteWorkerdb)

}
return (
<Screen style={styles.container}>
<Text>worker Manager</Text>
<Button
title="add a worker"
onPress={()=>setscanQrModal(true)} 
/>
<Button
title="call for workers"
onPress={async()=>{
    const{data:owner}=await getWorkerByUserId(user.userId)
    setworkers(owner)

}} />
         <FlatList
              data={workers}
              keyExtractor={(workers) => workers._id}
                  
              renderItem={({ item }) => 
              {
              return (
                <ListItem
          title={item._id}
          
            onPress={()=>{
                settheWorker(item);
                setdeleteModal(true)
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
// scanned={scanned}
// setscanned={(dt)=>setscanned(dt)}
handleBarCodeScanned={()=>handleBarCodeScanned(user)}
setscannedObj={(dt)=>setscannedObj(dt)}
/>
<AreUSure
areUSureModal={deleteModal}
setareUSureModal={()=>setdeleteModal}
onOk={()=>handleDelete()}
Message="are u sure u want to delete this worker"
theChosen={theWorker}
verification={true}
/>
</Screen>
 );
}
const styles = StyleSheet.create({
container:{
    backgroundColor: "#6f51ff",
}
})
export default WorkerManagerScreen;
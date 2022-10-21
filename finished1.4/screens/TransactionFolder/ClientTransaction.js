import React, { useState } from 'react';
import { StyleSheet, View,Button,FlatList } from 'react-native';
import ScanQrCode from '../../components/ScanQrCode';
import Screen from '../../components/Screen';
import { handleBarCodeScanned, handleCallTransactions,handleConfirmList,
     handleChosenClicked, handleUpdateTransProd, HandleDeleteTransProd,
      handConfirmTransProd, handlePaymentMethod, handleButtonConfirmed, handleGetProduct
} from './ClientTransactionFuncs';
import { useSelector, useDispatch } from "react-redux";
import { ListItem } from '../../components/lists';
import ConfirmTranProd from './ConfirmTranProd';
import ModifyChosen from '../../components/modifyChosen/ModifyChosen';
import AreUSure from '../../components/AreUSure';
import { getTransactionProd } from '../../api/transactionProdApi';
import C_Button from '../../components/C_Button';

function ClientTransaction({navigation,route}) {
    const dispatch=useDispatch();
    const user=useSelector(state=>state.entities.users.list)
    const[scanQrModal,setscanQrModal]=useState(false) 
    const[scanned,setscanned]=useState(false)
    const[confirmModal,setconfirmModal]=useState(false)
    const[modifyChosenModal,setmodifyChosenModal]=useState(false)
    const[areUSureModal,setareUSureModal]=useState(false)
    const[noCreditModal,setnoCreditModal]=useState(false)
    const[paymentModal,setpaymentModal]=useState(false)
    const[getProdModal,setgetProdModal]=useState(false)
    const[quantity,setquantity]=useState(1)
    const[totalPrice,settotalPrice]=useState(0)
    const[transProd,settransProd]=useState([])
    const[Theproduct,setTheproduct]=useState({})
    const[selectedTransList,setselectedTransList]=useState({})
    const[theList,settheList]=useState({})
    const[scannedObj,setscannedObj]=useState({
        clientId:"625afc18923af92368524f40",
    listId:"625bfddd187540187c66b6e8"})

    const[transactionList,settransactionList]=useState([]) 
return (
<Screen style={styles.container}>
<C_Button
        title="client transaction"
        // color={buttonColor}
        // onPress={()=>setscanQrModal(true)} 
        />
<C_Button
        title="refresh transactionlist"
        // color={buttonColor}
        onPress={()=>handleCallTransactions(user,settransactionList,
        settransProd,transProd)} />
         <FlatList
              data={transactionList}
              keyExtractor={(transactionList) => transactionList._id}
                  
              renderItem={({ item }) => 
              {
                  let newitem={...item}
                  if(item.status=="waiting for confirmation from client"){
                      newitem.status="pls confirm ur list"
                    }
                    else if(item.status=="waiting for verification from the store"){
                        newitem.status="waiting for verification from the store"
                    }
                    else if(item.status=="waiting for payment from client"){
                        newitem.status="pls set ur payment"
                    }
                    else if(item.status=="waiting for client to get his product"){
                        newitem.status="pls get ur products from the store"
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
                // console.log(transProddb)

             if(item.status=="waiting for confirmation from client"){
                 
                handleConfirmList(item,settransProd,setconfirmModal,settheList,user)
             }
             else if(item.status=="waiting for payment from client"){
                const newTransProd=[...transProd]
                let totalPrice=0
                transProd.map(dt=>{
                      totalPrice=totalPrice+Number(dt.stockQuantity)*Number(dt.price)
                      
                  })
                  settotalPrice(totalPrice)
                //   console.log(transProd)
                setpaymentModal(true)
             }
             else if(item.status=="waiting for client to get his product"){
                setgetProdModal(true)
             }
            }}
            onLongPress={()=>{
             
            }}
        />
                  )
              }
    }
    /> 

<ConfirmTranProd
confirmModal={confirmModal}
setconfirmModal={(dt)=>setconfirmModal(dt)}
transProd={transProd}
onClick={(dt)=>handleChosenClicked(dt,setmodifyChosenModal,setTheproduct,
    setquantity)}
onConfirm={dt=>handleButtonConfirmed(setareUSureModal,transProd,user,
setnoCreditModal,theList,transactionList,settransactionList)}
/>
<ModifyChosen
modifyChosenModal={modifyChosenModal}
setModifyChosenModal={(dt)=>setmodifyChosenModal(dt,setmodifyChosenModal)}
Setquantity={(dt)=>setquantity(dt)}
Theproduct={Theproduct}
onUpdateTheChosenQuant={(dt)=>handleUpdateTransProd(Theproduct,quantity,setTheproduct,settransProd,transProd)}
showPrice={false}
setprice
onDelete={(dt)=>HandleDeleteTransProd(dt)}
buttonColor="red"
showStock={false}
modifyTransProd={true}
quantity={quantity}
/>
<AreUSure
areUSureModal={areUSureModal}
setareUSureModal={(dt)=>setareUSureModal(dt)}
onOk={(dt)=>handConfirmTransProd(theList,settransactionList,transactionList)}
Message="do you accept to byu from this store those products"

/>
<AreUSure
areUSureModal={noCreditModal}
setareUSureModal={(dt)=>setnoCreditModal(dt)}
onOk={(dt)=>{
    navigation.navigate("clientCash");
    setnoCreditModal(false)
    setconfirmModal(false)
}}
Message="u don't have enought credit pls charge ur account"

/>
<AreUSure
areUSureModal={paymentModal}
setareUSureModal={(dt)=>setpaymentModal(dt)}
onOk={(dt)=>{
    handlePaymentMethod(user,transProd,settransactionList,
        transactionList,setpaymentModal,settotalPrice)
}}
Message={"do u accept paying"+totalPrice}

/>
<AreUSure
areUSureModal={getProdModal}
setareUSureModal={(dt)=>setgetProdModal(dt)}
onOk={(dt)=>{
    handleGetProduct(transactionList,settransactionList,setgetProdModal)
}}
Message="did u get ur products"

/>
</Screen>
 );
}
const styles = StyleSheet.create({
container:{
    backgroundColor: "#6f51ff",
}
})
export default ClientTransaction;
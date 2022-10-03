import React from 'react';
import { StyleSheet, View,Modal,Button,TextInput,Text } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
function LongpressList({
    SetlistlongPressModal,listlongPressModal,
    SelectedlistName,
    SetlistName,
    theClientList,
    setDuplicationmodal,
    onUpdateListName}) {


        let newlistName={
            listId:SelectedlistName._id,
            userId:SelectedlistName.userId

        }
        // console.log(newlistName)
        newlistName=JSON.stringify(newlistName)
return (
<View style={styles.container}>
<Modal
animationType="slide"
visible={listlongPressModal}
onRequestClose={() => {
    SetlistlongPressModal(false);
}}>

<Button title='exit'

onPress={()=>{
    SetlistlongPressModal(false)
}}
/>
<Button title='duplicate'

onPress={()=>{
    setDuplicationmodal(true)
    SetlistName("")
}}
/>
<Text style={{fontSize:30}}> update</Text>
<View style={{flexDirection:"row",justifyContent:"center"}}>
              
<Text style={{fontSize:30}}>old Name   :{theClientList.listName}   </Text>   
            <TextInput  onChangeText={(t)=>SetlistName(t)} 
              placeholder="new Name" style={{fontSize:30}}/>
  
      </View>
       
      <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
              <Button title='cancel'
  
               onPress={()=>{
                SetlistName("")
               }}
              />
              
              <Button title='OK'
               onPress={()=>{onUpdateListName()}}
                />
      </View>
<View style={{paddingTop:"50%",justifyContent:"center",alignItems:"center"}}>
 <SvgQRCode style={{paddingLeft:50}} size={300} logoSize={20} value={newlistName} />
     
   
 </View>
</Modal> 

</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default LongpressList;
import React from 'react';
import { StyleSheet, View,Modal,TextInput,Button } from 'react-native';


function AddListName({
    listModal,
    SetlistModal,
    SetlistName,
    onSaveList
    }) {
return (
<View style={styles.container}>
<Modal
animationType="slide"
visible={listModal}
onRequestClose={() => {
    SetlistModal(false);
}}
> 

    <View style={{flexDirection:"row",justifyContent:"center"}}>
              
            <TextInput  onChangeText={(t)=>SetlistName(t)} 
            placeholder="listName" style={{fontSize:30}}/>

    </View>
     
    <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
            <Button title='cancel'

             onPress={()=>{
                SetlistModal(false)
             }}
            />
            
            <Button title='OK'
             onPress={async()=>{onSaveList( )}}
              />
    </View>
</Modal>     
 
</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default AddListName;
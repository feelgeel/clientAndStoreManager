import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AddProducts from '../components/AddProducts';
import Screen from '../components/Screen';

function ListOrderingScreen({children,style}) {
  const [product,setproduct]=useState([]);
  const [chosen,setchosen]=useState([]);
  const handleUnselected=(dt)=>{
    console.log(dt)
  
  }
return (
<Screen style={styles.container}>
<AddProducts onUnselected={(dt)=>handleUnselected(dt)} product={product} chosen={chosen}/>
</Screen>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ListOrderingScreen;
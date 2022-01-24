import React,{useState} from 'react';
import { StyleSheet, View,Text,FlatList,Button } from 'react-native';
import {  Card, Title, } from 'react-native-paper';
function AddProducts({children,style,product,chosen,onSelected,onUnselected}) {
    const [unselected,setUnselected]=useState(false);
    const [selected,setSelected]=useState(true);
   
    
return (
<View style={styles.container}>
< View style={{flexDirection:"row",
              justifyContent:"space-between"}}>
              <Button style={{flex:0.5}} 
              title={product.length+'unselected'} 
              onPress={()=>{setUnselected(true);setSelected(false)}}
              />
              <Button style={{flexDirection:"row"}} title={chosen.length+'selected'} 
              onPress={()=>{setUnselected(false);setSelected(true)}}
              />

</View>
{unselected&&<FlatList
    data={product}
    keyExtractor={(product) => product._id}
    
    renderItem={({ item }) => 
    {
        return (
          <Card 
          onPress={()=>onUnselected(item)}
          >
          {<Card.Cover source={{ uri: item.image_front_url||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
          <Card.Content>
            <Title>{item.brands}</Title>
          </Card.Content>
          
        </Card>
        )
    }
  }
  />
}
   {selected&&<FlatList
    data={chosen}
    keyExtractor={(chosen) => chosen.productId}
    
    renderItem={({ item }) => 
    {
        return (
          <Card 
        //   onPress={()=>handleSelected(item)}
          >
          {<Card.Cover source={{ uri: item.image||"https://unsplash.com/photos/JpTY4gUviJM" }} />}
          <Card.Content>
            <Title>{item.brands}</Title>
          </Card.Content>
          
        </Card>
        )
    }
  }
  />
  }
</View>
 );
}
const styles = StyleSheet.create({

})
export default AddProducts;
import React from 'react';
import { StyleSheet, View,FlatList } from 'react-native';
import Screen from "../components/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from '../components/Icon';
import colors from '../config/colors';
function ListTypeScreen({ navigation,route }) {
    let chosen=[
        {
            _id:"1",
            listType:"store"
        },
        {
            _id:"2",
            listType:"others",
        }
    ]
    const handleProducts=(item)=>{
       if(item.listType=="store"){
        navigation.navigate("addgtings")
       }
    
    }
return (
<Screen style={styles.container}>
<FlatList
          data={chosen}
          keyExtractor={(chosen) => chosen._id.toString()}
          renderItem={({ item }) => (
            <ListItem
            title={item.listType}
            checkbox={true}
            IconComponent={
                  <Icon
                  name={"menu"}
                    backgroundColor={colors.secondary}
                    />
                  }
                  onPress={()=>{
                    handleProducts(item)
                    
                  }}
                  />
                  )
                }
                />
</Screen>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ListTypeScreen;
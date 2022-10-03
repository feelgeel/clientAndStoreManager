import React,{useContext} from "react";
import { StyleSheet,FlatList } from "react-native";
import Screen from "../components/Screen";
import TextInput from "../components/TextInput";
import TodoListItem from '../components/lists/todoListitem';
import Icon from '../components/Icon';
import colors from "../config/colors";



function AddItemScreens1({route}) {
    const data=route.params.items;
    // console.log(route.params);
  return (
    <Screen style={styles.container}>
      <TextInput store={0} icon='search'/>
      <FlatList
       data={data}
       keyExtractor={(data) => data.id}
       renderItem={({ item }) => {
        return<TodoListItem
        icone="delete"
        checkbox={true}
        deleteOnPress={()=>console.log("delete")}
        editOnPress={()=>console.log("edit")}
          title={item.name}
          IconComponent={
            <Icon
              name={"menu"}
              backgroundColor={colors.secondary}
            />
          }
          onPress={()=>console.log("item")}
        
        />
       }
    }
      />

    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default AddItemScreens1;

import React, { useContext, useState } from "react";
import { StyleSheet, View, FlatList,Button,Modal } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
// import listContext from "../list_context/list-context";
import { useSelector, useDispatch } from "react-redux";
import *as userActions from "../redux/users";
import *as AccounttypeAction from "../redux/accountType";
import { getAUser } from "../api/users";
import { getownerByUserId, addOwner } from "../api/ownerApi";
import { addStores } from "../api/storeApi";
import { addWorker, getWorkerByUserId } from "../api/workerApi";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
  const [prodModal,setprodModal]=useState(false)
  const dispatch=useDispatch();
  const user=useSelector(state=>state.entities.users.list)
  const accountType=useSelector(state=>state.entities.accountType.account)
  
  // const context=useContext(listContext)
  const handlelogOut=async()=>{
  // await context.setUser(null)
  // await context.setToken(null)
  }
  const handleAccountChange=async(account)=>{
    switch (account) {
      case "owner":
    const {data:ownerByUser}=await getownerByUserId(user.userId)
    if(ownerByUser.length==0){
      console.log("u are not an owner")
    }else{
      dispatch(AccounttypeAction.changeAccount(account))
      setprodModal(false)
    }
        break;
        case "worker":
        let worker={
    userId:user.userId,
    storeId:"6297ef6b556bc3283815f467",
  }
    // const addworkerDb=await addWorker(worker)
        const {data:workerByUser}=await getWorkerByUserId(user.userId)
        if(workerByUser.length==0){
          console.log("u are not an worker")
        }else{
          dispatch(AccounttypeAction.changeAccount(account))
          setprodModal(false)
        }   
      default:
      dispatch(AccounttypeAction.changeAccount(account))
      setprodModal(false)
        break;
    }
  //  if(account=="owner"){
  // //    let stores={
  // //     timestamp:Date.now(),
  // //     storeName:"hamid",
  // //     storeType:"grossery",
  // //    }
  // // let owner={
  // //   userId:user.userId,
  // //   storeId:"6297ef6b556bc3283815f467",
  // // }
  //   // const addStoredb=await addStores(stores)
  //   // const addOwnerDb=await addOwner(owner)
  //   // const {data:ownerByUser}=await getownerByUserId(user.userId)
  //   const {data:ownerByUser}=await getownerByUserId("6297ef6b556bc3283815f467")
  //   if(ownerByUser.length==0){
  //     console.log("u are not an owner")
  //   }else{
  //     dispatch(AccounttypeAction.changeAccount(account))
  //     setprodModal(false)
  //   }
  //   //  console.log("see if u exist",addStoredb)
  //   //  console.log("see if u exist",ownerByUser)
  //  }

  }
  const handleRefresh=async()=>{
    const {data:dauser}=await getAUser(user.userId)
    dauser[0].userId=dauser[0]._id
    // let newDauser={...dauser[0]}
    // newDauser.userId=dauser._id
    dispatch(userActions.userloggedIn(dauser[0]))
    console.log(dauser)
  }
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
      <Button
      title='refresh'
      onPress={()=>handleRefresh()}
      />
        <ListItem
        title={"change Accounts :"+accountType}
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>setprodModal(true)}
      />
        <ListItem
          title={"userName:"+user.userName}
          subTitle={"||Cash:"+user.cash}
          renderRightActions={()=><View style={{width:70}} ></View>}
          renderLeftActions={()=><View style={{width:70}} ></View>}
          onSwipeableLeftOpen={()=>navigation.navigate("addList")}
          childrenContainerStyle={{backgroundColor:"red"}}
          image={require("../assets/mosh.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
            chevron={true}
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        // onPress={handlelogOut}
      />
      <Modal
animationType="slide"
visible={prodModal}
onRequestClose={() => {
  setprodModal(false);

}}

>
<Button 
title="exit"
// color={buttonColor}
onPress={()=>setprodModal(false)}
/>
<ListItem
        title="client"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("client")}
      />
{user.gender=="male"&&
<View>

<ListItem
        title="father"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("father")}
        />
<ListItem
        title="son"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("son")}
        />
</View>
      }
{user.gender=="female"&&
<View>

<ListItem
        title="mother"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("father")}
        />
<ListItem
        title="daugther"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("son")}
        />
</View>
      }
<ListItem
        title="owner"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("owner")}
      />
<ListItem
        title="worker"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("worker")}
      />
<ListItem
        title="supplier"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("supplier")}
      />
<ListItem
        title="manufacture"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("manufacture")}
      />
</Modal>

    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;

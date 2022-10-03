import React, { useContext, useState } from "react";
import { StyleSheet, View, FlatList,Button,Modal } from "react-native";
import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import listContext from "../list_context/list-context";
import { useSelector, useDispatch } from "react-redux";
import *as userActions from "../redux/users";
import *as AccounttypeAction from "../redux/accountType";
import { getAUser } from "../api/users";
import C_Button from "../components/C_Button";
import ChangeAccount from "../components/ChangeAccount";
import ShareAccount from "../components/ShareAcount";
import RegisterFamily from "../components/RegisterFamily";
import RegisterSon from "../components/RegisterSon";
import AddStore from "../components/AddStore";
import AddSupplier from "../components/AddSupplier";
import RegisterStoreWorker from "../components/RegisterStoreWorker";
import RegisterSupplierWorker from "../components/RegisterSupplierWorker";
import AddManifacture from "../components/AddMnifacture";
import RegisterManifactureWorker from "../components/RegisterManifactureWorker";
import RegisterDaughter from "../components/RegisterDaughter";
import RegisterMother from "../components/RegisterMother";
import { fatherAccount, motherAccount, daughterAccount,
   sonAccount, storeOwnerAccount, storeWorkerAccount, 
   supplierAccount, manifactureWorkerAccount } from "./accountFunc";

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
  const [changeAccountModal,setchangeAccountModal]=useState(false)
  const [shareAccountModal,setshareAccountModal]=useState(false)
  const [familyLoginModal,setfamilyLoginModal]=useState(false)
  const [sonModal,setsonModal]=useState(false)
  const [daughterModal,setdaughterModal]=useState(false)
  const [motherModal,setmotherModal]=useState(false)
  const [storeOwnerModal,setstoreOwnerModal]=useState(false)
  const [storeWorker,setstoreWorker]=useState(false)
  const [supplier,setsupplier]=useState(false)
  const [supplierWorkerModal,setsupplierWorkerModal]=useState(false)
  const [manifactureModal,setmanifactureModal]=useState(false)
  const [manifactureWorkerModal,setmanifactureWorkerModal]=useState(false)
  const [account,setaccount]=useState("")
  const dispatch=useDispatch();
  const user=useSelector(state=>state.entities.users.list)
  const accountType=useSelector(state=>state.entities.accountType.account)
  const owner=useSelector(state=>state.entities.owner.ownerDt)
  const father=useSelector(state=>state.entities.father.fatherDt)
  const mother=useSelector(state=>state.entities.mother.motherDt)
  const daughter=useSelector(state=>state.entities.daughter.daughterDt)
  const family=useSelector(state=>state.entities.family.familyDt)
  const manifactureWorker=useSelector(state=>state.entities.manifactureWorker.manifactureWorkerDt)
  const st_worker=useSelector(state=>state.entities.storeWorker.storeWorkerDt)
  const supplierWorker=useSelector(state=>state.entities.supplierWorker.supplierWorkerDt)
  const son=useSelector(state=>state.entities.son.sonDt)
  const store=useSelector(state=>state.entities.store.storeDt)
  const supplierDt=useSelector(state=>state.entities.supplier.supplierDt)
  const manifactureDt=useSelector(state=>state.entities.manifacture.manifactureDt)
  console.log("st_worker",st_worker)
  const context=useContext(listContext)
  const handlelogOut=async()=>{
  await context.setUser(null)
  await context.setToken(null)
  }
  const handleAccountChange=async(account)=>{
    setaccount(account)
    switch (account) {
    case "father":
    fatherAccount(father,user,dispatch,
      setfamilyLoginModal,setchangeAccountModal,account)
        break;
    case "mother":
   motherAccount( mother,setchangeAccountModal,setmotherModal,account)
        break;
     case "son":
     sonAccount(son,setchangeAccountModal,setsonModal,account)
    //  setsonModal(true)
    break;
     case "daughter":
     daughterAccount(daughter,dispatch,setdaughterModal,
     setchangeAccountModal,account)
    break;
     case "storeOwner":
    storeOwnerAccount(owner,setchangeAccountModal,
      setstoreOwnerModal,account)
    break;
    
    case "storeworker":
    storeWorkerAccount(st_worker,setchangeAccountModal,
    setstoreWorker,account)
    break;
    case "supplier":
    supplierAccount(supplierDt,setchangeAccountModal,
      setsupplier,account)
    break;
    case "supplierWorker":
    supplierWorkerAccount(supplierWorker,setchangeAccountModal,
      setsupplierWorkerModal,account)
    break;
    case "manifacture":
    manifactureAccount(manifactureDt,setchangeAccountModal,
      setmanifactureModal,account)
    break;
    case "manifactureWorker":
    manifactureWorkerAccount(manifactureWorker,setchangeAccountModal,
      setmanifactureWorkerModal,account)
    break;
      default:
      dispatch(AccounttypeAction.changeAccount(account))
      setchangeAccountModal(false)
        break;
    }
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
      <C_Button
      title='refresh'
      onPress={()=>handleRefresh()}
      />
      <C_Button
      title='share your acount'
      onPress={()=>setshareAccountModal(true)}
      />
        <ListItem
        title={"change Accounts :"+accountType}
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>setchangeAccountModal(true)}
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
        onPress={handlelogOut}
      />
      <ChangeAccount  prodModal={changeAccountModal}
    setprodModal={setchangeAccountModal}
    handleAccountChange={(dt)=>handleAccountChange(dt)}
    user={user}
    />
      <ShareAccount
        prodModal={shareAccountModal}
    setprodModal={(dt)=>setshareAccountModal(dt)}
    user={user}
    />
     <RegisterFamily
      prodModal={familyLoginModal}
      setprodModal={(dt)=>setfamilyLoginModal(dt)}
      user={user}
      dispatch={dispatch}
      setchangeAccountModal={(dt)=>setchangeAccountModal(dt)}
      account={account}
      />
     <RegisterSon
      prodModal={sonModal}
      setprodModal={(dt)=>setsonModal(dt)}
      user={user}
      dispatch={dispatch}
      setchangeAccountModal={(dt)=>setchangeAccountModal(dt)}
      account={account}
      />
     <RegisterMother
      prodModal={motherModal}
      setprodModal={(dt)=>setmotherModal(dt)}
      user={user}
      dispatch={dispatch}
      setchangeAccountModal={(dt)=>setchangeAccountModal(dt)}
      account={account}
      />
     <RegisterDaughter
      prodModal={daughterModal}
      setprodModal={(dt)=>setdaughterModal(dt)}
      user={user}
      dispatch={dispatch}
      setchangeAccountModal={(dt)=>setchangeAccountModal(dt)}
      account={account}
      />
     <AddStore
      prodModal={storeOwnerModal}
      setprodModal={(dt)=>setstoreOwnerModal(dt)}
      user={user}
      dispatch={dispatch}
      setchangeAccountModal={(dt)=>setchangeAccountModal(dt)}
      account={account}
      />
     <RegisterStoreWorker
      prodModal={storeWorker}
      setprodModal={(dt)=>setstoreWorker(dt)}
      user={user}
      dispatch={dispatch}
      setchangeAccountModal={(dt)=>setchangeAccountModal(dt)}
      account={account}
      />
     <AddSupplier
      prodModal={supplier}
      setprodModal={(dt)=>setsupplier(dt)}
      user={user}
      dispatch={dispatch}
      setchangeAccountModal={(dt)=>setchangeAccountModal(dt)}
      account={account}
      />
     <RegisterSupplierWorker
      prodModal={supplierWorkerModal}
      setprodModal={(dt)=>setsupplierWorkerModal(dt)}
      user={user}
      dispatch={dispatch}
      setchangeAccountModal={(dt)=>setchangeAccountModal(dt)}
      account={account}
      />
     <AddManifacture
      prodModal={manifactureModal}
      setprodModal={(dt)=>setmanifactureModal(dt)}
      user={user}
      dispatch={dispatch}
      setchangeAccountModal={(dt)=>setchangeAccountModal(dt)}
      account={account}
      />
     <RegisterManifactureWorker
      prodModal={manifactureWorkerModal}
      setprodModal={(dt)=>setmanifactureWorkerModal(dt)}
      user={user}
      dispatch={dispatch}
      setchangeAccountModal={(dt)=>setchangeAccountModal(dt)}
      account={account}
      />
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

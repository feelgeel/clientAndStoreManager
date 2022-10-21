import React, { useState } from 'react';
import { StyleSheet, View,Text,FlatList} from 'react-native';
import Screen from '../../components/Screen'
import { ListItem } from '../../components/lists';
import Icon from '../../components/Icon';
import colors from '../../config/colors';
import AddProductModal from '../../components/AddProductModal';
import { handleSaveList,handleAddproducts,
    handleSaveChosen,handleunselected,
    handleListNameClick,
    handleChosenClicked, 
    handleLongPresList,
    handleUpdateTheChosenQuant,
    handleUpdateListName,
    handleDuplicateClientList,
    handleUpdateTheChosenQuantDuplication} from './ShowlistNameFunc';
import { useSelector, useDispatch } from "react-redux";
import AddListName from '../../components/AddListName';
import AddQuantity from '../../components/addQuantity/AddQuantity';
import LongpressList from '../../components/LongpressList';
import ModifyChosen from '../../components/modifyChosen/ModifyChosen';
import Duplication from '../../components/Duplication';
function ShowListNamesScreen({children,style}) {
    const dispatch=useDispatch();
    const user=useSelector(state=>state.entities.users.list)
    const clientProducts=useSelector(state=>state.entities.client_listNames.listproducts)
    const theClientList=useSelector(state=>state.entities.client_listNames.theList)
    const Theproduct=useSelector(state=>state.entities.client_listNames.theProd)
    const[ProdModal,SetProdModal]=useState(false)
    const[chosenmodal,Setchosenmodal]=useState(false)
    const[listModal,SetlistModal]=useState(false)
    const[listlongPressModal,SetlistlongPressModal]=useState(false)
    const[modifyChosenModal,setModifyChosenModal]=useState(false)
    const[Duplicationmodal,setDuplicationmodal]=useState(false)
    const[chosen,Setchosen]=useState([])
    const[product,Setproduct]=useState([])
    const[theListNames,SettheListNames]=useState([])
    const[theChosen,settheChosen]=useState({})
    const[SelectedlistName,setSelectedlistName]=useState({})
    const[selectedChosen,setselectedChosen]=useState({})
    const[listName,SetlistName]=useState("")
    const[quantity,Setquantity]=useState(1)
    // console.log(chosen)
return (

<Screen style={styles.container}>
<View style={{height:150,paddingLeft:"5%",paddingTop:"10%"}}>
        <Text style={{color:"white"}}>HELLO CISCO</Text>
        <Text style={{color:"white"}}>Have a nice day</Text>
</View>
         <ListItem
          title="ADD A LIST"
          IconComponent={
            <Icon
              name="plus-circle"
              backgroundColor={colors.secondary}
              />
            }
            onPress={()=>SetlistModal(true)}
        />
               <FlatList
              data={theListNames}
              keyExtractor={(theListNames) => theListNames._id}
                  
              renderItem={({ item }) => 
              {
              return (
                <ListItem
          title={item.listName}
          
            onPress={()=>{
                handleListNameClick(item,setSelectedlistName,
                    Setchosen,chosen,SetProdModal,clientProducts)
            }}
            onLongPress={()=>{
                handleLongPresList(item,SetlistlongPressModal,
                    setSelectedlistName,Setchosen,clientProducts)
            }}
        />
                  )
              }
    }
    />  
        {/*                     add a listName                                 */}
 <AddListName
 listModal={listModal}
 SetlistModal={(dt)=>SetlistModal(dt)}
 SetlistName={(dt)=>SetlistName(dt)}
 onSaveList={()=>handleSaveList( listName, dispatch, SetlistModal,user,
        SettheListNames,theListNames)}
 />
 {/*                     add a quantity                                 */}
<AddQuantity
chosenmodal={chosenmodal}
Setchosenmodal={(dt)=>Setchosenmodal(dt)}
Setquantity={(dt)=>Setquantity(dt)}
onunselected={()=>handleunselected(theChosen,SelectedlistName,
        quantity,Setchosenmodal,
        product,Setproduct,
        chosen,Setchosen,user)}
/>
{/*                           long press list modal               */}  
<LongpressList
listlongPressModal={listlongPressModal}
SelectedlistName={SelectedlistName}
 SetlistlongPressModal={(dt)=>SetlistlongPressModal(dt)}
 SetlistName={(dt)=>SetlistName(dt)}
 theClientList={theClientList}
 setDuplicationmodal={(dt)=>setDuplicationmodal(dt)}
 onUpdateListName={(dt)=>handleUpdateListName(SelectedlistName,listName,
        theListNames,SettheListNames,dispatch)}
/>

{/*                           add product modal               */}     
<AddProductModal
chosen={chosen}
product={product}
onAddProduct={(store,categ)=>handleAddproducts(
store,categ,Setproduct,chosen)}
onUnselected={(dt)=>{Setchosenmodal(true);settheChosen(dt)}}
onSaveChosen={()=>handleSaveChosen(dispatch,chosen,
Setchosen,user,
SelectedlistName,SetProdModal)}
onSetProdModal={(dt)=>SetProdModal(dt)}
prodModal={ProdModal}
onSelected={(dt)=>handleChosenClicked(dt,selectedChosen,setselectedChosen,
dispatch,setModifyChosenModal)}
/>
{/*                          modify chosen modal               */}     
<ModifyChosen
modifyChosenModal={modifyChosenModal}
setModifyChosenModal={(dt)=>setModifyChosenModal(dt)}
Theproduct={Theproduct}
Setquantity={(dt)=>Setquantity(dt)}
onUpdateTheChosenQuant={()=>handleUpdateTheChosenQuant(quantity,
     dispatch,Theproduct,clientProducts,chosen,Setchosen)}
/>
{/*                          Duplication modal               */}     
<Duplication
setDuplicationmodal={(dt)=>setDuplicationmodal(dt)}
Duplicationmodal={Duplicationmodal}
SetlistName={(dt)=>SetlistName(dt)}
chosen={chosen}
product={product}
Setchosenmodal={(dt)=>Setchosenmodal(dt)}
settheChosen={(dt)=>settheChosen(dt)}
Theproduct={Theproduct}
Setquantity={(dt)=>Setquantity(dt)}
onpdateTheChosenQuantDuplication={()=>handleUpdateTheChosenQuantDuplication(
    theChosen, quantity,chosen,Setchosen,dispatch)}
onDuplicateClientList={()=>handleDuplicateClientList(chosen,listName,
    user,theListNames,dispatch,SettheListNames,
    setDuplicationmodal,SetlistlongPressModal)}
onAddproducts={(store,categ)=>handleAddproducts(store,categ,Setproduct,chosen)}
/>
</Screen>
 );
}
const styles = StyleSheet.create({
container:{
    backgroundColor: "#6f51ff",
}
})
export default ShowListNamesScreen;
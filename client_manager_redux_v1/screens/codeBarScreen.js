import React, { useState, useEffect,useContext } from 'react';
import { View, StyleSheet, Text, button, Button,FlatList } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import listContext from "../list_context/list-context";
import { ListItem} from "../components/lists";
import Screen from "../components/Screen";
import Icon from '../components/Icon';
import { Modal } from "react-native-paper";
import colors from "../config/colors";
import itemContext from "../list_context/list-context";
import TextInput from "../components/TextInput";
import {
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import * as Yup from "yup";
const Barcode = ({ navigation ,route}) => {
    const [visible, setVisible] =useState(false);
    const [visible1, setVisible1] =useState(false);
    const showModal = () => setVisible(true);
     const hideModal = () => setVisible(false);
    const showModal1 = () => setVisible1(true);
     const hideModal1 = () => setVisible1(false);
     const containerStyle = {backgroundColor: 'white', padding: 20,marginTop:120
    };
    const context=useContext(itemContext);
    const lists=context.list;
    const listNames=context.ListName;
    const theChosen=context.Chosen;
    const chosenProds=context.ChosenProd;
    const [gting, setGting] = useState("");
    const [scannedGting, setScannedGting] = useState("");
    const [chosen, setchosen] = useState("");
    const [prodGting, setprodGting] = useState("");
    const [thePrice, setThePrice] = useState("");
    const [categ, setcateg] = useState("");

    const [price, setPrice] = useState("");
    // for (let i = 0; i < lists.length; i++) {
    //     const element = lists[i];
    //     let theProds=element.prodChosen;
    //     // console.log(element.chosen);
    //     for (let j = 0; j < theProds.length; j++) {
    //         const prod = theProds[j];

    //         theprodGting.push(
    //             {name:element.listName,
    //             gting:prod.Gting,
    //             categ:prod.categ,
    //             status:false})
    //         // console.log(prod.Gting);
            
    //     }
    //   }
        // console.log(chosenProds[0]);
        let theprodGting=[];
        let handleproductSet=()=>{
          listNames.map(val=>{
            let chosenProdIds=val.chosenProdIds;
            let listName=val.listName;
            chosenProdIds.map(item=>{
              // console.log("item",item);
              // console.log("gting",gting);
              if(item==gting){
                let theCateg=chosenProds.filter(val=>val.Gting==gting)
                theCateg=theCateg[0].categ;
                let categId=theChosen.filter(value=>value.name==theCateg)
                // console.log(categId);
                theprodGting.push(
                            {_id:val._id,
                              name:listName,
                            gting:item,
                            categ:theCateg,
                            categId:categId[0]._id,
                            status:false}
                            )
                            // console.log(theCateg);
              }
            })
          })
          // console.log(theprodGting);
      //  setchosen(theprodGting)
      }
        // console.log(theprodGting);
    
    // useEffect(()=>{
    //     handleproductSet()
        
    // },[])
    const [hasCameraPermission, setCameraPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    // useEffect(() => {
    //   (async () => {
    //     // const { status:barcodeStatus } = await BarCodeScanner.requestPermissionsAsync();
    //     const { status:CameraStatus } = await Permissions.getAsync(Permissions.CAMERA);
    //     // sethasBarcodePermission(barcodeStatus === 'granted');
    //     setCameraPermission(CameraStatus === 'granted');
    //   })();
    // }, []);
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setGting(data)
        showModal()
        // console.log(gting);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      };

// console.log(chosen);
const handleStatus=(val)=>{
let prod=[...chosen]
let index_chosen = prod.indexOf(val);
let newProd=prod[index_chosen]
newProd.status=!newProd.status;
prod[index_chosen]=newProd;
setchosen(prod)
// console.log(prod[index_chosen])
}
const handleSave=()=>{
  let NewListName=[...context.ListName]
  chosen.map(ch=>{
    if(ch.status==true){
      // console.log("true");
              NewListName.map(ls=>{
            // console.log("ls",ls);
              
            chosen.map(val=>{
              if(val.listName==ls.listName){
                // console.log(val);
                let result=val.quantity-1
                console.log("result",result);
                ls.chosenIds.map(ch=>{
            console.log(ch.ThechosenProdId.length);
                if(ch.name==categ){
                  if(result!=0){
                    // console.log("categnametrue",ch);
                    if(ch.ThechosenProdId.length==0){
                      ch.ThechosenProdId.push({gting:gting,quantity:1})
                    }else{
                      ch.ThechosenProdId.map(it=>{
                    //     console.log("it",it);
                        if(it.gting==gting){
                          it.quantity+=1
                        }else{
                          ch.ThechosenProdId.push({gting:gting,quantity:1})
                        }
                      })

                    }
                    ch.quantity=result
                  }else{
                    ch.status=true;

                    ch.quantity=result;
                    if(ch.ThechosenProdId.length==0){
                      ch.ThechosenProdId.push({gting:gting,quantity:1})
                    }else{
                      ch.ThechosenProdId.map(it=>{
                    //     console.log("it",it);
                        if(it.gting==gting){
                          it.quantity+=1
                        }else{
                          ch.ThechosenProdId.push({gting:gting,quantity:1})
                        }
                      })

                    }
                  }
                }
                })
            
            
              }
          
            })
            })

            context.FullupdateListName(NewListName)
      
    }else{
      console.log("false");
    }
  })

//   let newLists=[...lists]
//   let theTrue=chosen.filter((item)=>item.status==true)
//   for (let z = 0; z < theTrue.length; z++) {
//     const list = theTrue[z];
//     let newlist_index=newLists.findIndex((item)=>item.listName==list.name)
//     let newchosenprod=newLists[newlist_index].chosen;
//   let updatedItem_index=newchosenprod.findIndex((item)=>item.name==list.categ)
//   let updatedItem=newchosenprod.filter((item)=>item.name==list.categ)

// updatedItem.status=!updatedItem.status;
// newchosenprod[updatedItem_index]=updatedItem
// newLists[newlist_index].chosen=newchosenprod
    // console.log(list.categ,newchosenprod[0].categ);
    // console.log(newchosenprod);
    
    console.log(NewListName);
    
  }
  // console.log(context.TheListName);
  // context.updateList(listItems._id,listItems);
const handleGtingSave=(e)=>{
setGting(e)
}
const handlePrice=(e)=>{
setThePrice(e)
}
//acti+ bar9ou9 6130760002960 3265470036127
const validationSchema = Yup.object().shape({
  
  price: Yup.number().required().min(1).label("price"),
  // category: Yup.object().required().nullable().label("stores"),
});
// console.log(chosen);

const handleAddProd=()=>{
  let codebarList=[]
  context.ListName.map(item=>{
    let listCodebar={}
    listCodebar.listName=item.listName
    listCodebar.categName=[]
    item.chosenIds.map(data=>{
      console.log(data.quantity);
      if(data.status==false){
        listCodebar.categName.push({[data.name]:[...data.chosenProdIds],quantity:data.quantity})

      }
        // console.log(data);
    })
    
    // console.log(item);
    codebarList.push(listCodebar)
  })
  
  // console.log("codebarlist",codebarList);
  // console.log("thechosenprod",context.ChosenProd);
  context.ChosenProd.map(tr=>{
    // console.log(tr.Gting);
    if(tr.Gting==gting){
      setcateg(tr.categ)
      // console.log(tr.categ);

    }
  })
  let TheCodebarlist=[]


  codebarList.map(f=>{
    // // console.log("f",f);
    f.categName.map(de=>{
      console.log("de",de.quantity);
      let categList=Object.keys(de);
      // console.log("categlist",categList);
      categList.map(fr=>{
          if(fr==categ){
                let categ_arr=de.[categ]
                    categ_arr.map(dr=>{
                    if(dr==gting){
                      TheCodebarlist.push({
                      listName:f.listName,
                      categ:categ,
                      gting:gting,
                      quantity:de.quantity
              
                      }) 
                    } 
                    

                    })
                  }


          })

      })
      })
 
  

setchosen(TheCodebarlist)
  // console.log("thecodebarlist",TheCodebarlist);
  // console.log("codebarlist",codebarList);
}
// console.log("chosen",chosen);
return (
  <Screen>
 <View>
  <TextInput onChangeText={handleGtingSave}  keyboardType="number-pad"/>
  <Button title="save gting" onPress={()=>{
    handleAddProd()
  //  console.log(gting);
    // showModal1()
    }}/>
     
   {/* <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.Type.qr,BarCodeScanner.Constants.Type.ena13]}
        
        style={styles.bar}
      />
       {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
      
      <FlatList
       data={chosen}
       keyExtractor={(chosen) => chosen.listName}
     //   ItemSeparatorComponent={ListItemSeparator}
       renderItem={({ item }) => (
       
              (<ListItem //style={styles}
                 title={item.categ+"  "+item.listName}
                 // title={item.categ}
                 checkbox={true}
                 checked={item.status}
                 IconComponent={
                     <Icon
                       name={"menu"}
                       backgroundColor={colors.secondary}
                     />
                   }
                   onPress={()=>handleStatus(item)}
              />
                  )
          
           )
       }
     /> 
      <Button title='save' onPress={()=>{
           handleSave()
           

         }}/>
 </View>
 <Modal visible={visible1} onDismiss={hideModal1} 
 contentContainerStyle={containerStyle} 
  >
      <Form
        initialValues={{
          price: "",
        }}
        onSubmit={(values) => {
          handleproductSet()
        setPrice(values.price);
        setchosen(theprodGting)
        hideModal1();
        showModal()
        }}
        validationSchema={validationSchema}
      >
        <FormField keyboardType="number-pad"  maxLength={255} name="price" placeholder="price" />
        <SubmitButton  title="save price" />
      </Form>
     </Modal>
 <Modal visible={visible} onDismiss={hideModal} 
 contentContainerStyle={containerStyle} 
  >
       <View >

         {/* <View style={{flexDirection:"row"}}>
         <Text>price:{price}</Text>
        <TextInput onChangeText={handlePrice} />
         </View>
        <Button  title="price save" onPress={()=>setPrice(thePrice)}/> */}
       {/* <FlatList
       data={chosen}
       keyExtractor={(chosen) => chosen._id.toString()}
     //   ItemSeparatorComponent={ListItemSeparator}
       renderItem={({ item }) => (
       
              (<ListItem //style={styles}
                 title={item.categ+"  "+item.listName}
                 // title={item.categ}
                 checkbox={true}
                 checked={item.status}
                 IconComponent={
                     <Icon
                       name={"menu"}
                       backgroundColor={colors.secondary}
                     />
                   }
                   onPress={()=>handleStatus(item)}
              />
                  )
          
           )
       }
     /> */}
         {/* <View style={{flexDirection:"row",justifyContent:"space-around"}}> */}
         <Button style={{color:"red"}} title='cancel' onPress={()=>hideModal()}/>
         <Button title='OK' onPress={()=>{
           handleSave()
           hideModal()

         }}/>
       {/* </View> */}
       </View>
     </Modal>
  
  </Screen>);
};


const styles = StyleSheet.create({
    bar:{
        width:"100%",
        height:"90%"
    }
 });
export default Barcode;
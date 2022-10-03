import React from 'react';
import { StyleSheet, View,Modal } from 'react-native';
import C_Button from './C_Button';
import { ListItem } from './lists';
import Icon from './Icon';

function ChangeAccount({
    prodModal,
    setprodModal,
    handleAccountChange,
    user,
}) {
return (
<View style={styles.container}>
<Modal
animationType="slide"
visible={prodModal}
onRequestClose={() => {
  setprodModal(false);

}}

>
<C_Button 
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
        onPress={()=>handleAccountChange("mother")}
        />
<ListItem
        title="daugther"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("daugther")}
        />
</View>
      }
<ListItem
        title="storeOwner"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("storeOwner")}
      />
<ListItem
        title="storeworker"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("storeworker")}
      />
<ListItem
        title="supplier"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("supplier")}
      />
<ListItem
        title="supplierWorker"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("supplierWorker")}
      />
<ListItem
        title="manifacture"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("manifacture")}
      />
<ListItem
        title="manifactureWorker"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={()=>handleAccountChange("manifactureWorker")}
      />
</Modal>

</View>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default ChangeAccount;
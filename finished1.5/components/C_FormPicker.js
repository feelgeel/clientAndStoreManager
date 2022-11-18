import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFormikContext } from "formik";
import C_Picker from './C_Picker';
import C_ErrorMessage from './C_ErrorMessage';

function C_FormPicker({
  items, name, placeholder,icon,addMember,label}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
<>
      <C_Picker
        placeholder={placeholder}
        items={items}
        label={label}
        selectedItem={values[name]}
        onSelectedItem={(item) => setFieldValue(name, item)}
        icon={icon}
        addMember={addMember}
      />
      <C_ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default C_FormPicker;
import { useFormikContext } from 'formik';
import React from 'react';
import CustomePicker from './CustomePicker';
import ErrMessage from './ErrMessage';

function CustomFormPicker({
    placeholder,
    items,name,customwidth}) {
        const {errors,setFieldValue,touched,values}=useFormikContext()
    return (
        <>
        <CustomePicker
        customwidth={customwidth}
        items={items}
        onSeletItem={(item)=>setFieldValue(name,item)}
        placeholder={placeholder}
        selectedItem={values[name]}
        />
            <ErrMessage
            err={errors[name]} visible={touched[name]}
            />
        </>
    );
}

export default CustomFormPicker;
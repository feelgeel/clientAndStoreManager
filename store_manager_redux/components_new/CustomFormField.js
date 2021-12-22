import { useFormikContext } from 'formik';
import React from 'react';
import CustomTextInput from './CustomTextInput';
import ErrMessage from './ErrMessage';

function CustomFormField({name,customwidth,...otherProps}) {
    const {setFieldTouched,setFieldValue,values,
        errors,touched}=useFormikContext();
    return (
        <>
             <CustomTextInput
             customwidth={customwidth}
                        {...otherProps}
                        onBlur={()=>setFieldTouched(name)}
                        onChangeText={(text)=>setFieldValue(name,text)}
                        value={values[name]}
                        />
                      <ErrMessage visible={touched[name]}
                       err={errors[name]}/>  
        </>
    );
}

export default CustomFormField;
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';

function C_Form({initialValues,onSubmit,validationSchema,children}) {
    // const formRef = useRef();
return (
<Formik
initialValues={initialValues}
onSubmit={onSubmit}
validationSchema={validationSchema}
// innerRef={formRef}
>
{({values}) => 
(<>
{children(values)}
</>)
}
</Formik>
 );
}
const styles = StyleSheet.create({
container:{

}
})
export default C_Form;
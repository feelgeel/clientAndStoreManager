import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';

function C_Form({initialValues,onSubmit,validationSchema,children}) {
return (
<Formik
initialValues={initialValues}
onSubmit={onSubmit}
validationSchema={validationSchema}
>
{() => 
(<>
{children}
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
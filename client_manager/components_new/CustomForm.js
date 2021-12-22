import { Formik } from 'formik';
import React from 'react';

function CustomForm({children,initialValues,
                    onSubmit,validationSchema}) {
    return (
        <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        >
           {()=><>{children}</>} 
        </Formik>
    );
}

export default CustomForm;

import React, {useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
// import ListState from './client_manager_redux_v1/list_context/ListState';
// import listContext from './client_manager_redux_v1/list_context/list-context';
import Index from './Index';
import { Provider } from 'react-redux';
import configureStore from './finished1.4/redux/configureStore';
const theStore=configureStore();
export default function App() {
    //  const context=useContext(listContext)
   
  return(
    <Provider store={theStore}>
          <Index/>     
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"red"
  
  },
});

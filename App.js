
import React, {useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import ListState from './store_manager_redux/list_context/ListState';
import listContext from './store_manager_redux/list_context/list-context';
import Index from './Index';
import { Provider } from 'react-redux';
import configureStore from './store_manager_redux/redux/configureStore';
const theStore=configureStore();
export default function App() {
     const context=useContext(listContext)
   
  return(
    <Provider store={theStore}>
        <ListState>
          <Index/>
        </ListState>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"red"
  
  },
});

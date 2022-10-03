import React, { useState, useReducer } from 'react';

import ListContext from './list-context';
import { listReducer, ADD_LIST, REMOVE_LIST } from './reducers';

const ListState = props => {
  // const [cart, setCart] = useState([]);
  const [listState, dispatch] = useReducer(listReducer, { cart: [] });

  const addToList = product => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: ADD_LIST, product: product });
    }, 700);
  };

  const removeFromList = productId => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: REMOVE_LIST, productId: productId });
    }, 700);
  };

  return (
    <ListContext.Provider
      value={{
        todo: listState.cart,
        addToList: addToList,
        removeFromList: removeFromList
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListState;

import React, { useState, useReducer } from 'react';

import ListContext from './list-context';
import { listReducer, ADD_LIST, REMOVE_LIST } from './reducers';

const ListState = props => {
  // const [cart, setCart] = useState([]);
  const [listState, dispatch] = useReducer(listReducer, { cart: [] });

  const addToListItem = product => {
    setTimeout(() => {
      // setCart(updatedCart); 
      dispatch({ type: ADD_LIST, product: product });
    }, 700);
  };

  const removeFromListItem = productId => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: REMOVE_LIST, productId: productId });
    }, 700);
  };

  return (
    <ListContext.Provider
      value={{
        list: listState.cart,
        addItem: addToListItem,
        removeItemt: removeFromListItem
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListState;

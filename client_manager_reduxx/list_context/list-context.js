import React from 'react';

export default React.createContext({
  list: [],
  addProductToCart: product => {},
  removeProductFromCart: productId => {},
  updateProduct: (productId,prodObj) => {}
});

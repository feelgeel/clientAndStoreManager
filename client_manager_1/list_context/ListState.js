import React, { useState, useReducer } from 'react';

import ListContext from './list-context';
import {  listReducer, 
          ADD_LIST, 
          REMOVE_LIST, 
          UPDATE_LIST, 
          ADD_LISTNAME,
          REMOVE_LISTNAME,
          UPDATE_LISTNAME,
          ADD_CHOSEN,
          REMOVE_CHOSEN,
          UPDATE_CHOSEN,
          ADD_CHOSENPROD,
          REMOVE_CHOSENPROD,
          UPDATE_CHOSENPROD,
          SET_LISTNAME,
          SET_THECHOSEN,
          ADD_CATEG,
          SET_THECHOSENPROD,
          SET_THECHOSENPROD1,
          SET_CATEGPROD,
          FULL_UPDATE_LISTNAME,
           SET_USER,SET_TOKEN,
           SET_THEPROD,SET_THEGTING,
          SET_THECATEG,SET_CATEGSTORE,
        SET_GTINGS_BY_CATEG } from './reducers';

const ListState = props => {
  // const [cart, setCart] = useState([]);
  const [listState, dispatch] = 
  useReducer(listReducer, { 
    list: [],ListName:[],Chosen:[],
    ChosenProd:[],categories:[],TheListName:{},
    TheChosen:{},TheChosenProds:[],TheChosenProds1:{},CategProd:[],
    User:{},Token:"",StoreName:"",TheProd:[],TheGting:[],TheCateg:{},CategStore:[],GtingsByCateg:[] });

  //////////////////////
    ///////the CATEG/////
    //////////////////////////
    const setTheCateg = product => {
        setTimeout(() => {
          // setCart(updatedCart);
          dispatch({ type: SET_THECATEG, product: product });
        });
      };
   
  //////////////////////
    ///////gtindsByCateg/////
    //////////////////////////
    const setGtingsByCateg = product => {
        setTimeout(() => {
          // setCart(updatedCart);
          dispatch({ type: SET_GTINGS_BY_CATEG, product: product });
        });
      };
   
  //////////////////////
    ///////the categStore/////
    //////////////////////////
    const setCategStore = product => {
        setTimeout(() => {
          // setCart(updatedCart);
          dispatch({ type: SET_CATEGSTORE, product: product });
        });
      };
   
  //////////////////////
    ///////the listName/////
    //////////////////////////
    const setListName = product => {
        setTimeout(() => {
          // setCart(updatedCart);
          dispatch({ type: SET_LISTNAME, product: product });
        });
      };
   
  //////////////////////
    ///////the user/////
    //////////////////////////
    const setUser = user => {
        setTimeout(() => {
          // setCart(updatedCart);
          dispatch({ type: SET_USER, product: user });
        });
      };
   
  //////////////////////
    ///////the token/////
    //////////////////////////
    const setToken = token => {
        setTimeout(() => {
          // setCart(updatedCart);
          dispatch({ type: SET_TOKEN, product: token });
        });
      };
   
  //////////////////////
    ///////the storeName/////
    //////////////////////////
    const setStoreName = StoreName => {
        setTimeout(() => {
          // setCart(updatedCart);
          dispatch({ type: SET_STORENAME, product: StoreName });
        });
      };
   
  //////////////////////
    ///////the PROD/////
    //////////////////////////
    const setTheProd = TheProd => {
        setTimeout(() => {
          // setCart(updatedCart);
          dispatch({ type: SET_THEPROD, product: TheProd });
        });
      };
   
  //////////////////////
    ///////the GTING/////
    //////////////////////////
    const setTheGting = theGting => {
        setTimeout(() => {
          // setCart(updatedCart);
          dispatch({ type: SET_THEGTING, product: theGting });
        });
      };
   
//////////////////////
  ///////categProd/////
  //////////////////////////
  const setCategProd = product => {
      setTimeout(() => {
        // setCart(updatedCart);
        dispatch({ type: SET_CATEGPROD, product: product });
      });
    };
 
//////////////////////
  ///////the chosenprod/////
  //////////////////////////
  const settheChosenProd = product => {
      setTimeout(() => {
        // setCart(updatedCart);
        dispatch({ type: SET_THECHOSENPROD, product: product });
      });
    };
//////////////////////
  ///////the chosenprod1/////
  //////////////////////////
  const settheChosenProd1 = product => {
      setTimeout(() => {
        // setCart(updatedCart);
        dispatch({ type: SET_THECHOSENPROD1, product: product });
      });
    };
 
//////////////////////
  ///////the Chosen/////
  //////////////////////////
  const setTheChosen = product => {
      setTimeout(() => {
        // setCart(updatedCart);
        dispatch({ type: SET_THECHOSEN, product: product });
      });
    };
 
//////////////////////
  ///////categ funcs/////
  //////////////////////////
  const addCateg = product => {
      setTimeout(() => {
        // setCart(updatedCart);
        dispatch({ type: ADD_CATEG, product: product });
      });
    };
 

//////////////////////
  ///////listName funct/////
  //////////////////////////

const addToListName = product => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: ADD_LISTNAME, product: product });
    });
  };

  const removeFromListName = productId => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: REMOVE_LISTNAME, productId: productId });
    });
  };
  const updateListName = (productId,prodObj) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: UPDATE_LISTNAME, productId: productId,prodObj:prodObj });
    });
  };
  const FullupdateListName = (product) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: FULL_UPDATE_LISTNAME,product:product });
    });
  };
//////////////////////
  ///////chosen funct/////
  //////////////////////////

const addToChosen = product => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: ADD_CHOSEN, product: product });
    });
  };

  const removeFromChosen = productId => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: REMOVE_CHOSEN, productId: productId });
    });
  };
  const updateChosen = (productId,prodObj) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: UPDATE_CHOSEN, productId: productId,prodObj:prodObj });
    });
  };
/////////////////////////////
  ///////chosenProd funct/////
  //////////////////////////

const addToChosenProd = product => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: ADD_CHOSENPROD, product: product });
    });
  };

  const removeFromChosenProd = productId => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: REMOVE_CHOSENPROD, productId: productId });
    });
  };
  const updateChosenProd = (productId,prodObj) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: UPDATE_CHOSENPROD, productId: productId,prodObj:prodObj });
    });
  };
  //////////////////////
  ///////list funcs/////
  //////////////////////////
  const addToList = product => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: ADD_LIST, product: product });
    });
  };

  const removeFromList = productId => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: REMOVE_LIST, productId: productId });
    });
  };
  const updateList = (productId,prodObj) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: UPDATE_LIST, productId: productId,prodObj:prodObj });
    });
  };

  return (
    <ListContext.Provider
      value={{
        TheListName: listState.TheListName,
        setListName: setListName,
        TheCateg: listState.TheCateg,
        setTheCateg: setTheCateg,
        CategStore: listState.CategStore,
        setCategStore: setCategStore,
        GtingsByCateg: listState.GtingsByCateg,
        setGtingsByCateg: setGtingsByCateg,
        User: listState.User,
        setUser: setUser,
        TheProd: listState.TheProd,
        setTheProd: setTheProd,
        TheGting: listState.TheGting,
        setTheGting: setTheGting,
        Token: listState.Token,
        setToken: setToken,
        StoreName: listState.StoreName,
        setStoreName: setStoreName,
        TheChosenProds: listState.TheChosenProds,
        settheChosenProd: settheChosenProd,
        TheChosenProds1: listState.TheChosenProds1,
        settheChosenProd1: settheChosenProd1,
        CategProd: listState.CategProd,
        setCategProd: setCategProd,
        TheChosen: listState.TheChosen,
        setTheChosen: setTheChosen,
        categories: listState.categories,
        addCateg: addCateg,
        list: listState.list,
        addToList: addToList,
        removeFromList: removeFromList,
        updateList: updateList,
        FullupdateListName: FullupdateListName,
        ListName:listState.ListName,
        addToListName: addToListName,
        removeFromListName: removeFromListName,
        updateListName: updateListName,
        ChosenProd: listState.ChosenProd,
        addToChosenProd: addToChosenProd,
        removeFromChosenProd: removeFromChosenProd,
        updateChosenProd: updateChosenProd,
        Chosen: listState.Chosen,
        addToChosen: addToChosen,
        removeFromChosen: removeFromChosen,
        updateChosen: updateChosen,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListState;

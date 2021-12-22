export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const UPDATE_LIST = 'UPDATE_LIST';
export const ADD_LISTNAME = 'ADD_LISTNAME';
export const REMOVE_LISTNAME = 'REMOVE_LISTNAME';
export const UPDATE_LISTNAME = 'UPDATE_LISTNAME';
export const ADD_CHOSEN = 'ADD_CHOSEN';
export const REMOVE_CHOSEN = 'REMOVE_CHOSEN';
export const UPDATE_CHOSEN = 'UPDATE_CHOSEN';
export const ADD_CHOSENPROD = 'ADD_CHOSENPROD';
export const REMOVE_CHOSENPROD = 'REMOVE_CHOSENPROD';
export const UPDATE_CHOSENPROD = 'UPDATE_CHOSENPROD';
export const ADD_CATEG = 'UPDATE_ITEM';
export const SET_LISTNAME = 'SET_LISTNAME';
export const SET_THECHOSEN = 'SET_THECHOSEN';
export const SET_THECHOSENPROD = 'SET_THECHOSENPROD';
export const SET_THECHOSENPROD1 = 'SET_THECHOSENPROD1';
export const SET_CATEGPROD = 'SET_CATEGPROD';
export const FULL_UPDATE_LISTNAME = 'FULL_UPDATE_LISTNAME';
export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_THEGTING = 'SET_THEGTING';
export const SET_THEPROD = 'SET_THEPROD';
export const SET_THECATEG = 'SET_THECATEG';
export const SET_CATEGSTORE = 'SET_CATEGSTORE';
export const SET_GTINGS_BY_CATEG = 'SET_GTINGS_BY_CATEG';
export const SET_MODES = 'SET_MODES';
export const ADD_PURCHASE = 'ADD_PURCHASE';
var _ = require('lodash');
////////////////////////
///////set listName/////
/////////////////////////
const setListName = (product,state) => {
  return {  ...state, TheListName:product};
};
////////////////////////
///////set THECATEG/////
/////////////////////////
const setTheCateg = (product,state) => {
  return {  ...state, TheCateg:product};
};
////////////////////////
///////set mode/////
/////////////////////////
const setModes = (product,state) => {
  return {  ...state, Mode:product};
};
////////////////////////
///////set CATEGSTORE/////
/////////////////////////
const setCategStore = (product,state) => {
  return {  ...state, CategStore:product};
};
////////////////////////
///////set gtingsByCateg/////
/////////////////////////
const setGtingsByCateg = (product,state) => {
  return {  ...state, gtingsByCateg:product};
};
////////////////////////
///////set USER/////
/////////////////////////
const setUser = (product,state) => {
  return {  ...state, User:product};
};
////////////////////////
///////set token/////
/////////////////////////
const setToken = (product,state) => {
  return {  ...state, Token:product};
};
////////////////////////
///////set THEPROD/////
/////////////////////////
const settheProd = (product,state) => {
  return {  ...state, TheProd:product};
};
////////////////////////
///////set THEGTING/////
/////////////////////////
const setTheGting = (product,state) => {
  return {  ...state, TheGting:product};
};
////////////////////////////////
///////set CATEGPROD  /////
//////////////////////////////
const setCategProd = (product,state) => {
  return {  ...state, CategProd:product};
};
////////////////////////////////
///////set THEcHOSENpROD/////
//////////////////////////////
const settheChosenProd = (product,state) => {
  return {  ...state, TheChosenProds:product};
};
////////////////////////////////
///////set THEcHOSENpROD1/////
//////////////////////////////
const settheChosenProd1 = (product,state) => {
  return {  ...state, TheChosenProds1:product};
};
//////////////////////
///////set Chosen/////
///////////////////////
const setTheChosen = (product,state) => {
  return {  ...state, TheChosen:product};
};
///////////////////
///////categ func/////
///////////////////
const createCateg = (product, state) => {
  return { ...state, categories:product};
};

///////////////////
///////list func/////
///////////////////
const addToList = (product, state) => {
  const updatedCart = [...state.list];
  
  updatedCart.push({ ...product });
  
  return { ...state, list:updatedCart};
};
const removeFromList = (productId, state) => {
  const updatedCart = [...state.list];
  const updatedItemIndex = updatedCart.findIndex(item => item._id === productId);

      updatedCart.splice(updatedItemIndex, 1);

  return { ...state, list: updatedCart };
};
const updateList = (productId,prodObj, state) => {
  const updatedCart = [...state.list];
  const updatedItemIndex = updatedCart.findIndex(item => item._id === productId);

  updatedCart[updatedItemIndex]=prodObj
  return { ...state, list: updatedCart };
};
const FullupdateListName = (product, state) => {
  return {  ...state, list:product};
};
////////////////////////
///////purchase func/////
////////////////////////
const addToPusrchases = (product, state) => {
  let updatedItem = [...state.Purchase];
 
    updatedItem.push({ ...product });
    updatedItem=_.uniqBy(updatedItem, '_id')
  return { ...state, Purchase:updatedItem};
}
////////////////////////
///////listname func/////
////////////////////////
const addToListName = (product, state) => {
  const updatedItem = [...state.ListName];
 
    updatedItem.push({ ...product });

  return { ...state, ListName:updatedItem};
};

const removeFromListName = (productId, state) => {
  const updatedCart = [...state.ListName];
  const updatedItemIndex = updatedCart.findIndex(item => item._id === productId);

      updatedCart.splice(updatedItemIndex, 1);

  return { ...state, ListName: updatedCart };
};
const updateListName = (productId,prodObj, state) => {
  const updatedCart = [...state.ListName];
  const updatedItemIndex = updatedCart.findIndex(item => item._id === productId);

  updatedCart[updatedItemIndex]=prodObj
  return { ...state, ListName: updatedCart };
}
////////////////////////
///////chosen func/////
////////////////////////
const addToChosen = (product, state) => {
  let updatedItem = [...state.Chosen];
 
    updatedItem.push({ ...product });
    updatedItem=_.uniqBy(updatedItem, '_id')
  return { ...state, Chosen:updatedItem};
}

const removeFromChosen = (productId, state) => {
  const updatedCart = [...state.Chosen];
  const updatedItemIndex = updatedCart.findIndex(item => item._id === productId);

      updatedCart.splice(updatedItemIndex, 1);

  return { ...state, Chosen: updatedCart };
};
const updateChosen = (productId,prodObj, state) => {
  const updatedCart = [...state.Chosen];
  const updatedItemIndex = updatedCart.findIndex(item => item._id === productId);

  updatedCart[updatedItemIndex]=prodObj
  return { ...state, Chosen: updatedCart };
};
////////////////////////
///////chosenProd func/////
////////////////////////
const addToChosenProd = (product, state) => {
  let updatedItem = [...state.ChosenProd];
 
    updatedItem.push({ ...product });
     updatedItem=_.uniqBy(updatedItem, '_id')
  return { ...state, ChosenProd:updatedItem};
};

const removeFromChosenProd = (productId, state) => {
  const updatedCart = [...state.ChosenProd];
  const updatedItemIndex = updatedCart.findIndex(item => item._id === productId);

      updatedCart.splice(updatedItemIndex, 1);

  return { ...state, ChosenProd: updatedCart };
};
const updateChosenProd = (productId,prodObj, state) => {
  const updatedCart = [...state.ChosenProd];
  const updatedItemIndex = updatedCart.findIndex(item => item._id === productId);

  updatedCart[updatedItemIndex]=prodObj
  return { ...state, ChosenProd: updatedCart };
};

export const listReducer = (state, action) => {
  switch (action.type) {
    case SET_LISTNAME:
      return setListName(action.product, state);
    case SET_USER:
      return setUser(action.product, state);
    case SET_CATEGSTORE:
      return setCategStore(action.product, state);
    case SET_MODES:
      return  setModes(action.product, state);
    case SET_GTINGS_BY_CATEG:
      return setGtingsByCateg(action.product, state);
    case SET_THECATEG:
      return setTheCateg(action.product, state);
    case SET_TOKEN:
      return setToken(action.product, state);
    case SET_THEPROD:
      return settheProd(action.product, state);
    case SET_THEGTING:
      return setTheGting(action.product, state);
    case SET_CATEGPROD:
      return setCategProd(action.product, state);
    case SET_THECHOSENPROD:
      return settheChosenProd(action.product, state);
    case SET_THECHOSENPROD1:
      return settheChosenProd1(action.product, state);
    case SET_THECHOSEN:
      return setTheChosen(action.product, state);
    case ADD_CATEG:
      return createCateg(action.product, state);
    case ADD_PURCHASE:
      return addToPusrchases(action.product, state);
    case ADD_LIST:
      return addToList(action.product, state);
    case REMOVE_LIST:
      return removeFromList(action.productId, state);
    case UPDATE_LIST:
      return updateList(action.productId,action.prodObj, state);
    case ADD_LISTNAME:
      return addToListName(action.product, state);
    case REMOVE_LISTNAME:
      return removeFromListName(action.productId, state);
    case UPDATE_LISTNAME:
      return updateListName(action.productId,action.prodObj, state);
    case FULL_UPDATE_LISTNAME:
      return FullupdateListName(action.product, state);
    case ADD_CHOSEN:
      return addToChosen(action.product, state);
    case REMOVE_CHOSEN:
      return removeFromChosen(action.productId, state);
    case UPDATE_CHOSEN:
      return updateChosen(action.productId,action.prodObj, state);
    case ADD_CHOSENPROD:
      return addToChosenProd(action.product, state);
    case REMOVE_CHOSENPROD:
      return removeFromChosenProd(action.productId, state);
    case UPDATE_CHOSENPROD:
      return updateChosenProd(action.productId,action.prodObj, state);
    default:
      return state;
  }
};


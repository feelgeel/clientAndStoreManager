
import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from './middleware/logger';
import fnc from "./middleware/func";
import toast from "./middleware/toast";
import api from "./middleware/api";




export default function () {
  
  return configureStore({
    reducer,
    middleware:[
      ...getDefaultMiddleware(),
    //   logger({data:"logged"}),
    toast(),
    api(),
  ]
  });
};
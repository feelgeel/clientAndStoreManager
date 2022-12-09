
import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "./middleware/logger"
import toast from "./middleware/toast"
import api from "./middleware/api"
import reducer from "./reducer";





export default function () {
  
  return configureStore({
    reducer,
    middleware:[
      ...getDefaultMiddleware(),
      logger({data:"logged"}),
    toast(),
    api(),
  ]
  });
};
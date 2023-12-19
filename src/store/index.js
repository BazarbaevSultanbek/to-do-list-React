import { configureStore } from '@reduxjs/toolkit';
import listReducer from "./reducers/listReducer";

export const store = configureStore({
    reducer: {
      lists:listReducer,    
    }
  })
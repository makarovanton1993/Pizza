import { configureStore } from '@reduxjs/toolkit'
import filterReduser from './slices/filterSlice';
import cartReduser from './slices/CartSlice';
import pizzaReduser from './slices/pizzaSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter:filterReduser,
    cart:cartReduser,
    pizzas:pizzaReduser
  },
})

export type RootState = ReturnType<typeof store.getState>

 type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch 

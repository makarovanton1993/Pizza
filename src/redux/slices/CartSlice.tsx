import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemPros } from '../../components/CartItem';
import { RootState } from '../store';


type cartSliceItem = {
  id:string,
  imageUrl:string,
  price:number,
  name:string,
  types:string,
  sizes:number
  count:number
}

interface cartSliceState {
  cartItems:cartSliceItem[];
  totalCount:number;
}

const initialState:cartSliceState = {
  cartItems:[],
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action:PayloadAction<cartSliceItem>) => {
      const findItem = state.cartItems.find((obj) => obj.id === action.payload.id);
      
      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({ ...action.payload, count: 1 });
      }
      state.totalCount = state.cartItems.reduce(
        (sum, current) => sum + current.price * current.count,
        0,
      );
    },
    //Пофиксить
    minusItem: (state, action:PayloadAction<string>) => {
      const findItem = state.cartItems.find((item) => item.id === action.payload);
      
      if (findItem) {
        findItem.count > 1 ? findItem.count-- : state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      }
      state.totalCount = state.cartItems.reduce(
        (sum, current) => sum + current.price * current.count,
        0,
      );
    },
    plusItem: (state, action:PayloadAction<string>) => {
      const findItem = state.cartItems.find((item) => item.id === action.payload);
      
      if (findItem) {
        findItem.count++;
      }
      state.totalCount = state.cartItems.reduce(
        (sum, current) => sum + current.price * current.count,
        0,
      );
    },
    removeItem: (state, action:PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      state.totalCount = state.cartItems.reduce(
        (sum, current) => sum + current.price * current.count,
        0,
      );
    },
    clearItem: (state) => {
      state.cartItems = [];
      state.totalCount = state.cartItems.reduce(
        (sum, current) => sum + current.price * current.count,
        0,
      );
    },
  },
});
export const selectCart = (state:RootState) => state.cart;
export const selectCartItemById = (id:string) => (state:RootState) => state.cart.cartItems.find((item) => item.id === id);
// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItem, minusItem,plusItem } = cartSlice.actions;

export default cartSlice.reducer;

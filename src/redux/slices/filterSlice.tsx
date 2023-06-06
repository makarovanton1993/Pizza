import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState} from '../store'

export enum StateSort {
  RATING = 'rating',
  PRICE ='price',
  NAME = 'name'
}

type SortItem = {
  name:string;
  sort:StateSort;
  order:string;
}

interface filterSliceState{
  searchValue:string;
  categoryId:number;
  currentPage:number;
  sortProperty:SortItem;
  
}

const initialState:filterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sortProperty: {
    name: 'популярности',
    sort: StateSort.RATING,
    order: 'desc',
  } ,
  
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action:PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action:PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSortType: (state, action:PayloadAction<SortItem>) => {
      state.sortProperty = action.payload;
    },
    setCurrentPage: (state, action:PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setStringQueary: (state, action:PayloadAction<filterSliceState>) => {
      state.categoryId = Number(action.payload.categoryId);
      state.sortProperty = action.payload.sortProperty;
      state.currentPage = Number(action.payload.currentPage);
    },
  },

});
export const selectFilter = (state:RootState) => state.filter;
// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType, setCurrentPage, setStringQueary, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartItemPros } from '../../components/CartItem';
import { RootState } from '../store';

// type FetchPizzasArgs = {
//   categoryId:number;
//   sortProperty:string;
//   search:string;
//   currentPage:string;
// }
type FetchPizzasArgs = {
  category:string,
  //РАЗОБРАТЬСЯ С СОРТ ПРОПЕРТИ
  sortProperty:any,
  searchValue:string,
  currentPage:number
}
export const fetchData = createAsyncThunk(
  'pizza/fetchDataStatus',
  async (params:FetchPizzasArgs) => {
    const { category, sortProperty, searchValue, currentPage } = params
    
    const { data } = await axios.get(
      `https://63051e75697408f7edc21c09.mockapi.io/ReactPizza?${category}&sortBy=${sortProperty.sort}&order=${sortProperty.order}&page=${currentPage}&limit=4`,
    );

    return data as PizzaItem[];
  },
);
//  => {
//   try {
//     const category = categoryId > 0 ? `category=${categoryId}` : '';
//     const { data } = await axios.get(
//       `https://63051e75697408f7edc21c09.mockapi.io/ReactPizza?${category}&sortBy=${sortProperty.sort}&order=${sortProperty.order}&page=${currentPage}&limit=4`,
//     );
//     dispatch(fetchPizza(data));
//     setIsLoaded(false);
//   } catch (err) {
//     console.log(err);
//   }
// };
type PizzaItem = {
  id:string,
  imageUrl:string,
  price:number,
  name:string,
  types:number[],
  sizes:number[]
  count:number,
}

enum PizzaState{
  LOADING='loading',
  ERROR = 'error',
  SUCCESFUL = 'finish'
}

interface PizzaSliceState{
  pizzas:PizzaItem[];
  loading: PizzaState;
}

const initialState:PizzaSliceState = {
  pizzas: [],
  loading: PizzaState.LOADING
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    fetchPizza: (state, action) => {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      console.log('Загрузка');
      state.loading = PizzaState.LOADING;
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      console.log('Загрузка выполнена');
      state.pizzas = action.payload;
      state.loading = PizzaState.SUCCESFUL;
    })
    builder.addCase(fetchData.rejected, (state, action) => {
      console.log('Ошибка при загрузке');
      state.loading = PizzaState.ERROR;
    })
  },
  // extraReducers: {
  //   [fetchData.pending]: (state:PizzaSliceState, action) => {
  //     console.log('Загрузка');
  //     state.loading = 'loading';
  //   },
  //   [fetchData.fulfilled]: (state:PizzaSliceState, action) => {
  //     console.log('Загрузка выполнена');
  //     state.pizzas = action.payload;
  //     state.loading = 'finish';
  //   },
  //   [fetchData.rejected]: (state:PizzaSliceState, action) => {
  //     console.log('Ошибка при загрузке');
  //     state.loading = 'error';
  //   },
  // },
});
export const selectPizzas = (state:RootState) => state.pizzas;
// Action creators are generated for each case reducer function
export const { fetchPizza } = pizzaSlice.actions;

export default pizzaSlice.reducer;

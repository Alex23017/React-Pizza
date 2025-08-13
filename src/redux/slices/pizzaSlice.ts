import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Axios from "axios";


export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, categoryParam, search, currentPage } = params;
    const { data } = await Axios.get(
      `https://684a9f71165d05c5d35998cf.mockapi.io/items?page=${currentPage}&limit=8&${categoryParam}sortBy=${sortBy}&order=${order}&${search}`,
    );
    return data;
  },
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: number;
  size: number;
  count: number;
};

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  categoryParam: string;
  search: string;
  currentPage: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

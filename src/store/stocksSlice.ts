import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Stock } from '../types';
import { iexCloudApiSlice } from './iexCloudApiSlice';
import { stockTableColumns } from '../features/Stocks/StocksTable';

const AMOUNT_PER_PAGE = 10;

type StocksState = {
  currentPage: number;
  pagesAmount: number;
  searchValue: string;
  columnsVisibility: boolean[];
  initialStocks: Stock[];
  currentStocks: Stock[];
  currentPageStocks: Stock[];
};

const initialState: StocksState = {
  currentPage: 1,
  pagesAmount: 1,
  searchValue: '',
  columnsVisibility: [],
  initialStocks: [],
  currentStocks: [],
  currentPageStocks: [],
};

export const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setPreviousPage: (state) => {
      if (state.currentPage === 1) return;

      state.currentPage = state.currentPage - 1;
      state.currentPageStocks = state.currentStocks.filter(
        (_, i) => (state.currentPage - 1) * AMOUNT_PER_PAGE <= i && i < state.currentPage * AMOUNT_PER_PAGE
      );
    },
    setNextPage: (state) => {
      if (state.currentPage === state.pagesAmount) return;

      state.currentPage = state.currentPage + 1;

      state.currentPageStocks = state.currentStocks.filter(
        (_, i) => (state.currentPage - 1) * AMOUNT_PER_PAGE <= i && i < state.currentPage * AMOUNT_PER_PAGE
      );
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      const newSearchValue = action.payload;

      const newCurrentStocks = state.initialStocks.filter((s) =>
        s.companyName.toLowerCase().includes(newSearchValue.toLowerCase())
      );

      const newPageAmount = Math.ceil(newCurrentStocks.length / AMOUNT_PER_PAGE);

      state.currentPage = 1;
      state.pagesAmount = newPageAmount === 0 ? 1 : newPageAmount;
      state.searchValue = newSearchValue;
      state.currentStocks = newCurrentStocks;
      state.currentPageStocks = newCurrentStocks.filter(
        (_, i) => (state.currentPage - 1) * AMOUNT_PER_PAGE <= i && i < state.currentPage * AMOUNT_PER_PAGE
      );
    },
    setColumns: (state, action: PayloadAction<boolean[]>) => {
      state.columnsVisibility = action.payload;
    },
    toggleColumnVisibility: (state, action: PayloadAction<{ index: number }>) => {
      const index = action.payload.index;

      state.columnsVisibility[index] = !state.columnsVisibility[index];
    },
    reorderCurrentStocks: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      const { startIndex, endIndex } = action.payload;

      const copy = [...state.currentStocks];
      const [removed] = copy.splice(startIndex, 1);
      copy.splice(endIndex, 0, removed);

      state.currentStocks = copy;
      state.currentPageStocks = copy.filter(
        (_, i) => (state.currentPage - 1) * AMOUNT_PER_PAGE <= i && i < state.currentPage * AMOUNT_PER_PAGE
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(iexCloudApiSlice.endpoints.getStockList.matchFulfilled, (state, action) => {
      const stocks = action.payload;
      console.log('action.payload =>', action.payload);
      state.initialStocks = stocks;

      if (state.columnsVisibility.length === 0 || state.columnsVisibility.some((s) => s)) {
        state.columnsVisibility = stockTableColumns.map((s) => true);
      }

      const newCurrentStocks = stocks.filter((s) =>
        s.companyName.toLowerCase().includes(state.searchValue.toLowerCase())
      );

      state.currentStocks = newCurrentStocks;
      state.pagesAmount = Math.ceil(newCurrentStocks.length / AMOUNT_PER_PAGE);
      state.currentPageStocks = newCurrentStocks.filter(
        (_, i) => (state.currentPage - 1) * AMOUNT_PER_PAGE <= i && i < state.currentPage * AMOUNT_PER_PAGE
      );
    });
  },
  selectors: {
    selectCurrentPage: (state) => state.currentPage,
    selectPagesAmount: (state) => state.pagesAmount,
    selectSearchValue: (state) => state.searchValue,
    selectColumnsVisibility: (state) => state.columnsVisibility,
    selectCurrentStocks: (state) => state.currentStocks,
    selectCurrentPageStocks: (state) => state.currentPageStocks,
    selectInitialStocks: (state) => state.initialStocks,
  },
});

export const stocksActions = stocksSlice.actions;
export const stocksSelectors = stocksSlice.selectors;
export const stocksReducer = stocksSlice.reducer;

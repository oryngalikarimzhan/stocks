import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import pick from 'lodash/pick';

import { Stock, StockKey, StockResponse } from '../types';

export const BASE_URL = 'https://cloud.iexapis.com/';
export const STOCKS_ENDPOINT = `stable/stock/market/list/mostactive?token=${process.env.REACT_APP_TOKEN}&listLimit=100`;

export const iexCloudApiSlice = createApi({
  reducerPath: 'iexCloudApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getStockList: builder.query<Stock[], void>({
      query: () => STOCKS_ENDPOINT,
      transformResponse: (responseData: StockResponse[]) => {
        const stockKeys: StockKey[] = [
          'week52High',
          'week52Low',
          'companyName',
          'symbol',
          'peRatio',
          'marketCap',
          'previousVolume',
          'previousClose',
          'latestPrice',
          'change',
          'changePercent',
          'currency',
        ];

        return responseData.map((s) => pick(s, stockKeys)) as Stock[];
      },
    }),
  }),
});

export const { useGetStockListQuery } = iexCloudApiSlice;

export type StockResponse = {
  avgTotalVolume: number;
  calculationPrice: string;
  change: number;
  changePercent: number;
  close?: null;
  closeSource: string;
  closeTime?: null;
  companyName: string;
  currency: string;
  delayedPrice?: null;
  delayedPriceTime?: null;
  extendedChange?: null;
  extendedChangePercent?: null;
  extendedPrice?: null;
  extendedPriceTime?: null;
  high?: null;
  highSource: string;
  highTime: number;
  iexAskPrice: number;
  iexAskSize: number;
  iexBidPrice: number;
  iexBidSize: number;
  iexClose: number;
  iexCloseTime: number;
  iexLastUpdated: number;
  iexMarketPercent: number;
  iexOpen: number;
  iexOpenTime: number;
  iexRealtimePrice: number;
  iexRealtimeSize: number;
  iexVolume: number;
  lastTradeTime: number;
  latestPrice: number;
  latestSource: string;
  latestTime: string;
  latestUpdate: number;
  latestVolume?: null;
  low?: null;
  lowSource: string;
  lowTime: number;
  marketCap: number;
  oddLotDelayedPrice?: null;
  oddLotDelayedPriceTime?: null;
  open?: null;
  openTime?: null;
  openSource: string;
  peRatio?: number | null;
  previousClose: number;
  previousVolume: number;
  primaryExchange: string;
  symbol: string;
  volume?: null;
  week52High: number;
  week52Low: number;
  ytdChange: number;
  isUSMarketOpen: boolean;
};

export type Stock = {
  week52High: number;
  week52Low: number;
  companyName: string;
  symbol: string;
  peRatio?: number | null;
  marketCap: number;
  previousVolume: number;
  previousClose: number;
  latestPrice: number;
  change: number;
  changePercent: number;
  currency: string;
};

export type StockKey = keyof Stock;

export type ColumnDef<T> = {
  id: T;
  header: string;
  enableHiding?: boolean;
  cell?: (props: { row: Stock }) => React.ReactElement;
};

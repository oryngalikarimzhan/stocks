import React from 'react';
import { twMerge } from 'tailwind-merge';

import { useAppSelector } from '../../store/store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderRow,
  TableRow,
} from '../../components/ui/Table';
import { stocksSelectors } from '../../store/stocksSlice';
import { ColumnDef, StockKey } from '../../types';

export const stockTableColumns: ColumnDef<StockKey>[] = [
  {
    id: 'week52High',
    header: '52W Range',
    cell: ({ row: { week52High, week52Low } }) => (
      <span>
        {week52Low} - {week52High}
      </span>
    ),
  },
  {
    id: 'companyName',
    header: 'Stock',
    enableHiding: false,
  },
  {
    id: 'symbol',
    header: 'Ticker',
  },
  {
    id: 'peRatio',
    header: 'P/E',
  },
  {
    id: 'marketCap',
    header: 'Capitalization',
    cell: ({ row: { marketCap } }) => <span>{marketCap.toLocaleString('en-US')}</span>,
  },
  {
    id: 'previousVolume',
    header: 'Volume',
    cell: ({ row: { previousVolume } }) => <span>{previousVolume.toLocaleString('en-US')}</span>,
  },
  {
    id: 'previousClose',
    header: 'Close',
  },
  {
    id: 'latestPrice',
    header: 'Open',
  },
  {
    id: 'change',
    header: 'Net. change(%)',
    cell: ({ row: { change, changePercent } }) => {
      const percentValue = (changePercent * 100).toFixed(2);

      return (
        <span className={twMerge(change >= 0 ? 'text-green-500' : 'text-red-500')}>
          {change >= 0 ? `+${change}(${percentValue}%)` : `${change}(${percentValue}%)`}
        </span>
      );
    },
  },
];

export function StocksTable() {
  const columnsVisibility = useAppSelector(stocksSelectors.selectColumnsVisibility);
  const currentPageStocks = useAppSelector(stocksSelectors.selectCurrentPageStocks);

  return (
    <Table>
      <TableHeader>
        <TableHeaderRow>
          {stockTableColumns.map(
            ({ id, header }, index) => columnsVisibility[index] && <TableHead key={id}>{header}</TableHead>
          )}
        </TableHeaderRow>
      </TableHeader>

      <TableBody>
        {currentPageStocks.length ? (
          currentPageStocks.map((s) => (
            <TableRow key={s.companyName}>
              {stockTableColumns.map(
                ({ id, cell: Cell }, index) =>
                  columnsVisibility[index] && <TableCell key={id}>{Cell ? <Cell row={s} /> : s[id]}</TableCell>
              )}
            </TableRow>
          ))
        ) : (
          <tr>
            <td className='text-center p-4' colSpan={columnsVisibility.filter((isVisible) => isVisible).length}>
              No result
            </td>
          </tr>
        )}
      </TableBody>
    </Table>
  );
}

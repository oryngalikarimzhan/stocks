import xlsx from 'json-as-xlsx';

import { Button } from '../../components/ui/Button';
import { stockTableColumns } from './StocksTable';
import { useAppSelector } from '../../store/store';
import { stocksSelectors } from '../../store/stocksSlice';

const columns = stockTableColumns.map(({ id, header }) => ({ label: header, value: id }));

export function StocksTableDownloader() {
  const stocks = useAppSelector(stocksSelectors.selectInitialStocks);

  return (
    <Button
      onClick={() => {
        const sheet = {
          sheet: 'Stocks',
          columns,
          content: stocks,
        };

        const settings = { fileName: 'Stocks' };

        xlsx([sheet], settings);
      }}
    >
      Export to Excel
    </Button>
  );
}

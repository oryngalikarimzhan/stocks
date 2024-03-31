import { StocksTable } from './StocksTable';
import { StocksTableColumnController } from './StocksTableColumnController';
import { StocksTableDownloader } from './StocksTableDownloader';
import { StocksTableFilter } from './StocksTableFilter';
import { StocksTableOrderController } from './StocksTableOrderController';
import { StocksTablePageController } from './StocksTablePageController';

export function Stocks() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-between items-center'>
        <StocksTableFilter />
        <div className='flex gap-4'>
          <StocksTableDownloader />
          <StocksTableOrderController />
          <StocksTableColumnController />
        </div>
      </div>

      <StocksTable />

      <div className='self-end'>
        <StocksTablePageController />
      </div>
    </div>
  );
}

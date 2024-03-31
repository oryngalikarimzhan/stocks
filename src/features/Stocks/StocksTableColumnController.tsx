import { Popover, PopoverTrigger, PopoverContent } from '../../components/ui/Popover';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { stocksActions, stocksSelectors } from '../../store/stocksSlice';
import { stockTableColumns } from './StocksTable';

export function StocksTableColumnController() {
  const dispatch = useAppDispatch();

  const columnsVisibility = useAppSelector(stocksSelectors.selectColumnsVisibility);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Manage columns</Button>
      </PopoverTrigger>
      <PopoverContent className='border-white rounded-md bg-prime'>
        <div className='flex flex-col gap-4'>
          {stockTableColumns.map(({ id, header, enableHiding }, index) => (
            <div key={id} className='flex items-center space-x-2'>
              <Checkbox
                id={id}
                disabled={enableHiding === false}
                checked={columnsVisibility[index]}
                onClick={() => dispatch(stocksActions.toggleColumnVisibility({ index }))}
              />
              <label
                htmlFor={id}
                className='cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                {header}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

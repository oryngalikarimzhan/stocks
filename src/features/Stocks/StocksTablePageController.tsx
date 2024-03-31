import { Button } from '../../components/ui/Button';
import { stocksActions, stocksSelectors } from '../../store/stocksSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

export function StocksTablePageController() {
  const dispatch = useAppDispatch();

  const pagesAmount = useAppSelector(stocksSelectors.selectPagesAmount);
  const currentPage = useAppSelector(stocksSelectors.selectCurrentPage);

  return (
    <div className='flex items-center gap-4'>
      <Button onClick={() => dispatch(stocksActions.setPreviousPage())}>Previous</Button>
      <div>
        {currentPage} of {pagesAmount}
      </div>
      <Button onClick={() => dispatch(stocksActions.setNextPage())}>Next</Button>
    </div>
  );
}

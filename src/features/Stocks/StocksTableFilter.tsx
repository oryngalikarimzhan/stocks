import { TextInput } from '../../components/ui/TextInput';
import { stocksActions, stocksSelectors } from '../../store/stocksSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

export function StocksTableFilter() {
  const dispatch = useAppDispatch();

  const searchValue = useAppSelector(stocksSelectors.selectSearchValue);

  return (
    <TextInput
      data-testid='search_filter'
      label='Filter Stock by name'
      className='w-96'
      value={searchValue}
      onChange={(e) => dispatch(stocksActions.setSearchValue(e.target.value))}
    />
  );
}

import React from 'react';

import { useGetStockListQuery } from './store/iexCloudApiSlice';
import { Stocks } from './features/Stocks/Stocks';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const { data: stocks, isLoading } = useGetStockListQuery();

  return (
    <main className='h-screen overflow-hidden max-w-7xl mx-auto py-20'>
      {!stocks ? (
        <div className='h-full w-full flex items-center justify-center'>
          {isLoading ? <LoadingSpinner /> : 'Something went wrong'}
        </div>
      ) : (
        <Stocks />
      )}
    </main>
  );
}

export default App;

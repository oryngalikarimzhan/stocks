import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from './testUtils';
import App from '../App';
import { BASE_URL, STOCKS_ENDPOINT } from '../store/iexCloudApiSlice';
import { stocksMock } from './stocksMock';

const server = setupServer(
  rest.get(BASE_URL + STOCKS_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json(stocksMock));
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test('fetches & receives a stocks list & shows list in table', async () => {
  renderWithProviders(<App />);

  await screen.findByText(stocksMock[0].companyName);
  await screen.findByText(stocksMock[9].companyName);
});

test('correctly filter by search value', async () => {
  renderWithProviders(<App />);

  await screen.findByText(stocksMock[0].companyName);

  fireEvent.change(screen.getByTestId('search_filter'), { target: { value: stocksMock[0].companyName } });
  expect(screen.getByText(stocksMock[0].companyName)).toBeInTheDocument();
  expect(screen.queryByText(stocksMock[1].companyName)).not.toBeInTheDocument();

  fireEvent.change(screen.getByTestId('search_filter'), { target: { value: '' } });
  expect(screen.getByText(stocksMock[1].companyName)).toBeInTheDocument();
});

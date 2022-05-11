import {
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import App from '../../App';
import { mockKitsuData, mockKitsuDataById } from '../../fixtures/mockKitsuData';

const server = setupServer(
  rest.get('https://kitsu.io/api/edge/anime', (req, res, ctx) =>
    res(ctx.json(mockKitsuData))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('renders component Main', () => {
  it('from route /, should render elements div, p, form, label, input, button, section, h2, ul, li > link', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // expect loading spinner on page load
    const loadingSpinner = screen.getByTestId('loading-spinner');
    const loading = screen.getByText(/読み込み中/i);

    // expect search form on page load
    const form = screen.getByRole('form', {
      name: /search kitsu for anime by title name or title/i,
    });
    const label = screen.getByText(/search anime:/i);
    const input = screen.getByRole('textbox');
    screen.getByRole('button', {
      name: /search/i,
    });

    waitForElementToBeRemoved(loading);
    // expect loading spinner to be removed

    await waitFor(() => {
      // expect fetched data to be displayed
      const section = screen.getByRole('region', {
        name: /container for search results/i,
      });
      const resultsHeader = screen.getByRole('heading', {
        level: 2,
      });
      const resultsList = screen.getByRole('list');
      const resultListItems = screen.getAllByRole('listitem');
      const resultLinks = screen.getAllByRole('link');
    });

    // type search input, click submit button
    userEvent.type(screen.getByRole('textbox'), 'castlevania');
    userEvent.click(
      screen.getByRole('button', {
        name: /search/i,
      })
    );

    // expect heading textContent to have search value
    screen.getByRole('heading', {
      name: /castlevania/i,
    });

    // await waitFor(() => {
    // expect loading spinner on userEvent click
    screen.getByTestId('loading-spinner');
    const reloading = screen.getByText(/読み込み中/i);
    expect(reloading).toBeInTheDocument();
    screen.debug();

    // expect loading spinner to be removed
    waitForElementToBeRemoved(reloading);
    // });

    await waitFor(() => {
      // expect fetched data to be displayed
      const section = screen.getByRole('region', {
        name: /container for search results/i,
      });
      const resultsHeader = screen.getByRole('heading', {
        level: 2,
      });
      const resultsList = screen.getByRole('list');
      const resultListItems = screen.getAllByRole('listitem');
      const resultLinks = screen.getAllByRole('link');
      // console.log(resultLinks[0]);

      server.use(
        rest.get('https://kitsu.io/api/edge/anime/482', (req, res, ctx) =>
          res(ctx.json(mockKitsuDataById))
        )
      );

      userEvent.click(resultLinks[0]);
    }, 3000);

    await waitFor(() => {
      screen.getByRole('link', {
        name: /go back/i,
      });
    });
  });
});

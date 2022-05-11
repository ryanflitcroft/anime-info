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

    // const loadingSpinner = screen.getByTestId('loading-spinner');
    // const loading = screen.getByText(/読み込み中/i);

    const form = screen.getByRole('form', {
      name: /search kitsu for anime by title name or title/i,
    });
    const label = screen.getByText(/search anime:/i);
    const input = screen.getByRole('textbox');
    screen.getByRole('button', {
      name: /search/i,
    });

    // waitForElementToBeRemoved(loading);

    await waitFor(() => {
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

    userEvent.type(screen.getByRole('textbox'), 'castlevania');
    userEvent.click(
      screen.getByRole('button', {
        name: /search/i,
      })
    );

    screen.getByRole('heading', {
      name: /castlevania/i,
    });

    // screen.getByTestId('loading-spinner');
    // const reloading = screen.getByText(/読み込み中/i);

    // waitForElementToBeRemoved(reloading);

    await waitFor(() => {
      const section = screen.getByRole('region', {
        name: /container for search results/i,
      });
      const resultsHeader = screen.getByRole('heading', {
        level: 2,
      });
      const resultsList = screen.getByRole('list');
      const resultListItems = screen.getAllByRole('listitem');
      const resultLinks = screen.getAllByRole('link');

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

  it('from route /:id, should render elements link, section, figure, h2, img, figcaption', async () => {
    render(
      <MemoryRouter initialEntries={['/', '/482']} initialIndex={1}>
        <App />
      </MemoryRouter>
    );

    server.use(
      rest.get('https://kitsu.io/api/edge/anime/482', (req, res, ctx) =>
        res(ctx.json(mockKitsuDataById))
      )
    );

    // screen.getByTestId('loading-spinner');
    // const loading = screen.getByText(/読み込み中/i);
    // waitForElementToBeRemoved(loading);

    const backButton = screen.getByRole('link', {
      name: /go back/i,
    });

    await waitFor(() => {
      const section = screen.getByRole('region', {
        name: /container for anime details/i,
      });
      const figure = screen.getByRole('figure');
      const heading = screen.getByRole('heading', {
        name: /aggretsuko/i,
      });
      const image = screen.getByRole('img', {
        name: /poster image for aggretsuko/i,
      });
      const caption = screen.getByText(
        /the series follows retsuko, a red panda office worker who unleashes her frustrations with life via death metal karaoke\./i
      );
    });

    userEvent.click(backButton);

    // screen.getByTestId('loading-spinner');
    // screen.getByText(/読み込み中/i);

    await waitFor(() => {
      screen.getByRole('region', {
        name: /container for search results/i,
      });
      screen.getByRole('heading', {
        level: 2,
      });
      screen.getByRole('list');
      screen.getAllByRole('listitem');
      screen.getAllByRole('link');
    });
  });
});

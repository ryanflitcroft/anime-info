import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockKitsuData } from './fixtures/mockKitsuData';

global.fetch = (...args) =>
  import('cross-fetch').then(({ default: fetch }) => fetch(...args));

const server = setupServer(
  rest.get('https://kitsu.io/api/edge/anime', (req, res, ctx) =>
    res(ctx.json(mockKitsuData))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

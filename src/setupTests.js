import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockKitsuData } from './fixtures/mockKitsuData';

global.fetch = (...args) =>
  import('cross-fetch').then(({ default: fetch }) => fetch(...args));
// https://kitsu.io/api/edge/anime/13529
// const server = setupServer(
//   rest.get('https://kitsu.io/api/edge/anime', (req, res, ctx) => {
//     const id = req.url.searchParams.get('id');
//     console.log('params id', id);
//     // if params has id return mockKitsuDataById
//     // else return mockKitsuData
//     return res(ctx.json(mockKitsuData));
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

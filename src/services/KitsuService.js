import { handleKitsuData } from '../utils/handleKitsuData';

const basePath = 'https://kitsu.io/api/edge/anime';

export const getKitsuData = async (query) => {
  const searchQuery = `?filter%5Btext%5D=${query}`;

  const response = await fetch(`${basePath}${searchQuery}`, {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  });

  const { data } = await response.json();

  return handleKitsuData(data);
};

export const getKitsuDataById = async (id) => {
  const response = await fetch(`${basePath}/${id}`, {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  });

  const { data } = await response.json();

  return handleKitsuData([data]);
};

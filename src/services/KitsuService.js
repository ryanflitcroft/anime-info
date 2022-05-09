export const getKitsuData = async (query) => {
  const basePath = 'https://kitsu.io/api/edge/anime';
  const searchQuery = `?filter%5Btext%5D=${query}`;

  const response = await fetch(`${basePath}${searchQuery}`, {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  });

  const { data, links } = await response.json();

  return { data, links };
};

export const getKitsuData = async (query, type = 'anime') => {
  const basePath = 'https://kitsu.io/api/edge/';
  const searchQuery = `?filter%5Btext%5D=${query}`;
  const filterQuery = `?filter%5Bcategories%5D=${query}`;

  const response = await fetch(`${basePath}${type}${filterQuery}`, {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  });

  const { data, links } = await response.json();

  return { data, links };
};

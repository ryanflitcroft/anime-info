export const handleKitsuData = (data) => {
  return data.map((i) => ({
    id: i.id,
    type: i.type,
    link: i.links.self,
    synopsis: i.attributes.synopsis,
    description: i.attributes.description,
    titles: i.attributes.titles,
    posterImage: i.attributes.posterImage.original,
    coverImage: i.attributes.coverImage.original,
    startDate: i.attributes.startDate,
    endDate: i.attributes.endDate,
  }));
};

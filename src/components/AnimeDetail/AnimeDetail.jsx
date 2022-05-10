import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getKitsuDataById } from '../../services/KitsuService';

export default function AnimeDetail() {
  const [anime, setAnime] = useState({});
  const { id } = useParams();
  console.log('params id: ', id);

  useEffect(() => {
    const getData = async () => {
      const [data] = await getKitsuDataById(id);
      setAnime(data);
    };
    getData();
  }, []);

  return (
    <>
      hellllo
      <article>
        <figure>
          <h2>
            {anime.titles?.en || anime.titles?.ja_jp || anime.titles?.en_jp}
          </h2>
          <img
            src={anime.posterImage}
            alt={`Poster image for ${
              anime.titles?.en || anime.titles?.ja_jp || anime.titles?.en_jp
            }`}
          />
          <figcaption>{anime.synopsis}</figcaption>
        </figure>
      </article>
    </>
  );
}

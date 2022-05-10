import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getKitsuDataById } from '../../services/KitsuService';

export default function AnimeDetail({ setIsLoading }) {
  const [anime, setAnime] = useState({});
  const { id } = useParams();
  const title = anime.titles?.en || anime.titles?.ja_jp || anime.titles?.en_jp;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const [data] = await getKitsuDataById(id);
      setAnime(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      <Link to="/">Go Back</Link>
      <section>
        <figure>
          <h2>{title}</h2>
          <div>
            <img src={anime.posterImage} alt={`Poster image for ${title}`} />
          </div>
          <figcaption>{anime.synopsis}</figcaption>
        </figure>
      </section>
    </>
  );
}

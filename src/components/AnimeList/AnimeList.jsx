import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import AnimeDetail from '../AnimeDetail/AnimeDetail';
import { getKitsuData } from '../../services/KitsuService';

export default function AnimeList() {
  const [animeList, setAnimeList] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const DEFAULT_QUERIES = [
    'totoro',
    'hello kitty',
    'aggretsuko',
    'castlevania',
  ];
  const RANDOM_NUMBER = Math.floor(Math.random() * DEFAULT_QUERIES.length);

  useEffect(() => {
    setSearch(DEFAULT_QUERIES[RANDOM_NUMBER]);
  }, []);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await getKitsuData(search);
      setAnimeList(data);
      setIsLoading('false');
    };
    getData();
  }, [search]);

  return (
    <>
      <SearchBar setSearch={setSearch} />
      <section>
        {animeList.map((item, i) => (
          <AnimeDetail key={`${item.id}-${i}`} item={item} />
        ))}
      </section>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { getKitsuData } from '../../services/KitsuService';
import './AnimeList.css';

export default function AnimeList({ setIsLoading }) {
  const [animeList, setAnimeList] = useState([]);
  const [search, setSearch] = useState('');
  const DEFAULT_QUERIES = ['totoro', 'aggretsuko', 'castlevania'];
  const RANDOM_NUMBER = Math.floor(Math.random() * DEFAULT_QUERIES.length);

  useEffect(() => {
    setSearch(DEFAULT_QUERIES[RANDOM_NUMBER]);
  }, []);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await getKitsuData(search);
      setAnimeList(data);
      setIsLoading(false);
    };
    getData();
  }, [search]);

  return (
    <>
      <SearchBar setSearch={setSearch} />
      <section>
        {animeList.map((item, i) => (
          <Link key={`${item.id}-${i}`} to={`${item.id}`}>
            {item.titles?.en || item.titles?.ja_jp || item.titles?.en_jp}
          </Link>
        ))}
      </section>
    </>
  );
}

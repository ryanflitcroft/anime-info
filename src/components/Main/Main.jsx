import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loading from '../Loading/Loading';
import AnimeDetail from '../AnimeDetail/AnimeDetail';
import AnimeList from '../AnimeList/AnimeList';

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <main>
        {isLoading && <Loading />}
        <Switch>
          <Route path="/:id">
            <AnimeDetail isLoading={isLoading} setIsLoading={setIsLoading} />
          </Route>
          <Route path="/">
            <AnimeList isLoading={isLoading} setIsLoading={setIsLoading} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

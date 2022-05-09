import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AnimeDetail from '../AnimeDetail/AnimeDetail';
import AnimeList from '../AnimeList/AnimeList';

export default function Main() {
  return (
    <>
      <main>
        <Switch>
          <Route path="/">
            <AnimeList />
          </Route>
          <Route path="/:id">
            <AnimeDetail />
          </Route>
        </Switch>
      </main>
    </>
  );
}

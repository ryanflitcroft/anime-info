import React from 'react';
import Styles from './Loading.css';

export default function Loading() {
  return (
    <>
      <div data-testid="loading-spinner" className={Styles.loading}></div>
      <p>読み込み中</p>
    </>
  );
}

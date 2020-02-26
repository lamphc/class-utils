import React, { Component } from 'react';

import css from './index.module.css'
import Header from '../../components/Header';

class Song extends Component {
  render() {
    return (
      <div className={css.song}>
        <Header title="点歌台" pos={css.fixed} />
        <iframe id={css.sync} src="https://music.tql.ink" />
        <a className={css.gh} target="_blank" href="https://github.com/kasuganosoras/SyncMusic">GitHub-Syncm</a>
      </div>
    );
  }
}

export default Song;
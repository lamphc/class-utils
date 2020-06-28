import React, { Component } from 'react'

import css from './index.module.css'
import Header from '../../components/Header'

class Song extends Component {
  state = {
    url: localStorage.getItem('g-url') || 'http://music.alang.run'
  }
  render () {
    return (
      <div className={css.song}>
        <Header title="点歌台" pos={css.fixed} />
        <iframe title="games" id={css.sync} src={this.state.url} />
        <a className={css.gh} rel="noopener noreferrer" target="_blank" href="https://github.com/kasuganosoras/SyncMusic">GitHub-Syncm</a>
      </div>
    )
  }
}

export default Song
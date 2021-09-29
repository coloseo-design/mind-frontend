import React, { memo } from 'react';
import Header from './components/header/index';
import Board from './components/board/index';
import './styles/index.less';

// eslint-disable-next-line react/display-name
const Home = memo(() => (
  <div className="page-home">
    <Header className="page-home_header header-wrapper" />
    <Board />
  </div>
));

export default Home;

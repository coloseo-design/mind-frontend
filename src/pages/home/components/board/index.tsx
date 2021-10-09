/* eslint-disable global-require */
import React from 'react';
import Menus from './menus';
import Workspace from './workspace';
import './styles/index.less';

const Board = () => (
  <div className="mind-board">
    <Menus title="未命名思维导图" />
    <Workspace />
  </div>
);

export default Board;

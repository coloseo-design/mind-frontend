/* eslint-disable global-require */
import React from 'react';
import './styles/index.less';

const Board = () => (
  <div className="mind-board">
    <div className="menus">
      <div className="left-menus menus-body">
        <div className="back menu">
          <img src={require('./images/back.svg')} alt="" />
        </div>
        <div className="title">未命名思维导图</div>
      </div>
      <div className="center-menus menus-body">
        <div className="menu">
          <img src={require('./images/redo_left.svg')} alt="后退" title="后退" />
        </div>
        <div className="menu">
          <img src={require('./images/redo_right.svg')} alt="前进" title="前进" />
        </div>
        <div className="menu">
          <img src={require('./images/brush.svg')} alt="格式刷" title="格式刷" />
        </div>
        <div className="menu">
          <img src={require('./images/connect_up.svg')} alt="关系链接" title="关系链接" />
        </div>
        <div className="menu">
          <img src={require('./images/vector.svg')} alt="样式选择" title="样式选择" />
        </div>
        <div className="menu">
          <img src={require('./images/color_palette.svg')} alt="背景色" title="背景色" />
        </div>
      </div>
      <div className="right-menus menus-body">
        <div className="menu">
          <img src={require('./images/trash.svg')} alt="删除" title="删除" />
        </div>
        <div className="menu">
          <img src={require('./images/download.svg')} alt="下载" title="下载" />
        </div>
        <div className="menu">
          <img src={require('./images/save.svg')} alt="保存" title="保存" />
        </div>
        <div className="menu">
          <img src={require('./images/share.svg')} alt="分享" title="分享" />
        </div>
      </div>
    </div>
  </div>
);

export default Board;

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable global-require */
import classNames from 'classnames';
import React, { useState } from 'react';
import './styles/index.less';

type HeaderProps = React.HtmlHTMLAttributes<HTMLDivElement>;

const Header: React.FC<HeaderProps> = ({ className }: HeaderProps) => {
  const tabs = ['文档', '技术支持', '产品列表', '联系我们'];
  const [currentTab, $currentTab] = useState('文档');
  const bodyClassNames = classNames('body', className);
  return (
    <header className="m-header">
      <div className={bodyClassNames}>
        <div className="logo">OpenMind</div>
        <div className="menus">
          {tabs.map((item) => (
            <div key={item} className={`menu ${currentTab === item ? 'currentTab' : ''}`} onClick={() => $currentTab(item)}>{item}</div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;

/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames';
import React, { useCallback, useState, useEffect } from 'react';
import { TopicProps } from './MindNode';
import Modal from './modal';
import './styles/right-menu.less';

const Topic: React.FC<TopicProps> = ({
  data = { title: '未定义标题' },
  onInsert,
  onCopy,
  onDelete,
  position = { x: 1110, y: 1156 },
}: TopicProps) => {
  const [topic, setTopic] = useState(() => data.title || '未定义标题');
  const [topic2, setTopic2] = useState(() => data.title || '未定义标题');
  const [editable, setEditable] = useState(false);
  const ref = React.useRef(null);
  const [contextVisible, setContextVisible] = useState(false);
  /**
   * 用来标记右键点击的位置
   */
  const [contextPosition, setContextPosition] = useState({
    left: 0,
    top: 0,
  });

  const onChange = useCallback((evt) => {
    const content = evt.target.innerText;
    setTopic(content);
  }, []);

  const onBlur = useCallback((evt) => {
    const content = evt.target.innerText;
    setTopic(content);
    setEditable(false);
  }, []);

  const onEditable = useCallback(() => {
    setEditable(true);
    setTopic2(topic);
  }, [topic]);

  const editAreaCls = classNames('edit-area', {
    visible: editable,
  });

  // 实现鼠标右键
  const onContextMenu = useCallback((evt) => {
    evt.preventDefault();
    setContextVisible(true);
    // console.log('evt', evt);
    // const {
    //   top, left, height, width,
    // } = evt.target.getBoundingClientRect();
    // const { pageXOffset, pageYOffset } = window;
    // const targetX = pageXOffset + left + width / 2;
    // const targetY = pageYOffset + top + height / 2;
    // const targetX = position.x;
    // const targetY = position.y;
    // console.log('targetx', targetX, targetY);
    // setCenter({
    //   x: targetX,
    //   y: targetY,
    // });
    setContextPosition({
      left: evt.pageX,
      top: evt.pageY,
    });
  }, []);

  useEffect(() => {
    const handler = () => {
      setContextVisible(false);
    };
    document.addEventListener('click', handler, false);
    return () => {
      document.removeEventListener('click', handler, false);
    };
  }, []);

  const onContextMenuClick = useCallback((evt) => {
    setContextVisible(false);
    const { key } = evt.target.dataset;
    const handlers = {
      insert: onInsert,
      delete: onDelete,
      copy: onCopy,
    };
    handlers[key] && handlers[key](position, data);
  }, [data, onCopy, onDelete, onInsert, position]);

  const events = [
    {
      key: 'insert',
      name: '插入子主题',
    },
    {
      key: 'copy',
      name: '复制',
    },
    {
      key: 'delete',
      name: '删除',
    },
  ];

  return (
    <div
      className="topic"
      onContextMenu={onContextMenu}
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <div>
        <div className="title" onDoubleClick={onEditable}>{topic}</div>
        <div
          className={editAreaCls}
          contentEditable={editable}
          onBlur={onBlur}
          ref={ref}
          onInput={onChange}
        >
          {topic2}
        </div>
      </div>
      <Modal>
        {
          contextVisible && (
            <div
              className="g-right-menus"
              style={{
                top: contextPosition.top,
                left: contextPosition.left,
              }}
            >
              <ul className="body">
                {
                  events.map((event) => (
                    <li className="item" key={event.key}>
                      <a onClick={onContextMenuClick} data-key={event.key}>{event.name}</a>
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </Modal>
    </div>
  );
};

export default Topic;

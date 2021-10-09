/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames';
import React, { useCallback, useState, useEffect } from 'react';
import Modal from './modal';
import './styles/right-menu.less';

interface TopicProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title: string | null;
  onInsert: () => void;
  onDelete: () => void;
  onCopy: () => void;
}

const Topic: React.FC<TopicProps> = ({
  title, onInsert, onCopy, onDelete,
}: TopicProps) => {
  const [topic, setTopic] = useState(() => title || '未定义标题');
  const [topic2, setTopic2] = useState(() => title || '未定义标题');
  const [editable, setEditable] = useState(false);
  const ref = React.useRef(null);
  const [contextVisible, setContextVisible] = useState(false);
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
    handlers[key] && handlers[key]();
  }, [onCopy, onDelete, onInsert]);

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
        top: 1110,
        left: 1156,
      }}
    >
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

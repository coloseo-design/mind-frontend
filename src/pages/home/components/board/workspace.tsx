import React, { useCallback, useState } from 'react';
import { MindNode } from './MindNode';
import './styles/workspace.less';
import Topic from './topic';
import getLocation from './location';

const Workspace: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = () => {
  const [topics, setTopics] = useState<Array<MindNode>>([
    {
      data: {
        title: '未定义标题',
        isRoot: true,
      },
      position: { x: 800, y: 800 },
      childNodes: [],
    },
  ]);

  const onInsert = useCallback((position, data) => {
    const [first] = topics;
    const child = {
      data: {
        title: '未定义子主题',
        isRoot: false,
      },
      position,
      childNodes: [],
    };
    const childNodes = [...first.childNodes, child];
    const { length } = childNodes;
    const transformedChildNodes = childNodes.map((item, index) => {
      const pos = getLocation(position, (index + 1) / length, 500);
      return {
        ...item,
        position: pos,
      };
    });
    first.childNodes = transformedChildNodes;
    setTopics([first, ...transformedChildNodes]);
  }, [topics]);

  return (
    <div className="workspace">
      <div className="mind-container" style={{ width: 2000, height: 2000 }}>
        {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" xlink="http://www.w3.org/1999/xlink" >
          <path d="M100 190 C 200 200, 250 250, 300 300" fill="white" stroke="black" strokeWidth="3" />
        </svg> */}
        {
          topics.map((topic) => (
            <Topic
              key={topic.data.title}
              position={topic.position}
              data={topic.data}
              onDelete={() => console.log('click')}
              onInsert={onInsert}
              onCopy={() => console.log('copy')}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Workspace;

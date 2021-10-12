import React, { useCallback, useState } from 'react';
import { MindData, MindNode, Position } from './MindNode';
import './styles/workspace.less';
import Topic from './topic';
import getLocation from './location';

const Workspace: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = () => {
  const [topics, setTopics] = useState<Array<MindData>>([
    {
      title: '未定义标题',
      isRoot: true,
      position: { x: 800, y: 800 },
      size: {
        width: 122,
        height: 44,
      },
      childNodes: [],
    },
  ]);

  const [lines, setLines] = useState<Array<Array<Position>>>([]);

  const onInsert = useCallback((evt, data) => {
    const {
      position, childNodes,
      size,
    } = data;
    let pos: Position;
    if (childNodes.length < 6) {
      const { length } = childNodes;
      pos = getLocation(position, ((length - 1) * 60) / 360, 500);
    }
    const child: MindData = {
      title: '未定义子主题',
      isRoot: false,
      position: pos,
      childNodes: [],
      size: { width: 0, height: 0 },
    };
    setLines([...lines, [
      {
        x: position.x,
        y: position.y,
      },
      {
        x: pos.x,
        y: pos.y,
      },
    ]]);
    Object.assign(data, {
      childNodes: [...childNodes, child],
    });
    setTopics([...topics, child]);
  }, [lines, topics]);
  console.log('lines', lines);
  return (
    <div className="workspace">
      <div className="mind-container" style={{ width: 2000, height: 2000 }}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" xlink="http://www.w3.org/1999/xlink" >
          {
            lines.map((line) => {
              let d = `M${line[0].x} ${line[0].y}`;
              d += `,L${line[1].x} ${line[1].y}`;
              return (
                <path d={d} fill="white" stroke="#f73131" strokeWidth="1" />
              );
            })
          }
        </svg>
        {
          topics.map((topic) => (
            <Topic
              key={topic.title}
              data={topic}
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

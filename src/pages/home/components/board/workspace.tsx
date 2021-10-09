import React, { useCallback, useState } from 'react';
import './styles/workspace.less';
import Topic from './topic';

const Workspace: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = () => {
  const [topics, setTopics] = useState(['未定义标题']);

  const onInsert = useCallback(() => {
    topics.push('未定义子主题');
    setTopics([...topics]);
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
              key={topic}
              title={topic}
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

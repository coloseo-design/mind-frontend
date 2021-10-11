interface NodeData {
  title: string;
}

/**
 * 记录当前节点的位置
 */
export interface Position {
  x: number;
  y: number;
}

export interface MindNode {
  /**
   * 标题
   */
  data: NodeData;
  /**
   * 节点位置
   */
  position: Position;
  /**
   * 子节点
   */
  childNodes?: Array<MindNode>;
}

export interface TopicProps extends MindNode, Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'title'> {
  onInsert: () => void;
  onDelete: () => void;
  onCopy: () => void;
}
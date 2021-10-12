/**
 * 记录当前节点的位置
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * 记录当前节点尺寸
 */
export interface Size {
  width: number;
  height: number;
}

export interface MindData {
  /**
   * 是否为根节点
   */
  isRoot: boolean;
  /**
   * 标题
   */
   title: string;
  /**
   * 记录节点位置信息
   */
  position: Position;
  /**
   * 记录当前节点尺寸信息，用来调整布局
   */
  size: Size;
  childNodes?: Array<MindNode>;
}

export interface MindNode {
  data: MindData;
}

export interface TopicProps extends MindNode, Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'title'> {
  onInsert: (evt, data: MindData) => void;
  onDelete: () => void;
  onCopy: () => void;
}

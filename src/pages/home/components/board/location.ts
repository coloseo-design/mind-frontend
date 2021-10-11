// 根据起点坐标画一个扇形

import { Position } from './MindNode';

/**
 *
 * @param position 圆心位置
 * @param rate 角度 / 360
 * @param redius 半径
 * @returns 返回调整后的位置
 */
export default function getLocation(position: Position, rate: number, redius: number) {
  const rad = (2 * Math.PI) * rate;
  const y = Math.sin(rad) * redius;
  const x = Math.cos(rad) * redius;
  return {
    x: x + position.x,
    y: y + position.y,
  };
}

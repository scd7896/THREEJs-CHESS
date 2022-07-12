import { Vector2, Vector3 } from "three";
import { Position } from "../types";

export function angleBetween(a: Vector2, b: Vector2) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.atan2(dy, dx);
}

export function calculateVectorPosition(position: Position) {
  const oneCellSize = 8;
  const defaultCell = -28;
  const [row, col] = position;

  return new Vector3(defaultCell + col * oneCellSize, 0, defaultCell + row * oneCellSize);
}

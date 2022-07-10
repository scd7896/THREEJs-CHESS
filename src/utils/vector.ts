import { Vector2 } from "three";

export function angleBetween(a: Vector2, b: Vector2) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.atan2(dy, dx);
}

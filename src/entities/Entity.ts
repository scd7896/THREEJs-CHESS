export default abstract class Entity {
  abstract start(): void;

  abstract update(delta: number): void;
}

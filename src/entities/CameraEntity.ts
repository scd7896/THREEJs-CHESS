import ChessSystem from "../system/ChessSystem";
import Entity from "./Entity";

class CameraEntity extends Entity<ChessSystem> {
  private _tick: number;

  start(): void {}

  update(time: number): void {
    this._tick = (this._tick + time / 10) % 360;
    const pi = (this._tick / 180) * Math.PI;
    const z = this._getCameraZ(pi);
    const x = this._getCameraX(z);
    const isReverse = this._tick >= 180 && this._tick <= 360;
    this.system.camera.position.set(isReverse ? -1 * x : x, this.system.camera.position.y, z);
    this.system.camera.lookAt(0, 0, 0);
  }

  constructor(system: ChessSystem) {
    super(system);
    this._tick = 0;
  }

  private _getCameraZ(pi: number) {
    return 40 * Math.cos(pi);
  }

  private _getCameraX(z: number) {
    const radius = 40;

    return Math.sqrt(Math.abs(Math.pow(radius, 2) - Math.pow(z, 2)));
  }
}

export default CameraEntity;

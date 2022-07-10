import ChessSystem from "../system/ChessSystem";
import { Team } from "../types";
import Entity from "./Entity";

class CameraEntity extends Entity<ChessSystem> {
  private _tick: number;
  private _isRoation: boolean;
  private _turn: Team;

  start(): void {}

  update(time: number): void {
    if (this._isRoation) this.rotationCamera(time);
  }

  rotationCamera(time: number) {
    this._tick = (this._tick + time / 10) % 360;
    const pi = (this._tick / 180) * Math.PI;
    const z = this._getCameraZ(pi);
    const x = this._getCameraX(z);

    const isReverse = this._tick >= 180 && this._tick <= 360;
    this.system.camera.position.set(isReverse ? -1 * x : x, this.system.camera.position.y, z);
    this.system.camera.lookAt(0, 0, 0);
    this._checkRotation(this._tick);
  }

  changeTurn() {
    if (this._turn === "white") this._turn = "black";
    else if (this._turn === "black") this._turn = "white";
    this._isRoation = true;
  }

  constructor(system: ChessSystem) {
    super(system);
    this._tick = 0;
    this._isRoation = false;
    this._turn = "white";
  }

  private _checkRotation(tick: number) {
    if (this._turn === "white") {
      if (Math.abs(tick - 0) < 5 || Math.abs(tick - 360) < 5) {
        this._isRoation = false;
        this.system.camera.position.set(0, this.system.camera.position.y, 40);
        this.system.camera.lookAt(0, 0, 0);
      }
    }

    if (this._turn === "black") {
      if (Math.abs(tick - 180) < 5) {
        this._isRoation = false;
        this.system.camera.position.set(0, this.system.camera.position.y, -40);
        this.system.camera.lookAt(0, 0, 0);
      }
    }
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

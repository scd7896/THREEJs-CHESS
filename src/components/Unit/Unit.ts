import { Vector2, Vector3 } from "three";
import ChessSystem from "../../system/ChessSystem";
import { Position, Team, UnitType } from "../../types";
import { angleBetween, calculateVectorPosition } from "../../utils/vector";

export default abstract class Unit {
  private _team: Team;
  private _type: UnitType;
  private _position: Position;
  private _system: ChessSystem;
  private _movePath: Position[] = [];
  private _nextPosition: Position | undefined;

  public _vector: Vector3 | undefined;
  public _nextVector: Vector3 | undefined;

  constructor(team: Team, type: UnitType, defaultPosition: Position, system: ChessSystem) {
    this._team = team;
    this._type = type;
    this._position = defaultPosition;
    this._system = system;
  }

  public get system() {
    return this._system;
  }

  get movePath() {
    return this._movePath;
  }

  get nextMovePath() {
    return this._nextPosition;
  }

  public get position() {
    return this._position;
  }

  public set position(position: Position) {
    this._position = position;
  }

  public get team() {
    return this._team;
  }

  public get type() {
    return this._type;
  }

  move(position: Position) {
    this._position = position;
  }

  update(delta: number): void {
    if (this.nextMovePath) {
      if (this._vector && this._nextVector) {
        if (this._vector === undefined || this._nextVector === undefined) return;

        const thisVector2 = new Vector2(this._vector.x, this._vector.z);
        const nextVector2 = new Vector2(this._nextVector.x, this._nextVector.z);
        const angle = angleBetween(thisVector2, nextVector2);
        this._vector.setX(this._vector.x + Math.cos(angle) * (delta / 10));
        this._vector.setZ(this._vector.z + Math.sin(angle) * (delta / 10));
        if (this._vector.distanceTo(this._nextVector) < 5) {
          this._vector.setX(this._nextVector.x);
          this._vector.setZ(this._nextVector.z);
          this.getNextMovePath();
        }
      }
      return;
    }

    if (this.movePath.length > 0) {
      this.getNextMovePath();
    }
  }

  pushMovePath(position: Position) {
    this._movePath.push(position);
  }

  getNextMovePath() {
    this._nextPosition = this._movePath.shift();
    if (this._nextPosition) {
      this._nextVector = calculateVectorPosition(this._nextPosition);
    }
    if (this._nextPosition === undefined) {
      this.system.finishMove();
      this._nextVector = undefined;
    }
  }

  getCanIsMove(position: Position) {
    if (position[0] < 0 || position[0] >= 8) return false;
    if (position[1] < 0 || position[1] >= 8) return false;

    const unit = this.system.getUnitByPosition(position)[0];
    if (!unit) return true;
    if (unit.team === this.team) return false;
    return true;
  }

  abstract getCanMovePositions(): Position[];
}

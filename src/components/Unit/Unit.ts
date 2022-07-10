import ChessSystem from "../../system/ChessSystem";
import { Position, Team, UnitType } from "../../types";

export default abstract class Unit {
  private _team: Team;
  private _type: UnitType;
  private _position: Position;
  private _system: ChessSystem;

  constructor(team: Team, type: UnitType, defaultPosition: Position, system: ChessSystem) {
    this._team = team;
    this._type = type;
    this._position = defaultPosition;
    this._system = system;
  }

  public get system() {
    return this._system;
  }

  public get position() {
    return this._position;
  }

  public get team() {
    return this._team;
  }

  public get type() {
    return this._type;
  }

  attack(unit: Unit) {
    unit.remove();
  }

  abstract getCanMovePositions(): Position[];

  abstract remove(): void;
}

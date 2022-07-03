import { Position, Team, UnitType } from "../../types";

export default abstract class Unit {
  private _team: Team;
  private _type: UnitType;
  private _position: Position;

  constructor(team: Team, type: UnitType, defaultPosition: Position) {
    this._team = team;
    this._type = type;
    this._position = defaultPosition;
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

  abstract getCanMovePosition(): Position;

  abstract remove(): void;
}

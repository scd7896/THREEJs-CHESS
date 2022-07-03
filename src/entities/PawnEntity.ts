import Pawn from "../components/Unit/Pawn";
import ChessSystem from "../system/ChessSystem";
import { IChess, Position, Team, UnitType } from "../types";
import Entity from "./Entity";

export default class PawnEntity extends Entity {
  private _unitComponent: Pawn;

  start(): void {
    throw new Error("Method not implemented.");
  }

  update(delta: number): void {
    throw new Error("Method not implemented.");
  }

  constructor({ team, position }: IChess, system: ChessSystem) {
    super();
    this._unitComponent = new Pawn(team, position);
  }
}

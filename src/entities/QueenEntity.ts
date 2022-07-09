import Pawn from "../components/Unit/Pawn";
import ChessSystem from "../system/ChessSystem";
import { IChess } from "../types";
import { ChessUnitEntity } from "./Entity";

export default class QueenEntity extends ChessUnitEntity {
  private _unitComponent: Pawn;

  start(): void {
    this.loadUnit();
  }

  update(delta: number): void {
    // throw new Error("Method not implemented.");
  }

  constructor(chess: IChess, system: ChessSystem) {
    super(chess, system);
    this._unitComponent = new Pawn(chess.team, chess.position);
  }
}

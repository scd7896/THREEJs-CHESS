import Pawn from "../../components/Unit/Pawn";
import ChessSystem from "../../system/ChessSystem";
import { IChess, Position } from "../../types";
import { ChessUnitEntity } from "../Entity";

class BishopEntity extends ChessUnitEntity {
  move(position: Position): void {
    throw new Error("Method not implemented.");
  }
  select(): void {
    // throw new Error("Method not implemented.");
  }

  start(): void {
    this.loadUnit();
  }
  update(delta: number): void {
    // throw new Error("Method not implemented.");
  }

  constructor(chess: IChess, system: ChessSystem) {
    super(chess, system);
    this._unitComponent = new Pawn(chess.team, chess.position, system);
  }
}

export default BishopEntity;

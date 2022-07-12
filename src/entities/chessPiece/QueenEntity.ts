import Queen from "../../components/Unit/Queen";
import ChessSystem from "../../system/ChessSystem";
import { IChess } from "../../types";
import { ChessUnitEntity } from "../Entity";

export default class QueenEntity extends ChessUnitEntity {
  constructor(chess: IChess, system: ChessSystem) {
    super(chess, system);
    this._unitComponent = new Queen(chess.team, chess.position, system);
  }
}

import Rook from "../../components/Unit/Rook";
import ChessSystem from "../../system/ChessSystem";
import { IChess } from "../../types";
import { ChessUnitEntity } from "../Entity";

class RookEntity extends ChessUnitEntity {
  constructor(chess: IChess, system: ChessSystem) {
    super(chess, system);
    this._unitComponent = new Rook(chess.team, chess.position, system);
  }
}

export default RookEntity;

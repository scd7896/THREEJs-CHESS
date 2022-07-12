import Knight from "../../components/Unit/Knight";
import ChessSystem from "../../system/ChessSystem";
import { IChess } from "../../types";
import { ChessUnitEntity } from "../Entity";

class KnightEntity extends ChessUnitEntity {
  constructor(chess: IChess, system: ChessSystem) {
    super(chess, system);
    this._unitComponent = new Knight(chess.team, chess.position, system);
  }
}

export default KnightEntity;

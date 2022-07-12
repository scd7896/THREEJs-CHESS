import Bishop from "../../components/Unit/Bishop";
import ChessSystem from "../../system/ChessSystem";
import { IChess } from "../../types";
import { ChessUnitEntity } from "../Entity";

class BishopEntity extends ChessUnitEntity {
  constructor(chess: IChess, system: ChessSystem) {
    super(chess, system);
    this._unitComponent = new Bishop(chess.team, chess.position, system);
  }
}

export default BishopEntity;

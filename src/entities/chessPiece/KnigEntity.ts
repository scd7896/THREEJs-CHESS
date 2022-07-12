import King from "../../components/Unit/King";
import ChessSystem from "../../system/ChessSystem";
import { IChess } from "../../types";
import { ChessUnitEntity } from "../Entity";

class KingEntity extends ChessUnitEntity {
  constructor(chess: IChess, system: ChessSystem) {
    super(chess, system);
    this._unitComponent = new King(chess.team, chess.position, system);
  }
}

export default KingEntity;

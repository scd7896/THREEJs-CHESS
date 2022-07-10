import Pawn from "../../components/Unit/Pawn";
import ChessSystem from "../../system/ChessSystem";
import { IChess } from "../../types";
import { ChessUnitEntity } from "../Entity";

export default class PawnEntity extends ChessUnitEntity {
  select(): void {
    const positions = this._unitComponent.getCanMovePositions();
    const board = this.system.getBoardEntity();
    board.setCanMovePositions(positions);
  }

  private _unitComponent: Pawn;

  start(): void {
    this.loadUnit();
  }

  update(delta: number): void {}

  constructor(chess: IChess, system: ChessSystem) {
    super(chess, system);
    this._unitComponent = new Pawn(chess.team, chess.position, system);
  }
}

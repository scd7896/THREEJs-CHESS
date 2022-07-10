import Pawn from "../../components/Unit/Pawn";
import ChessSystem from "../../system/ChessSystem";
import { IChess, Position } from "../../types";

import { ChessUnitEntity } from "../Entity";

export default class PawnEntity extends ChessUnitEntity {
  move(position: Position): void {
    this._unitComponent.position = position;
    this.pushMovePath(position);
    this._unitComponent.move(position);
  }

  select(): void {
    const positions = this._unitComponent.getCanMovePositions();
    console.log(positions);
    const board = this.system.getBoardEntity();
    board.setCanMovePositions(positions);
  }

  start(): void {
    this.loadUnit();
  }

  update(delta: number): void {
    if (this.nextMovePath) {
      this._unitComponent.update(delta);
      if (this._unitComponent._vector && this._unitComponent._nextVector) {
        if (this._unitComponent._vector.distanceTo(this._unitComponent._nextVector) < 5) {
          this._unitComponent._vector.setX(this._unitComponent._nextVector.x);
          this._unitComponent._vector.setZ(this._unitComponent._nextVector.z);
          this.getNextMovePath();
        }
      }
      return;
    }

    if (this.movePath.length > 0) {
      this.getNextMovePath();
    }
  }

  constructor(chess: IChess, system: ChessSystem) {
    super(chess, system);
    this._unitComponent = new Pawn(chess.team, chess.position, system);
  }
}

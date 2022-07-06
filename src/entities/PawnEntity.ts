import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";
import Pawn from "../components/Unit/Pawn";
import ChessSystem from "../system/ChessSystem";
import { IChess, Position, Team, UnitType } from "../types";
import Entity, { ChessUnitEntity } from "./Entity";

export default class PawnEntity extends ChessUnitEntity {
  private _unitComponent: Pawn;

  start(): void {
    const boxGeo = new BoxGeometry(4, 6, 4);
    const material = new MeshStandardMaterial({
      color: this.team === "white" ? "#dfdfdf" : "#964b00",
    });

    const box = new Mesh(boxGeo, material);
    const vector3 = this.getVectorByPosition();
    box.position.set(vector3.x, vector3.y, vector3.z);
    this.system.scene.add(box);
  }

  update(delta: number): void {
    // throw new Error("Method not implemented.");
  }

  constructor(chess: IChess, system: ChessSystem) {
    super(chess, system);
    this._unitComponent = new Pawn(chess.team, chess.position);
  }
}

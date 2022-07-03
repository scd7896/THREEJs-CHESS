import { AmbientLight, BoxGeometry, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Position } from "../types";
import { defaultChessUnits } from "../utils/constract";
import System from "./System";

export default class ChessSystem extends System {
  constructor() {
    super();
    this.start();
  }

  update(time: number): void {}

  private _initChessBoard() {
    // defaultChessUnits.map();
  }

  start() {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshStandardMaterial({ color: 0x00ff00 });

    const mesh = new Mesh(geometry, material);
    mesh.position.set(0, 0, 0);

    this.scene.add(mesh);

    this._initChessBoard();
  }

  getUnitByPosition(position: Position) {}
}

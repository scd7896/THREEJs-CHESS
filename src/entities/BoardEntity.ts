import { Mesh, MeshStandardMaterial, PlaneGeometry, TextureLoader } from "three";
import { degToRad } from "three/src/math/MathUtils";
import ChessSystem from "../system/ChessSystem";
import { Position } from "../types";
import { calculateVectorPosition } from "../utils/vector";
import Entity from "./Entity";

export default class BoardEntity extends Entity<ChessSystem> {
  private _canMovePositions: Position[] = [];
  private _canMovePositionsMesh: Mesh[] = [];

  get canMovePositionsMesh() {
    return this._canMovePositionsMesh;
  }

  constructor(system: ChessSystem) {
    super(system);
  }

  start(): void {
    const textureLoader = new TextureLoader();
    const map = textureLoader.load("/public/texture/board_texture.jpg");
    const planeGeometry = new PlaneGeometry(64, 64);
    const material = new MeshStandardMaterial({
      map,
    });

    const ground = new Mesh(planeGeometry, material);
    ground.rotation.x = degToRad(-90);
    this.system.scene.add(ground);
  }

  update(delta: number): void {}

  setCanMovePositions(position: Position[]) {
    this._canMovePositionsMesh.map((it) => this.system.scene.remove(it));
    this._canMovePositions = position;

    this._canMovePositionsMesh = this._canMovePositions.map((it) => {
      const vector = calculateVectorPosition(it);
      const planeGeometry = new PlaneGeometry(7, 7);

      const material = new MeshStandardMaterial({
        color: 0xffff00,
      });
      const mesh = new Mesh(planeGeometry, material);
      mesh.rotation.x = degToRad(-90);
      mesh.position.set(vector.x, 0.5, vector.z);
      mesh.name = `position/${it[0]}/${it[1]}`;
      this.system.scene.add(mesh);
      return mesh;
    });
  }
}

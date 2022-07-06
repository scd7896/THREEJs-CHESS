import { Mesh, MeshStandardMaterial, PlaneGeometry, TextureLoader } from "three";
import { degToRad } from "three/src/math/MathUtils";
import ChessSystem from "../system/ChessSystem";
import Entity from "./Entity";

export default class BoardEntity extends Entity<ChessSystem> {
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
}

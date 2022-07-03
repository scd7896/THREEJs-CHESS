import { WebGLRenderer } from "three";
import "./style.css";
import ChessSystem from "./system/ChessSystem";

class Application {
  constructor() {
    this.startSystem();
  }

  startSystem() {
    const chessSyatem = new ChessSystem();
  }
}

window.addEventListener("load", () => {
  new Application();
});

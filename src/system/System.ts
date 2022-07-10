import { AmbientLight, Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";

export default abstract class System {
  private _scene!: Scene;
  private _camera!: PerspectiveCamera;
  private _light!: AmbientLight;
  private _container: HTMLElement;
  private _renderer: WebGLRenderer;
  private _clock: Clock;

  constructor() {
    const appContainer = document.querySelector("#app") as HTMLElement;
    this._container = appContainer;

    const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    this._renderer = renderer;
    renderer.setPixelRatio(window.devicePixelRatio);
    appContainer?.appendChild(renderer.domElement);

    this._scene = new Scene();

    this._setupLight();
    this._setCamera();

    window.onresize = this.resize.bind(this);
    this.resize();
    this._clock = new Clock();

    requestAnimationFrame(this.render.bind(this));
  }

  get scene() {
    return this._scene;
  }

  get camera() {
    return this._camera;
  }

  protected resize() {
    const width = this._container.clientWidth;
    const height = this._container.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }

  protected _setCamera() {
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 40, 40);
    camera.lookAt(0, 0, 0);
    this._camera = camera;
    this._scene.add(camera);
  }

  protected _setupLight() {
    const ambientLight = new AmbientLight(0xffffff, 1);
    this._scene.add(ambientLight);
  }

  render() {
    const time = this._clock.getDelta();
    this._renderer.render(this._scene, this._camera);
    this.update(time * 1000);
    requestAnimationFrame(this.render.bind(this));
  }

  abstract update(time: number): void;
}

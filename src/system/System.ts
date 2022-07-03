import { AmbientLight, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from "three";

export default abstract class System {
  private _scene!: Scene;
  private _camera!: PerspectiveCamera;
  private _light!: AmbientLight;
  private _container: HTMLElement;
  private _renderer: WebGLRenderer;

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

    requestAnimationFrame(this.render.bind(this));
  }

  get scene() {
    return this._scene;
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
    camera.position.set(7, 7, 0);
    camera.lookAt(0, 0, 0);
    this._camera = camera;
    this._scene.add(camera);
  }

  protected _setupLight() {
    const ambientLight = new AmbientLight(0xffffff, 1);
    this._scene.add(ambientLight);

    // const color = 0xffffff;
    // const intensity = 1;
    // const light = new DirectionalLight(color, intensity);
    // light.position.set(-1, 2, 4);
    // this._scene.add(light);
    // this._camera.add(light);
  }

  render(time: number) {
    this._renderer.render(this._scene, this._camera);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  abstract update(time: number): void;
}

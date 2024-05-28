import { World } from "miniplex";
import { Assets } from "pixi.js";
import manifest from "../assets/manifest.json";
import type { ComponentType } from "./components/_index";
import { getPixiApp, setPixiApp } from "./pixi-application";
import {
  getGameScreenAssets,
  getLoadScreenAssets,
  setLoadScreenAssetsBundle,
} from "./pixi-assets";
import { DestroySystem } from "./systems/destroy-system";
import { InitSystem } from "./systems/init-system";
import { MoveupSystem } from "./systems/moveup-system";

export type WindowType = Window & typeof globalThis;

class GameEngine {
  pixiApp = getPixiApp();
  miniplexECS = new World<ComponentType>();
  get loadScreenAssets() {
    return getLoadScreenAssets();
  }
  get gameScreenAssets() {
    return getGameScreenAssets();
  }
  get screenWitdh() {
    return this.w.innerWidth;
  }
  get screenHeight() {
    return this.w.innerHeight;
  }

  constructor(private w: WindowType) {
    (globalThis as any).__PIXI_APP__ = this.pixiApp;
  }

  initSystems() {
    Assets.init({ manifest });
    [InitSystem, MoveupSystem, DestroySystem].forEach((system) => {
      const obj = new system();
      obj.init();
    });
  }

  addEntity(entity: ComponentType) {
    const ee = this.miniplexECS.add(entity);
    const id = this.miniplexECS.id(ee);
    entity.ecsEntityId = id;
  }
}

let _gameSystem: GameEngine;
export const initGameEngine = async (elem: HTMLElement, w: WindowType) => {
  await setPixiApp(elem, w);
  _gameSystem = new GameEngine(w);
  _gameSystem.initSystems();
  await setLoadScreenAssetsBundle();
};
export const getGameEngine = () => {
  return _gameSystem;
};

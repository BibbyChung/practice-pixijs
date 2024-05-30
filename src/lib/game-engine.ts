import { World } from "miniplex";
import { Assets } from "pixi.js";
import manifest from "../assets/manifest.json";
import type { WindowType } from "./common/utils";
import type {
  ComponentType,
  ComponentTypeKV,
} from "./components/base-component";
import type { BaseEntity } from "./entities/base-entity";
import { getPixiApp, setPixiApp } from "./pixi-application";
import {
  getGameScreenAssets,
  getLoadScreenAssets,
  setLoadScreenAssetsBundle,
} from "./pixi-assets";
import { CreateSystem } from "./systems/create-system";
import { DestroySystem } from "./systems/destroy-system";
import { MoveSystem } from "./systems/move-system";
import { PlacementSystem } from "./systems/placement-system";

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
    [
      //
      CreateSystem,
      PlacementSystem,
      DestroySystem,
      MoveSystem,
    ].forEach((system) => {
      const obj = new system();
      obj.execute();
    });
  }

  addEntity(entity: ComponentType) {
    const ee = this.miniplexECS.add(entity);
    const id = this.miniplexECS.id(ee);
    (entity as BaseEntity).ecsEntityId = id;
  }

  addEntityWithComponent(entity: ComponentType, componentKV: ComponentTypeKV) {
    const newEntity = Object.assign(entity, componentKV);
    this.addEntity(newEntity);
  }

  addComponent(
    entity: ComponentType,
    propKey: keyof ComponentType,
    component: ComponentType[keyof ComponentType]
  ) {
    this.miniplexECS.addComponent(entity, propKey, component);
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

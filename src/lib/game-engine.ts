import { World } from "miniplex";
import { Assets } from "pixi.js";
import manifest from "../assets/manifest.json";
import type { ComponentType } from "./components/_index";
import { getPixi } from "./pixi-application";
import { PixiAssets } from "./pixi-assets";
import { DestroySystem } from "./systems/destroy-system";
import { InitSystem } from "./systems/init-system";
import { MoveupSystem } from "./systems/moveup-system";

class GameEngine {
  pixiApp = getPixi();
  pixiAsssets = new PixiAssets();
  miniplexECS = new World<ComponentType>();

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
export const getGameEngine = () => {
  if (!_gameSystem) {
    _gameSystem = new GameEngine();
    _gameSystem.initSystems();
  }
  return _gameSystem;
};

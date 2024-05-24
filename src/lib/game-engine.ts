import { World } from "miniplex";
import type { ComponentType } from "./components/_index";
import { getPixi } from "./pixi";
import { InitSystem } from "./systems/init-system";
import { MoveupSystem } from "./systems/moveup-system";
import { DestroySystem } from "./systems/destroy-system";

class GameEngine {
  pixiApp = getPixi();
  miniplexECS = new World<ComponentType>();

  initSystems() {
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

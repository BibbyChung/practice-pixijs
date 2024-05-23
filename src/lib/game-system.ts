import { World } from "miniplex";
import type { ComponentType } from "./components/_index";
import { getPixi } from "./pixi";
import { initSystems } from "./systems/_index";

class GameSystem extends World<ComponentType> {
  pixiApp = getPixi();

  constructor() {
    super();
  }
  setupSystems() {
    initSystems();
  }

  add<T>(entity: ComponentType) {
    super.add(entity);
    return entity as T;
  }
}

let _gameSystem: GameSystem;
export const getGameSystem = () => {
  if (!_gameSystem) {
    _gameSystem = new GameSystem();
    _gameSystem.setupSystems();
  }
  return _gameSystem;
};

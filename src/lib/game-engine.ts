import "@esengine/g-framework";

import type { WindowType } from "./common/utils";
import { getPixiApp, setPixiApp } from "./pixi-application";
import { setLoadScreenAssetsBundle } from "./pixi-assets";
import { InitSystem } from "./systems/init-system";

export class GameEngine {
  private _core: gs.Core;

  pixiApp = getPixiApp();
  get entityManager() {
    return this._core.entityManager;
  }
  get systemManager() {
    return this._core.systemManager;
  }

  constructor() {
    this._core = gs.Core.instance;
  }

  initSystems() {
    [
      //
      InitSystem,
    ].forEach((t) => {
      const system = new t(this.entityManager, 0);
      system.gs = this;
      this.systemManager.registerSystem(system);
    });
  }
}

let _gameEngine: GameEngine;
export const initGameEngine = async (elem: HTMLElement, w: WindowType) => {
  await setPixiApp(elem, w);

  const gs = new GameEngine();
  gs.initSystems();
  _gameEngine = gs;

  await setLoadScreenAssetsBundle();
};
export const getGameEngine = () => {
  return _gameEngine;
};

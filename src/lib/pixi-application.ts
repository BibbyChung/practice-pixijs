import { Application } from "pixi.js";
import type { WindowType } from "./game-engine";

const initGlobalKeyboardEvent = (w: WindowType) => {
  w.addEventListener("keydown", (k) => {
    console.log(k.key);
  });
};

let _pixi: Application;
export const setPixiRoot = (elem: HTMLElement, w: WindowType) => {
  const app = new Application();
  return app
    .init({
      width: w.innerWidth,
      height: w.innerHeight,
      backgroundColor: 0x061626,
      resolution: w.devicePixelRatio || 1,
      antialias: true,
      autoDensity: true,
    })
    .then(() => {
      _pixi = app;
      elem.appendChild(app.canvas);
      initGlobalKeyboardEvent(w);
    });
};

export const getPixi = () => _pixi;

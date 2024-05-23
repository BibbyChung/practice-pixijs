import { Application } from "pixi.js";

let _pixi: Application;
export const setPixiRoot = (elem: HTMLElement) => {
  const app = new Application();
  return app
    .init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x061626,
      resolution: window.devicePixelRatio || 1,
      antialias: true,
      autoDensity: true,
    })
    .then(() => {
      _pixi = app;
      elem.appendChild(app.canvas);
    });
};

export const getPixi = () => _pixi;

import { Application, Ticker } from "pixi.js";
import { getSubject } from "./common/utils";
import { getDevicePixelRatio } from "./game-engine";

let _pixi: Application;
export const setPixiApp = (elem: HTMLElement) => {
  const app = new Application();
  const canvasWidth = +import.meta.env.VITE_CANVAS_WIDTH;
  const canvasHeight = +import.meta.env.VITE_CANVAS_HEIGHT;

  return app
    .init({
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: 0x061626,
      resolution: getDevicePixelRatio(),
      antialias: true,
      autoDensity: true,
      // resizeTo: w,
    })
    .then(() => {
      _pixi = app;
      app.render();
      app.canvas.classList.add("mainCanvas");
      app.ticker.add((delta) => tickerLoop$.next(delta));
      elem.appendChild(app.canvas);
    });
};

export const getPixiApp = () => _pixi;

const tickerLoop$ = getSubject<Ticker>();
export const getTickerLoop = () => tickerLoop$.asObservable();

import { Application, Ticker } from "pixi.js";
import { getSubject, type WindowType } from "./common/utils";

const initGlobalKeyboardEvent = (w: WindowType) => {
  w.addEventListener("keydown", (k) => {
    console.log(k.key);
  });
};

let _pixi: Application;
export const setPixiApp = (elem: HTMLElement, w: WindowType) => {
  const app = new Application();
  const canvasWidth = +import.meta.env.VITE_CANVAS_WIDTH;
  const canvasHeight = +import.meta.env.VITE_CANVAS_HEIGHT;

  return app
    .init({
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: 0x061626,
      resolution: w.devicePixelRatio || 1,
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
      initGlobalKeyboardEvent(w);
    });
};

export const getPixiApp = () => _pixi;

const tickerLoop$ = getSubject<Ticker>();
export const getTickerLoop = () => tickerLoop$.asObservable();

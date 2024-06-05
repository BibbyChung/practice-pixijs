import { tap } from "rxjs";
import { Application, Ticker } from "pixi.js";
import {
  getConvertRealClientXY,
  getRandomInt,
  getSubject,
  type WindowType,
} from "./common/utils";
import { getSpriteEntity } from "./ecs/creator";
import { getGameEngine } from "./game-engine";

const initGlobalKeyboardEvent = (w: WindowType) => {
  w.addEventListener("keydown", (k) => {
    console.log(k.key);
  });
  w.addEventListener("pointerdown", (event) => {
    const realClientXY = getConvertRealClientXY(
      event.clientX,
      event.clientY,
      w
    );

    // add new ghost entity
    const ge = getGameEngine();
    [...Array(10).keys()].forEach(() => {
      const scale = getRandomInt(5, 20) / 100;
      const obj = getSpriteEntity(
        "ghost",
        scale,
        scale,
        realClientXY.realClientX,
        realClientXY.realClientY
      );
      ge.addEntityWithComponent(obj.entity, obj.componentKV);
    });
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

import { Application, Ticker } from "pixi.js";
import { getRandomInt, getSubject, type WindowType } from "./common/utils";
import { getSpriteEntity } from "./ecs/entities/sprite-entity";
import { getGameEngine } from "./game-engine";

const initGlobalKeyboardEvent = (w: WindowType) => {
  w.addEventListener("keydown", (k) => {
    console.log(k.key);
  });
  w.addEventListener("mouseup", (event) => {
    // console.log(event.clientX, event.clientY);
    // add new ghost entity
    const ge = getGameEngine();
    [...Array(10).keys()].forEach(() => {
      const scale = getRandomInt(5, 20) / 100;
      const obj = getSpriteEntity(
        "ghost",
        scale,
        scale,
        event.clientX,
        event.clientY
      );
      ge.addEntityWithComponent(obj.entity, obj.componentKV);
    });
  });
};

let _pixi: Application;
export const setPixiApp = (elem: HTMLElement, w: WindowType) => {
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
      app.ticker.add((delta) => tickerLoop$.next(delta));
      elem.appendChild(app.canvas);
      initGlobalKeyboardEvent(w);
    });
};

export const getPixiApp = () => _pixi;

const tickerLoop$ = getSubject<Ticker>();
export const getTickerLoop = () => tickerLoop$.asObservable();

import { Assets, Sprite, type ObservablePoint } from "pixi.js";
import type { Container, ContainerChild } from "pixi.js";
import {
  type IInit,
  type IPixiContainer,
  type IPosition,
  type IVelocity,
} from "./../components/_index";
import { getGameSystem } from "../game-system";
export class ButtonEntity
  implements IInit, IPosition, IVelocity, IPixiContainer
{
  private _sp?: Sprite;

  isInited: boolean = false;
  get position() {
    return this._sp?.position ?? null;
  }
  velocity: { x: number; y: number } = {
    x: 0.1,
    y: 0.2,
  };
  get pixiContainer(): Container<ContainerChild> {
    return this._sp!;
  }

  async init() {
    const gs = getGameSystem();

    const texture = await Assets.load("/images/ghost.png");
    const sp = new Sprite(texture);
    this._sp = sp;
    sp.position.set(gs.pixiApp.screen.width / 2, gs.pixiApp.screen.height);
    sp.anchor.set(0.5);

    sp.interactive = true;

    sp.on("pointerdown", (event) => {
      console.log(`pointerdown => ${event.client}`);
    });
  }
}

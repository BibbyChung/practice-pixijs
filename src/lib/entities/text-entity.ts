import {
  Container,
  Text,
  type ContainerChild,
  type TextString,
  type TextStyle,
  type TextStyleOptions,
} from "pixi.js";
import type { IInit, IText, IPixiContainer } from "../components/_index";
import { getGameSystem } from "../game-system";

export class TextEntity implements IInit, IText, IPixiContainer {
  private _text?: Text;
  private _gs = getGameSystem();

  get pixiContainer(): Container<ContainerChild> | null {
    return this._text ?? null;
  }

  get text(): TextString | null {
    return this._text?.text ?? null;
  }

  isInited: boolean = false;
  init(): void | Promise<void> {
    this._text = new Text({
      text: this.wording,
      anchor: { x: 0.5, y: 0.5 },
      style: this.style,
    });

    this._text.position.set(
      this._gs.pixiApp.screen.width / 2,
      this._gs.pixiApp.screen.height / 2
    );
  }

  constructor(
    private wording: string,
    private style?: TextStyle | TextStyleOptions
  ) {}
}

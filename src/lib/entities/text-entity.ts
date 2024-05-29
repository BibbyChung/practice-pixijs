import { Text, type TextStyle, type TextStyleOptions } from "pixi.js";
import { BaseEntity } from "./base-entity";

export class TextEntity extends BaseEntity {
  constructor(
    private wording: string,
    private style?: TextStyle | TextStyleOptions
  ) {
    super();
  }

  create(): void | Promise<void> {
    const t = new Text({
      text: this.wording,
      anchor: { x: 0.5, y: 0.5 },
      style: this.style,
    });
    t.interactive = true;
    t.addEventListener("pointerdown", (event) => {
      console.log(`text pointerdown => ${event.client}`);
    });
    t.position.set(
      this._ge.pixiApp.screen.width / 2,
      this._ge.pixiApp.screen.height / 2
    );
    this.pixiElem = t;
  }
}

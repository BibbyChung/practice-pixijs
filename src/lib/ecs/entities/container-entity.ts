import { Container, Rectangle } from "pixi.js";
import { EnumContainerLabel, getRandomInt } from "../../common/utils";
import { getSpriteEntity } from "../creator";
import { BaseEntity } from "./base-entity";

export class ContainerEntity extends BaseEntity {
  create(): void | Promise<void> {
    const c = new Container();
    c.label = EnumContainerLabel.root;
    this.pixiElem = c;
    c.interactive = true;
    c.hitArea = new Rectangle(
      0,
      0,
      this._ge.size.designWitdh,
      this._ge.size.designHeight
    );
    c.addEventListener("pointerdown", (event) => {
      const rect = this._ge.RootCanvas.getBoundingClientRect();
      // console.log(
      //   event.clientX,
      //   event.clientX - rect.left,
      //   this._ge.getRealClientX(event.clientX)
      // );
      // console.log(
      //   event.clientY,
      //   event.clientY - rect.top,
      //   this._ge.getRealClientY(event.clientY)
      // );
      // console.log("-----");

      // add new ghost entity
      [...Array(10).keys()].forEach(() => {
        const scale = getRandomInt(5, 20) / 100;
        const obj = getSpriteEntity(
          "ghost",
          scale,
          scale,
          this._ge.getRealClientX(event.clientX - rect.left),
          this._ge.getRealClientY(event.clientY - rect.top)
        );
        this._ge.addEntityWithComponent(obj.entity, obj.componentKV);
      });
    });
  }
}

import {
  Container,
  Text,
  type ContainerChild,
  type TextString,
  type TextStyle,
  type TextStyleOptions,
} from "pixi.js";
import { EnumContainerLabel, type IText } from "../components/_index";
import { BaseEntity } from "./base-entity";

export class TextEntity extends BaseEntity implements IText {
  isDestroying: boolean = false;
  destroy(): void {
    this.self?.destroy();
  }

  ecsEntityId?: number;
  parentContainerName: EnumContainerLabel = EnumContainerLabel.root;
  zIndex = 20;
  self: Container<ContainerChild> | null = null;
  isInited: boolean = false;
  init(): void | Promise<void> {
    const t = new Text({
      text: this.wording,
      anchor: { x: 0.5, y: 0.5 },
      style: this.style,
    });

    t.position.set(
      this._ge.pixiApp.screen.width / 2,
      this._ge.pixiApp.screen.height / 2
    );

    this.self = t;
  }

  get text(): TextString | null {
    return (this.self as Text)?.text ?? null;
  }

  constructor(
    private wording: string,
    private style?: TextStyle | TextStyleOptions
  ) {
    super();
  }
}

import { Container, type ContainerChild } from "pixi.js";
import { EnumContainerLabel, type IContainerLabel } from "../components/_index";
import { BaseEntity } from "./base-entity";

export class RootContainerEntity extends BaseEntity implements IContainerLabel {
  isDestroying: boolean = false;
  destroy(): void {
    this.self?.destroy();
  }

  get containerLabel(): string | null {
    return this.self?.label ?? null;
  }

  ecsEntityId?: number;
  parentContainerName: EnumContainerLabel = EnumContainerLabel.none;
  self: Container<ContainerChild> | null = null;
  isInited: boolean = false;
  init(): void | Promise<void> {
    const c = new Container();
    c.label = EnumContainerLabel.root;
    this.self = c;
  }
}

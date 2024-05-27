import type { Container, ContainerChild } from "pixi.js";
import type { EnumContainerLabel, IDestroy, IInit } from "../components/_index";
import { getGameEngine } from "../game-engine";

export abstract class BaseEntity implements IInit, IDestroy {
  protected _ge = getGameEngine();

  abstract ecsEntityId?: number;
  abstract isInited: boolean;
  abstract parentContainerName: EnumContainerLabel;
  zIndex = 10;
  abstract self: Container<ContainerChild> | null;
  abstract init(): void | Promise<void>;

  abstract isDestroying: boolean;
  abstract destroy(): void;
}

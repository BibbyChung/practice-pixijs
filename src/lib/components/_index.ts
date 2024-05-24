import type { Container, TextString, ObservablePoint } from "pixi.js";

export enum EnumContainerLabel {
  none = "none",
  root = "root",
}

export interface IInit {
  ecsEntityId?: number;
  isInited: boolean;
  parentContainerName: EnumContainerLabel;
  self: Container | null;
  init(): void | Promise<void>;
}
export interface IText {
  text: TextString | null;
}
export interface IPosition {
  position: ObservablePoint | null;
}
export interface IContainerLabel {
  containerLabel: string | null;
}

export interface IVelocity {
  velocity: {
    x: number;
    y: number;
  };
}

export interface IDestroy {
  isDestroying: boolean;
  destroy(): void;
}

export type ComponentType = Partial<
  IInit & IDestroy & IContainerLabel & IText & IPosition & IVelocity
>;

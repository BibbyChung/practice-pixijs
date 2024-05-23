import type { Container, TextString, ObservablePoint } from "pixi.js";

export interface IPixiContainer {
  pixiContainer: Container | null;
}

export interface IInit {
  isInited: boolean;
  init(): void | Promise<void>;
}
export interface IText {
  text: TextString | null;
}
export interface IPosition {
  position: ObservablePoint | null;
}

export interface IVelocity {
  velocity: {
    x: number;
    y: number;
  };
}

export type ComponentType = Partial<
  IVelocity & IInit & IText & IPosition & IPixiContainer
>;

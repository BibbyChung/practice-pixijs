export type WindowType = Window & typeof globalThis;

export enum EnumContainerLabel {
  none = "none",
  root = "root",
}

export const getRandomInt = (lower: number, upper: number): number => {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

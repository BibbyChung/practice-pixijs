import { Color } from "pixi.js";
import { BehaviorSubject, Subject, tap, type Subscription } from "rxjs";

export type WindowType = Window & typeof globalThis;

export enum EnumContainerLabel {
  none = "none",
  root = "root",
}

export const getRandomInt = (lower: number, upper: number): number =>
  Math.floor(Math.random() * (upper - lower + 1)) + lower;

// Test For Hit
// A basic AABB check between two different squares
export const isRectangleCollision = (
  box01: {
    x: number;
    y: number;
    width: number;
    height: number;
  },
  box02: {
    x: number;
    y: number;
    width: number;
    height: number;
  }
) => {
  return (
    box01.x < box02.x + box02.width &&
    box01.x + box01.width > box02.x &&
    box01.y < box02.y + box02.height &&
    box01.y + box01.height > box02.y
  );
};

// rxjs
export const getSubject = <T>() => new Subject<T>();
export const getBehaviorSubject = <T>(v: T) => new BehaviorSubject(v);

// destroy subject
const destroySub$ = getSubject<Subscription>();
destroySub$
  .pipe(
    tap((sub) => {
      sub.unsubscribe();
    })
  )
  .subscribe();
export const setDestroySub = (v: Subscription) => destroySub$.next(v);

export const getRandomRGBA = () => ({
  r: getRandomInt(0, 255),
  g: getRandomInt(0, 255),
  b: getRandomInt(0, 255),
  a: getRandomInt(0, 10) / 10,
});
// rgb to hex
export const getRGBA2Hex = (rgba: {
  r: number;
  g: number;
  b: number;
  a: number;
}) => {
  return new Color({
    r: Math.round(rgba.r),
    g: Math.round(rgba.g),
    b: Math.round(rgba.b),
    a: rgba.a,
  }).toHex();
};

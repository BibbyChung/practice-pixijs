import { BehaviorSubject, Subject, tap, type Subscription } from "rxjs";

export type WindowType = Window & typeof globalThis;

export enum EnumContainerLabel {
  none = "none",
  root = "root",
}

export const getRandomInt = (lower: number, upper: number): number => {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
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

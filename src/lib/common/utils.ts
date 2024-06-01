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

// export const isRectangleCollision = (
//   object1: Container,
//   object2: Container
// ) => {
//   const bounds1 = object1.getBounds(false);
//   const bounds2 = object2.getBounds(false);

//   return (
//     bounds1.x < bounds2.x + bounds2.width &&
//     bounds1.x + bounds1.width > bounds2.x &&
//     bounds1.y < bounds2.y + bounds2.height &&
//     bounds1.y + bounds1.height > bounds2.y
//   );
// };

// export const isRectangleCollision = (
//   object1: Container,
//   object2: Container
// ) => {
//   const bounds1 = object1.getBounds();
//   const bounds2 = object2.getBounds();

//   return (
//     bounds1.x < bounds2.x + bounds2.width &&
//     bounds1.x + bounds1.width > bounds2.x &&
//     bounds1.y < bounds2.y + bounds2.height &&
//     bounds1.y + bounds1.height > bounds2.y
//   );
// };

// Calculates the results of a collision, allowing us to give an impulse that
// shoves objects apart
// function collisionResponse(object1:Container, object2: Container) {
//   if (!object1 || !object2) {
//     return new Point(0);
//   }

//   const vCollision = new Point(object2.x - object1.x, object2.y - object1.y);

//   const distance = Math.sqrt(
//     (object2.x - object1.x) * (object2.x - object1.x) +
//       (object2.y - object1.y) * (object2.y - object1.y)
//   );

//   const vCollisionNorm = new Point(
//     vCollision.x / distance,
//     vCollision.y / distance
//   );

//   const vRelativeVelocity = new Point(
//     object1.acceleration.x - object2.acceleration.x,
//     object1.acceleration.y - object2.acceleration.y
//   );

//   const speed =
//     vRelativeVelocity.x * vCollisionNorm.x +
//     vRelativeVelocity.y * vCollisionNorm.y;

//   const impulse = (impulsePower * speed) / (object1.mass + object2.mass);

//   return new Point(impulse * vCollisionNorm.x, impulse * vCollisionNorm.y);
// }

// Calculate the distance between two given points
// function distanceBetweenTwoPoints(p1, p2) {
//   const a = p1.x - p2.x;
//   const b = p1.y - p2.y;

//   return Math.hypot(a, b);
// }

// export class DetectCollision {
//   static isRectangleCollision(rect1: Rectangle, rect2: Rectangle): boolean {
//     let distanceX = Math.abs(rect1.centerX - rect2.centerX);
//     let distanceY = Math.abs(rect1.centerY - rect2.centerY);

//     let minDistanceX = (rect1.width + rect2.width) * 0.5;
//     let minDistanceY = (rect1.height + rect2.height) * 0.5;

//     if (distanceX > minDistanceX || distanceY > minDistanceY) {
//       return false;
//     }
//     return true;
//   }

//   static isCircleCollision(circle1: Circle, circle2: Circle): boolean {
//     let distance = Math.sqrt(
//       Math.pow(circle1.centerX - circle2.centerX, 2) +
//         Math.pow(circle1.centerY - circle2.centerY, 2)
//     );
//     if (distance < circle1.radius + circle2.radius) {
//       return true;
//     }
//     return false;
//   }
// }

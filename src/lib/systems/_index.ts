import { EntityIntoPixiSystem } from "./entity-into-pixi-system";
import { InitSystem } from "./init-system";
import { MoveupSystem } from "./moveup-system";

export const initSystems = () => {
  [
    //
    InitSystem,
    //
    EntityIntoPixiSystem,
    //
    MoveupSystem,
  ].forEach((sys) => {
    const obj = new sys();
    obj.init();
  });
};

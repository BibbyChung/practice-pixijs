import { getComponentKV, type ComponentType } from ".";
import { EnumContainerLabel, getRandomInt } from "../common/utils";
import { getGameEngine } from "../game-engine";
import type { assetsImgKey } from "../pixi-assets";
import { CollisionComponent } from "./components/collision-component";
import { ContainerComponent } from "./components/container-component";
import { CreateComponent } from "./components/create-component";
import { MoveComponent } from "./components/move-component";
import { PlacementComponent } from "./components/placement-component";
import { RandomColorFillComponent } from "./components/random-color-fill-component";
import { RotationComponent } from "./components/rotation-component";
import { BoundsCollisionComponent } from "./components/bounds-collision-compoent";
import { ContainerEntity } from "./entities/container-entity";
import { SpriteEntity } from "./entities/sprite-entity";
import { TextEntity } from "./entities/text-entity";
import { DragonEntity } from "./entities/dragon-entity";

export const getRootContainerEntity = () => {
  const entity = new ContainerEntity();
  const componentKV = getComponentKV({
    createComponent: new CreateComponent(entity),
    containerComponent: new ContainerComponent(entity),
    placementComponent: new PlacementComponent(
      entity,
      EnumContainerLabel.none,
      0
    ),
  });
  return {
    entity: entity as ComponentType,
    componentKV: componentKV,
  };
};

export const getSpriteEntity = (
  key: assetsImgKey,
  scaleX: number,
  scaleY: number,
  positionX: number = 0,
  positionY: number = 0
) => {
  const ge = getGameEngine();
  let newPX = positionX;
  let newPY = positionY;
  if (positionX === 0 && positionY === 0) {
    newPX = ge.pixiApp.screen.width / 2;
    newPY = ge.pixiApp.screen.height / 2;
  }

  const vX = getRandomInt(20, 80) / 10 - 4;
  const vY = getRandomInt(20, 80) / 10 - 4;

  const entity = new SpriteEntity(key, scaleX, scaleY, newPX, newPY);
  const componentKV = getComponentKV({
    createComponent: new CreateComponent(entity),
    placementComponent: new PlacementComponent(
      entity,
      EnumContainerLabel.root,
      10
    ),
    moveComponent: new MoveComponent(entity, vX, vY),
    collisionComponent: new CollisionComponent(entity),
    boundsCollisionComponent: new BoundsCollisionComponent(entity),
    rotationComponent: new RotationComponent(entity),
  });

  return {
    entity: entity as ComponentType,
    componentKV,
  };
};

export const getDragonEntity = () => {
  // const ge = getGameEngine();
  // let newPX = positionX;
  // let newPY = positionY;
  // if (positionX === 0 && positionY === 0) {
  //   newPX = ge.pixiApp.screen.width / 2;
  //   newPY = ge.pixiApp.screen.height / 2;
  // }

  const vX = getRandomInt(20, 80) / 10 - 4;
  const vY = getRandomInt(20, 80) / 10 - 4;

  const entity = new DragonEntity();
  const componentKV = getComponentKV({
    createComponent: new CreateComponent(entity),
    placementComponent: new PlacementComponent(
      entity,
      EnumContainerLabel.root,
      10
    ),
  });

  return {
    entity: entity as ComponentType,
    componentKV,
  };
};

export const getTextEntity = () => {
  const entity = new TextEntity("Hello, BB!", {
    fontSize: 154,
    fill: "white",
    align: "center",
    fontFamily: "Jaro Regular",
  });
  const componentKV = getComponentKV({
    createComponent: new CreateComponent(entity),
    placementComponent: new PlacementComponent(
      entity,
      EnumContainerLabel.root,
      20
    ),
    randomColorFillComponent: new RandomColorFillComponent(entity),
  });

  return {
    entity: entity as ComponentType,
    componentKV,
  };
};

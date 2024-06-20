import { getComponentKV, type ComponentType } from ".";
import { EnumContainerLabel, getRandomInt } from "../common/utils";
import { ContainerComponent } from "./components/container-component";
import { CreateComponent } from "./components/create-component";
import { PlacementComponent } from "./components/placement-component";
import { ContainerEntity } from "./entities/container-entity";
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

export const getDragonEntity = () => {
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

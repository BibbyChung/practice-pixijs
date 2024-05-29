import "@esengine/g-framework";
import { EnumContainerLabel } from "../common/utils";
import { ContainerComponent } from "../components/container-component";
import { InitComponent } from "../components/init-component";
import { PositionComponent } from "../components/position-component";
import type { BaseEntity } from "../entities/base-entity";
import { BaseSystem } from "./base-system";

export class InitSystem extends BaseSystem {
  entityFilter(entity: gs.Entity): boolean {
    return entity.hasComponent(PositionComponent);
  }

  update(entities: BaseEntity[]): void {
    const deltaTime = gs.TimeManager.getInstance().deltaTime;
    for (const entity of entities) {
      const initC = entity.getComponent(InitComponent);

      if (initC?.parentContainerName === EnumContainerLabel.none) {
        this.gs.pixiApp.stage.addChild(entity.pixiComp!);
        entity.pixiComp!.zIndex = entity.zIndex;
        this.gs.pixiApp.stage.sortChildren();
      }

      if (initC?.parentContainerName === EnumContainerLabel.root) {
        const containerEntity = this.gs.entityManager
          .getEntitiesWithComponent(ContainerComponent)
          .find(
            (a) =>
              a.getComponent(ContainerComponent)?.containerLabel ===
              EnumContainerLabel.root
          ) as BaseEntity;

        containerEntity.pixiComp?.addChild(entity.pixiComp!);
        entity.pixiComp!.zIndex = entity.zIndex;
        containerEntity.pixiComp?.sortChildren();
      }
    }
  }
}

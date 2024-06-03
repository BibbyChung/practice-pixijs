import { EnumContainerLabel } from "../../common/utils";
import type { BaseEntity } from "../entities/base-entity";
import { BaseSystem } from "./base-system";

export class PlacementSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS
      .without("createComponent")
      .with("placementComponent").onEntityAdded;
  }
  execute(): void {
    this.getQuery().subscribe((entity) => {
      const ee = entity as any as BaseEntity;
      if (entity.placementComponent.parentLabel === EnumContainerLabel.none) {
        this._ge.pixiApp.stage.addChild(ee.pixiElem!);
        ee.pixiElem!.zIndex = entity.placementComponent.zIndex;
        this._ge.pixiApp.stage.sortChildren();
      }

      if (entity.placementComponent.parentLabel === EnumContainerLabel.root) {
        const rootContainerEntity = this._ge.miniplexECS
          .with("containerComponent")
          .where(
            (a) => a.containerComponent.label === EnumContainerLabel.root
          ).first;

        if (rootContainerEntity) {
          const rcEE = rootContainerEntity as any as BaseEntity;
          rcEE.pixiElem?.addChild(ee.pixiElem!);
          ee.pixiElem!.zIndex = entity.placementComponent.zIndex;
          rcEE.pixiElem?.sortChildren();
        }
      }
    });
  }
}

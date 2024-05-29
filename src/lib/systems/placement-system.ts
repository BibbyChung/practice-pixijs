import { EnumContainerLabel } from "../common/utils";
import { BaseSystem } from "./base-system";

export class PlacementSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS
      .without("createComponent")
      .with("placementComponent").onEntityAdded;
  }
  execute(): void {
    this.getQuery().subscribe((entity) => {
      if (entity.placementComponent.parentLabel === EnumContainerLabel.none) {
        this._ge.pixiApp.stage.addChild(entity.pixiElem!);
        entity.pixiElem!.zIndex = entity.placementComponent.zIndex;
        this._ge.pixiApp.stage.sortChildren();
      }

      if (entity.placementComponent.parentLabel === EnumContainerLabel.root) {
        const rootContainerEntity = this._ge.miniplexECS
          .with("containerComponent")
          .where(
            (a) => a.containerComponent.label === EnumContainerLabel.root
          ).first;

        if (rootContainerEntity) {
          rootContainerEntity.pixiElem?.addChild(entity.pixiElem!);
          entity.pixiElem!.zIndex = entity.placementComponent.zIndex;
          rootContainerEntity.pixiElem?.sortChildren();
        }
      }
    });
  }
}

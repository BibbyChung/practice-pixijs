import { EnumContainerLabel, type IInit } from "../components/_index";
import { BaseSystem } from "./base-system";

export class InitSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS.with("isInited").where((e) => !e.isInited)
      .onEntityAdded;
  }
  init() {
    this.getQuery().subscribe(async (e) => {
      await e.init!();
      this.addEntityToPixiContainer(e as IInit);
      this._ge.miniplexECS.update(e, (e) => {
        e.isInited = true;
        console.log("set up isCreated=true");
      });
      this._ge.miniplexECS.update(e, (e) => {
        e.isInited = true;
      });
    });
  }
  private addEntityToPixiContainer(entity: IInit) {
    if (entity.parentContainerName === EnumContainerLabel.none) {
      this._ge.pixiApp.stage.addChild(entity.self!);
      entity.self!.zIndex = entity.zIndex;
      this._ge.pixiApp.stage.sortChildren();
    }

    if (entity.parentContainerName === EnumContainerLabel.root) {
      const rootContainerEntity = this._ge.miniplexECS
        .with("containerLabel")
        .where((e) => e.containerLabel === EnumContainerLabel.root).first;
      rootContainerEntity?.self?.addChild(entity.self!);
      entity.self!.zIndex = entity.zIndex;
      rootContainerEntity?.self?.sortChildren();
    }
  }
}

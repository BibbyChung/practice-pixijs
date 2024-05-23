import { BaseSystem } from "./base-system";

export class EntityIntoPixiSystem extends BaseSystem {
  protected getQuery() {
    return this._gs
      .with("isInited", "pixiContainer")
      .where((e) => e.isInited ?? false).onEntityAdded;
  }
  init(): void {
    this.getQuery().subscribe(async (e) => {
      this._gs.pixiApp.stage.addChild(e.pixiContainer!);
      console.log("add-entity-to-pixi-system");
    });
  }
}

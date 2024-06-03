import { BaseSystem } from "./base-system";

export class CreateSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS.with("createComponent").onEntityAdded;
  }
  execute(): void {
    this.getQuery().subscribe((comp) => {
      const entity = comp.createComponent.entity;
      entity.create();
      this._ge.miniplexECS.removeComponent(comp, "createComponent");
    });
  }
}

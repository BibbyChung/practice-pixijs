import type { BaseEntity } from "../entities/base-entity";
import { BaseSystem } from "./base-system";

export class CreateSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS.with("createComponent").onEntityAdded;
  }
  execute(): void {
    this.getQuery().subscribe((entity) => {
      const ee = entity as any as BaseEntity;
      ee.create();
      this._ge.miniplexECS.removeComponent(entity, "createComponent");
    });
  }
}

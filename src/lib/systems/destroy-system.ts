import type { BaseEntity } from "../entities/base-entity";
import { BaseSystem } from "./base-system";

export class DestroySystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS.with("destroyComponent").onEntityAdded;
  }
  execute(): void {
    this.getQuery().subscribe((entity) => {
      entity.destroyComponent.isDestroy = true;
      this._ge.miniplexECS.remove(entity);
      const ee = entity as BaseEntity;
      ee.destroy();
      console.log("destory...");
    });
  }
}

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
      const be = entity as BaseEntity;
      setTimeout(() => {
        be.destroy();
        console.log("destory...");
      }, 0);
    });
  }
}

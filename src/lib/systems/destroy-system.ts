import { BaseSystem } from "./base-system";

export class DestroySystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS
      .with("isDestroying")
      .where((e) => e.isDestroying);
  }
  init(): void {
    this.getQuery().onEntityAdded.subscribe((e) => {
      e.destroy!();
      e.self = null;
      this._ge.miniplexECS.remove(e);
      console.log("destory...");
    });
  }
}

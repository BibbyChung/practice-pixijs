import { BaseSystem } from "./base-system";

export class MoveupSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS
      .with("isInited", "velocity")
      .where((e) => !e.isInited).onEntityAdded;
  }
  init(): void {
    this.getQuery().subscribe((e) => {
      this._ge.pixiApp.ticker.add((delta) => {
        e.position?.set(
          e.position.x + e.velocity.x * delta.deltaTime,
          e.position.y - e.velocity.y * delta.deltaTime
        );
      });
    });
  }
}

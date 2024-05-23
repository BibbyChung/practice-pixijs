import { BaseSystem } from "./base-system";

export class MoveupSystem extends BaseSystem {
  protected getQuery() {
    return this._gs.with("isInited", "velocity").where((e) => !e.isInited)
      .onEntityAdded;
  }
  init(): void {
    this.getQuery().subscribe((e) => {
      this._gs.pixiApp.ticker.add((delta) => {
        e.position?.set(
          e.position.x + e.velocity.x * delta.deltaTime,
          e.position.y - e.velocity.y * delta.deltaTime
        );
      });
    });
  }
}

import { BaseSystem } from "./base-system";

export class InitSystem extends BaseSystem {
  protected getQuery() {
    return this._gs.with("isInited").where((e) => !e.isInited).onEntityAdded;
  }
  init() {
    this.getQuery().subscribe(async (e) => {
      await e.init!();
      this._gs.update(e, (e) => {
        e.isInited = true;
        console.log("set up isCreated=true");
      });
    });
  }
}

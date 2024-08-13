import { BaseSystem } from './base-system'

export class CreateSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS.with('createComponent').onEntityAdded
  }
  execute(): void {
    this.getQuery().subscribe(async (comp) => {
      const entity = comp.createComponent.entity
      await entity.create()
      this._ge.miniplexECS.removeComponent(comp, 'createComponent')
    })
  }
}

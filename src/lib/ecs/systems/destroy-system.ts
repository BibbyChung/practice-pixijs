import { BaseSystem } from './base-system'

export class DestroySystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS.with('destroyComponent').onEntityAdded
  }
  execute(): void {
    this.getQuery().subscribe((comp) => {
      comp.destroyComponent.isDestroy = true
      this._ge.miniplexECS.remove(comp)
      const be = comp.destroyComponent.entity
      setTimeout(() => {
        be.destroy()
        console.log('destory...')
      }, 0)
    })
  }
}

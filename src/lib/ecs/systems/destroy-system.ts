import { BaseSystem } from './base-system'

export class DestroySystem extends BaseSystem {
  private get q() {
    return this.ecs.world.with('destroyComponent')
  }
  protected getAddedQuery() {
    return this.q.onEntityAdded
  }
  protected getRemovedQuery() {
    return this.q.onEntityRemoved
  }
  execute(): void {
    this.getAddedQuery().subscribe((entity) => {
      entity.destroyComponent.isDestroy = true
      this.ecs.world.remove(entity)
      setTimeout(() => {
        entity.destroyComponent.destroy()
      }, 0)
    })
  }
}

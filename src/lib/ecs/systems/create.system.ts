import { BaseSystem } from './base.system'

export class CreateSystem extends BaseSystem {
  private get q() {
    return this.ecs.world.with('createComponent')
  }
  protected getAddedQuery() {
    return this.q.onEntityAdded
  }
  protected getRemovedQuery() {
    return this.q.onEntityRemoved
  }
  execute(): void {
    this.getAddedQuery().subscribe(async (entity) => {
      await entity.createComponent.create()
      this.ecs.removeComponent(entity, 'createComponent')
    })
  }
}

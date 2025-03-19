import type { ComponentType } from '../_index'
import type { BaseEntity } from '../entities/base.entity'
import { retryFunc } from '../../common/utils'
import { BaseSystem } from './base.system'

export class PlacementSystem extends BaseSystem {
  private get q() {
    return this.ecs.world.without('createComponent').with('placementComponent')
  }
  protected getAddedQuery() {
    return this.q.onEntityAdded
  }
  protected getRemovedQuery() {
    return this.q.onEntityRemoved
  }
  execute(): void {
    this.getAddedQuery().subscribe((entity) => {
      const baseEntity = entity as ComponentType as BaseEntity
      if (entity.placementComponent.parentLabel === 'none') {
        this.pixiApp.app.stage.addChild(baseEntity.pixiElem!)
        baseEntity.pixiElem!.zIndex = entity.placementComponent.zIndex
        this.pixiApp.app.stage.sortChildren()
      } else {
        retryFunc(15, 100, () => {
          const containerEntity = this.ecs.world
            .without('createComponent')
            .with('containerComponent')
            .where(
              (a) => a.containerComponent.label === entity.placementComponent.parentLabel
            ).first
          if (!containerEntity) {
            return false
          }
          const baseContainerEntity = containerEntity as ComponentType as BaseEntity // .containerComponent.entity
          baseContainerEntity.pixiElem?.addChild(baseEntity.pixiElem!)
          baseEntity.pixiElem!.zIndex = entity.placementComponent.zIndex
          baseContainerEntity.pixiElem?.sortChildren()
          return true
        })
      }
    })
  }
}

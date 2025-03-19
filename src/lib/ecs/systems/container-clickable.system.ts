import { Rectangle } from 'pixi.js'
import type { ComponentType } from '../_index'
import type { BaseEntity } from '../entities/base.entity'
import { BaseSystem } from './base.system'

export class ContainerClickableSystem extends BaseSystem {
  private get q() {
    return this.ecs.world.without('createComponent').with('containerClickableComponent')
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
      const pixiElem = baseEntity.pixiElem!
      pixiElem.eventMode = 'static'
      pixiElem.cursor = entity.containerClickableComponent.cursor
      pixiElem.hitArea = new Rectangle(
        0,
        0,
        entity.containerClickableComponent.clickableWidth,
        entity.containerClickableComponent.clickableHeight
      )
      pixiElem.addListener('pointertap', entity.containerClickableComponent.onClick)
    })

    this.getRemovedQuery().subscribe((entity) => {
      const baseEntity = entity as ComponentType as BaseEntity
      const pixiElem = baseEntity.pixiElem!
      pixiElem.eventMode = 'none'
      pixiElem.cursor = 'none'
      pixiElem.hitArea = null
      pixiElem.removeListener('pointertap', entity.containerClickableComponent.onClick)
    })
  }
}

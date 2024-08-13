import { EnumContainerLabel } from '../../common/utils'
import { BaseSystem } from './base-system'

export class PlacementSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS.without('createComponent').with('placementComponent').onEntityAdded
  }
  execute(): void {
    this.getQuery().subscribe((comp) => {
      const entity = comp.placementComponent.entity
      if (comp.placementComponent.parentLabel === EnumContainerLabel.none) {
        this._ge.pixiApp.stage.addChild(entity.pixiElem!)
        entity.pixiElem!.zIndex = comp.placementComponent.zIndex
        this._ge.pixiApp.stage.sortChildren()
      }

      if (comp.placementComponent.parentLabel === EnumContainerLabel.root) {
        const rootContainerComp = this._ge.miniplexECS
          .with('containerComponent')
          .where((a) => a.containerComponent.label === EnumContainerLabel.root).first

        if (rootContainerComp) {
          const rootContainerEntity = rootContainerComp.containerComponent.entity
          rootContainerEntity.pixiElem!.addChild(entity.pixiElem!)
          entity.pixiElem!.zIndex = comp.placementComponent.zIndex
          rootContainerEntity.pixiElem!.sortChildren()
        }
      }
    })
  }
}

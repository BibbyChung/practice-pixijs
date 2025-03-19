import { World } from 'miniplex'
import { entities, systemClasses, type ComponentType, type ComponentTypeKV } from './_index'
import { BaseEntity } from './entities/base.entity'
import type { ContainerLabelType } from './entities/container.entity'

export class MiniPlexECS {
  public world = new World<ComponentType>()

  async initSystems() {
    const systems = systemClasses //await Promise.all(systemClasses)
    systems.forEach((system) => {
      const sys = new system()
      sys.execute()
    })
  }

  async initEntities() {
    const entitiesImport = entities
    Promise.all(entitiesImport).then((arr) => {
      arr.forEach((item) => {
        item.init()
      })
    })
  }

  addEntity(entity: ComponentType | BaseEntity) {
    const ee = this.world.add(entity as ComponentType)
    const id = this.world.id(ee)
    ;(entity as BaseEntity).ecsEntityId = id
    return ee
  }

  addEntityWithComponent(entity: ComponentType | BaseEntity, componentKV: ComponentTypeKV) {
    const newEntity = this.addEntity(entity)
    for (const k in componentKV) {
      // have to use this way to prevent wried things
      const key = k as keyof ComponentType
      const value = componentKV[key] as ComponentType[keyof ComponentType]
      this.addComponent(newEntity, key, value)
    }
  }

  addComponent(
    entity: ComponentType | BaseEntity,
    propKey: keyof ComponentType,
    component: ComponentType[keyof ComponentType]
  ) {
    setTimeout(() => {
      this.world.addComponent(entity as ComponentType, propKey, component)
    }, 0)
  }

  removeComponent(entity: ComponentType | BaseEntity, propKey: keyof ComponentType) {
    this.world.removeComponent(entity as ComponentType, propKey)
  }

  getRootContainerEntity = (label: ContainerLabelType) => {
    const entity = this.world
      .with('containerComponent')
      .where((a) => a.containerComponent.label === label).first
    return entity as ComponentType as BaseEntity
  }
}

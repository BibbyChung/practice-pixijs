import { gsap } from 'gsap'
import { getRandomInt } from '../../common/utils'
import { BaseSystem } from './base.system'

export class RotationSystem extends BaseSystem {
  private get q() {
    return this.ecs.world.without('createComponent').with('rotationComponent')
  }
  protected getAddedQuery() {
    return this.q.onEntityAdded
  }
  protected getRemovedQuery() {
    return this.q.onEntityRemoved
  }

  execute(): void {
    this.getAddedQuery().subscribe((comp) => {
      const clockwiseRotate = getRandomInt(0, 1) === 1 ? 1 : -1
      const sObj = {
        rotation: comp.rotationComponent.rotation,
      }
      gsap.to(sObj, {
        rotation: comp.rotationComponent.rotation + 60 * clockwiseRotate,
        duration: getRandomInt(5, 30),
        ease: 'none',
        repeat: -1,
        onUpdate: function () {
          const tObj = this.targets()[0] as typeof sObj
          comp.rotationComponent.rotation = tObj.rotation
        },
      })
    })
  }
}

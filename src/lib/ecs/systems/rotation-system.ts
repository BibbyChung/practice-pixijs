import { gsap } from 'gsap'
import { getRandomInt } from '../../common/utils'
import { BaseSystem } from './base-system'

export class RotationSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS.without('createComponent').with('rotationComponent').onEntityAdded
  }
  execute(): void {
    this.getQuery().subscribe((comp) => {
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
          // console.log(tObj.rotation);
          comp.rotationComponent.entity.pixiElem!.rotation = tObj.rotation
        },
      })
    })
  }
}

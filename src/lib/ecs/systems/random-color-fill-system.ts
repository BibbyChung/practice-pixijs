import { gsap } from 'gsap'
import { getRGBA2Hex } from '../../common/utils'
import { getRandomRGBA } from './../../common/utils'
import { BaseSystem } from './base-system'

export class RandomColorFillSystem extends BaseSystem {
  private get q() {
    return this.ecs.world.without('createComponent').with('randomColorFillComponent')
  }
  protected getAddedQuery() {
    return this.q.onEntityAdded
  }
  protected getRemovedQuery() {
    return this.q.onEntityRemoved
  }
  execute(): void {
    this.getAddedQuery().subscribe((entity) => {
      const sObj = entity.randomColorFillComponent.getElemStyleFill()
      gsap.to(sObj, {
        ...getRandomRGBA(),
        duration: 6,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        onUpdate: function () {
          const tObj = this.targets()[0] as typeof sObj
          const hex = getRGBA2Hex(tObj)
          entity.randomColorFillComponent.setElemStyleFill(hex)
        },
      })
    })
  }
}

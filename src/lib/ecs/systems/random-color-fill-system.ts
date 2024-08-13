import { gsap } from 'gsap'
import type { Text } from 'pixi.js'
import { getRGBA2Hex } from '../../common/utils'
import { getRandomRGBA } from './../../common/utils'
import { BaseSystem } from './base-system'

export class RandomColorFillSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS.without('createComponent').with('randomColorFillComponent')
      .onEntityAdded
  }
  execute(): void {
    this.getQuery().subscribe((comp) => {
      const textComp = comp.randomColorFillComponent.entity.pixiElem! as Text
      const sObj = comp.randomColorFillComponent.defaultColor
      gsap.to(sObj, {
        ...getRandomRGBA(),
        duration: 6,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        onUpdate: function () {
          const tObj = this.targets()[0] as typeof sObj
          const hex = getRGBA2Hex(tObj)
          textComp.style.fill = hex
        },
      })
    })
  }
}

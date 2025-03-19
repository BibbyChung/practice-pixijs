import type { Text } from 'pixi.js'
import { getRandomRGBA } from '../../common/utils'
import { BaseComponent } from './base.component'

const rgba = getRandomRGBA()
type FillType = typeof rgba

export class RandomColorFillComponent extends BaseComponent {
  private getTextElem() {
    return this.entity.pixiElem as Text
  }
  getElemStyleFill() {
    const elem = this.getTextElem()
    return elem.style.fill as FillType
  }
  setElemStyleFill(v: string) {
    const elem = this.getTextElem()
    elem.style.fill = v
  }
}

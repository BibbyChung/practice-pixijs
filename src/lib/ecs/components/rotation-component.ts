import { getRandomInt } from '../../common/utils'
import { BaseComponent } from './base-component'

export class RotationComponent extends BaseComponent {
  rotation = getRandomInt(0, 59)
}

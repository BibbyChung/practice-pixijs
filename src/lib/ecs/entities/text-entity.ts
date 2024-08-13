import { Text, type TextStyle, type TextStyleOptions } from 'pixi.js'
import { BaseEntity } from './base-entity'

export class TextEntity extends BaseEntity {
  constructor(
    private wording: string,
    private style?: TextStyle | TextStyleOptions
  ) {
    super()
  }

  create(): void | Promise<void> {
    const t = new Text({
      text: this.wording,
      style: this.style,
    })
    t.anchor.set(0.5)
    t.interactive = true
    t.position.set(this._ge.pixiApp.screen.width / 2, this._ge.pixiApp.screen.height / 2)
    this.pixiElem = t

    t.addEventListener('pointerdown', (event) => {
      console.log(`text pointerdown => ${event.client}`)
    })
  }
}

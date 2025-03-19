import { Container, Text, type TextStyle, type TextStyleOptions } from 'pixi.js'
import { BaseEntity } from './base.entity'
import { getRandomRGBA, getSubject } from '~/lib/common/utils'
import { switchMap, tap } from 'rxjs'
import { getMiniECS } from '~/lib/services/miniECS.service'
import { getComponentKV } from '../_index'
import { CreateComponent } from '../components/create.component'
import { PlacementComponent } from '../components/placement.component'
import { getLoadingDestory } from './loading.entity'
import { RandomColorFillComponent } from '../components/random-color-fill.component'

class TextEntity extends BaseEntity {
  constructor(
    private wording: string,
    private style?: TextStyle | TextStyleOptions
  ) {
    super()
  }

  create(): void | Promise<void> {
    const text = new Text({
      text: this.wording,
      style: this.style,
    })
    text.anchor.set(0.5)
    text.position.set(this.pixiApp.app.screen.width / 2, this.pixiApp.app.screen.height / 2)
    this.pixiElem = text

    text.addEventListener('pointertap', (event) => {
      console.log(`text pointerdown => ${event.client}`)
    })
  }
}

const isReady = getSubject<boolean>()
export const init = () => isReady.next(true)

// add game text
isReady
  .pipe(
    switchMap(() => getLoadingDestory()),
    tap((event) => {
      const ecs = getMiniECS()
      const entity = new TextEntity('Hello, BB!', {
        fontSize: 154,
        fill: getRandomRGBA(),
        align: 'center',
        fontFamily: 'Jaro Regular',
      })
      const componentKV = getComponentKV({
        createComponent: new CreateComponent(entity),
        placementComponent: new PlacementComponent(entity, 'game', 20),
        randomColorFillComponent: new RandomColorFillComponent(entity),
      })
      ecs.addEntityWithComponent(entity, componentKV)
    })
  )
  .subscribe()

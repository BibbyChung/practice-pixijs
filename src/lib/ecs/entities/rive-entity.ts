import { Fit, RiveSprite } from '@qva/pixi-rive'
import { FederatedPointerEvent } from 'pixi.js'
import { combineLatest, filter, map, switchMap, take, tap } from 'rxjs'
import { getBehaviorSubject, getSubject } from '~/lib/common/utils'
import { getMiniECS } from '~/lib/services/miniECS.service'
import { getComponentKV } from '../_index'
import { CreateComponent } from '../components/create-component'
import { PlacementComponent } from '../components/placement-component'
import { BaseEntity } from './base-entity'
import { getLoadingDestory } from './loading-entity'

class RiveEntity extends BaseEntity {
  create(): void | Promise<void> {
    // const assets = this.pixiApp.getGameScreenAssets();
    // assets["/game/game-screen/miss_u_optimized"]

    const rs = new RiveSprite({
      asset: '/game/game-screen/miss_u_optimized',
      animation: 'Start',
      autoPlay: true,
      debug: true,
      interactive: true,
      onReady: (rr) => {
        this.riveSpriteReady$.next(rs)
      },
      onStateChange: (states: string[]) => {
        this.riveSpriteStatesChange$.next(states)
      },
    })
    rs.position.set(this.pixiApp.app.screen.width / 2, this.pixiApp.app.screen.height / 2 + 300)
    rs.anchor.set(0.5)
    rs.scale.set(0.9)
    rs.eventMode = 'static'
    rs.addListener('pointertap', (event: FederatedPointerEvent) => {
      event.stopPropagation()
      this.riveSpriteClick$.next(event)
    })
    rs.fit = Fit.Fill

    this.pixiElem = rs
  }

  riveSpriteReady$ = getSubject<RiveSprite>()
  riveSpriteStatesChange$ = getBehaviorSubject<string[]>([])
  riveSpriteClick$ = getSubject<FederatedPointerEvent>()

  riveSpriteStatesChangeSub = combineLatest([this.riveSpriteReady$, this.riveSpriteStatesChange$])
    .pipe(
      tap(([rs, states]) => {
        if (states.includes('EMOJI_Love_Click')) {
          rs.setInput('isClicked', false)
        }
      })
    )
    .subscribe()

  riveSpriteClickSub = combineLatest([this.riveSpriteReady$, this.riveSpriteClick$])
    .pipe(
      switchMap(([rs, event]) =>
        this.riveSpriteStatesChange$.pipe(
          take(1),
          map((states) => ({ rs, event, states }))
        )
      ),
      filter((info) => !info.states.includes('EMOJI_Love_Click')),
      tap((info) => {
        const propName = 'isClicked'
        if (!info.rs.getInputValue(propName)) {
          info.rs.setInput(propName, true)
        }
      })
    )
    .subscribe()
}

const isReady = getSubject<boolean>()
export const init = () => isReady.next(true)

// add game text
isReady
  .pipe(
    switchMap(() => getLoadingDestory()),
    tap((event) => {
      const ecs = getMiniECS()
      const entity = new RiveEntity()
      const componentKV = getComponentKV({
        createComponent: new CreateComponent(entity),
        placementComponent: new PlacementComponent(entity, 'game', 15),
      })
      ecs.addEntityWithComponent(entity, componentKV)
    })
  )
  .subscribe()

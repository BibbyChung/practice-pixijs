import { Container, FederatedPointerEvent } from 'pixi.js'
import { switchMap, tap } from 'rxjs'
import { getPixiApp } from '~/lib/services/pixiApp.service'
import { getMiniECS } from '../../../lib/services/miniECS.service'
import { getSubject } from '../../common/utils'
import { getComponentKV } from '../_index'
import { ContainerComponent } from '../components/container-component'
import { ContainerClickableComponent } from '../components/containerClickable-component'
import { CreateComponent } from '../components/create-component'
import { DestroyComponent } from '../components/destroy-component'
import { PlacementComponent } from '../components/placement-component'
import { BaseEntity } from './base-entity'
import { getLoadingDestory } from './loading-entity'

export type ContainerLabelType = 'none' | 'loading' | 'game'

class ContainerEntity extends BaseEntity {
  constructor(private label: ContainerLabelType) {
    super()
  }

  create(): void | Promise<void> {
    const c = new Container()
    c.label = this.label
    this.pixiElem = c
  }
}

const isReady = getSubject<boolean>()
export const init = () => isReady.next(true)

const createContainerEntity = (label: ContainerLabelType, order: number) => {
  const ecs = getMiniECS()
  const entity = new ContainerEntity(label)
  const componentKV = getComponentKV({
    createComponent: new CreateComponent(entity),
    containerComponent: new ContainerComponent(entity),
    placementComponent: new PlacementComponent(entity, 'none', order),
  })
  ecs.addEntityWithComponent(entity, componentKV)
}

// create root container
isReady
  .pipe(
    tap(() => {
      createContainerEntity('loading', 10)
      createContainerEntity('game', 0)
    })
  )
  .subscribe()

// make loading container destroy
isReady
  .pipe(
    switchMap(() => getLoadingDestory()),
    tap(() => {
      // destory loading container
      const ecs = getMiniECS()
      const loadingContainer = ecs.getRootContainerEntity('loading')
      ecs.addComponent(loadingContainer, 'destroyComponent', new DestroyComponent(loadingContainer))
    }),
    tap(() => {
      // add game container clickable
      const ecs = getMiniECS()
      const gameContainerEntity = ecs.getRootContainerEntity('game')
      const pixiApp = getPixiApp()
      ecs.addComponent(
        gameContainerEntity,
        'containerClickableComponent',
        new ContainerClickableComponent(
          gameContainerEntity,
          pixiApp.app.screen.width,
          pixiApp.app.screen.height,
          'pointer',
          (event) => {
            gameContainerClickEvent$.next(event)
          }
        )
      )
    })
  )
  .subscribe()

const gameContainerClickEvent$ = getSubject<FederatedPointerEvent>()
export const getGameContainerClickEvent = () => gameContainerClickEvent$.asObservable()

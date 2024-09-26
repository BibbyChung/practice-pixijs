import { Container, FederatedEvent, Sprite, Text } from 'pixi.js'
import { filter, map, tap } from 'rxjs'
import { getSubject } from '../../common/utils'
import { getMiniECS } from '../../services/miniECS.service'
import { getComponentKV } from '../_index'
import { CreateComponent } from '../components/create-component'
import { PlacementComponent } from '../components/placement-component'
import { BaseEntity } from './base-entity'

class LoadingEntity extends BaseEntity {
  create(): void | Promise<void> {
    const container = new Container()

    const assets = this.pixiApp.getLoadScreenAssets()
    const bgSp = Sprite.from(assets['load-screen/bg.png'])
    bgSp.x = 0
    bgSp.y = 0
    bgSp.scale.set(2)
    bgSp.alpha = 0.2
    container.addChild(bgSp)

    // loading container
    const loadingContainer = new Container()
    loadingContainer.x = this.pixiApp.app.screen.width / 2
    loadingContainer.y = this.pixiApp.app.screen.height / 2
    container.addChild(loadingContainer)

    const loadingText = new Text({
      text: 'Loading...',
      style: {
        fontSize: 100,
        fill: 'white',
        align: 'center',
        fontFamily: 'Jaro Regular',
      },
    })
    loadingText.anchor.set(0.5)
    loadingContainer.addChild(loadingText)

    const enterSp = Sprite.from(assets['load-screen/enter.png'])
    enterSp.visible = false
    enterSp.position.set(this.pixiApp.app.screen.width / 2, this.pixiApp.app.screen.height / 2)
    enterSp.anchor.set(0.5)
    container.addChild(enterSp)

    this.pixiElem = container

    // assets downlown progress
    this.subs.push(
      getGameAssetsUpdateLoading()
        .pipe(
          map((progress) => {
            const processText = `${progress.toFixed(2)}%`
            loadingText.text = processText
            console.log(processText)
            if (progress === 1) {
              return true
            }
            return false
          }),
          filter((a) => a),
          tap(() => {
            loadingContainer.removeChild(loadingContainer)
            loadingContainer.removeChild(loadingText)

            enterSp.visible = true
            enterSp.eventMode = 'static'
            enterSp.cursor = 'pointer'
            enterSp.addListener('pointertap', this.enterClickIt.bind(this))
          })
        )
        .subscribe()
    )
  }

  private enterClickIt(event: FederatedEvent) {
    enterClickIt$.next(event)
  }
}

const isReady = getSubject<boolean>()
export const init = () => isReady.next(true)

// create loading entity
isReady
  .pipe(
    tap(() => {
      const ecs = getMiniECS()
      const entity = new LoadingEntity()
      const componentKV = getComponentKV({
        createComponent: new CreateComponent(entity),
        placementComponent: new PlacementComponent(entity, 'loading', 0),
      })
      ecs.addEntityWithComponent(entity, componentKV)
    })
  )
  .subscribe()

// loading event
const gameAssetsUpdateLoading$ = getSubject<number>()
const getGameAssetsUpdateLoading = () => gameAssetsUpdateLoading$.asObservable()
export const setGameAssetsUpdateLoading = (progress: number) =>
  gameAssetsUpdateLoading$.next(progress)

// enter button event
const enterClickIt$ = getSubject<FederatedEvent>()
export const getLoadingDestory = () => enterClickIt$.asObservable()

import type { Subscription } from 'rxjs'
import { getMiniECS } from '../../services/miniECS.service'
import { getPixiApp } from '../../services/pixiApp.service'

export abstract class BaseSystem {
  protected subs: Subscription[] = []
  protected ecs = getMiniECS()
  protected pixiApp = getPixiApp()

  protected abstract getAddedQuery(): unknown
  protected abstract getRemovedQuery(): unknown
  abstract execute(): void
}

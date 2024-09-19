import type { Subscription } from 'rxjs'
import { getMiniECS } from '../../../lib/services/miniECS.service'
import { getPixiApp } from '../../../lib/services/pixiApp.service'

export abstract class BaseSystem {
  protected subs: Subscription[] = []
  protected ecs = getMiniECS()
  protected pixiApp = getPixiApp()

  protected abstract getAddedQuery(): unknown
  protected abstract getRemovedQuery(): unknown
  abstract execute(): void
}

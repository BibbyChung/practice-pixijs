<script lang="ts">
  import { tap } from 'rxjs'
  import { onMount } from 'svelte'
  import { inIframe, isMobile, isSafari, isTablet } from '~/lib/common/device/detecter'
  import { isFullScreenSupport } from '~/lib/common/device/toggleFullScreen'
  import {
    getBehaviorSubject,
    getIsIPhoneFullScreen,
    getIsIPhoneHideToolbar,
    getSubject,
    getWindow,
    setIsIPhoneFullScreen,
    setIsIPhoneHideToolbar,
  } from '~/lib/common/utils'
  import ForceLandscape from '~/lib/components/forceLandscape.svelte'
  import IPhoneFullScreen from '~/lib/components/iPhoneFullScreen.svelte'
  import IPhoneHideToolbar from '~/lib/components/iPhoneHideToolbar.svelte'
  import {
    getFullScreenEntity,
    getRootContainerEntity,
    getSpriteEntity,
    getTextEntity,
  } from '~/lib/ecs/creator'
  import { getGameEngine, initGameEngine } from '~/lib/game-engine'

  let mainElem: HTMLElement

  const isReady$ = getSubject<boolean>()
  const isForceLandscape$ = getBehaviorSubject(false)
  const isIPhoneHideToolbar$ = getIsIPhoneHideToolbar()
  const isIPhoneFullScreen$ = getIsIPhoneFullScreen()

  const deviceDetectorSub = isReady$
    .pipe(
      tap(() => {
        const w = getWindow()

        if (isMobile() || isTablet()) {
          isForceLandscape$.next(true)
        }

        if (isMobile() && !isTablet() && !isFullScreenSupport(w.document.body)) {
          if (inIframe()) {
            if (isSafari()) {
              setIsIPhoneHideToolbar(true)
            }
          } else {
            setIsIPhoneFullScreen(true)
          }
        }
        // setIsIPhoneHideToolbar(true);// use it for test
      })
    )
    .subscribe()

  const gameInitSub = isReady$
    .pipe(
      tap(async () => {
        await initGameEngine(mainElem)
        const world = getGameEngine()
        const rec = getRootContainerEntity()
        world.addEntityWithComponent(rec.entity, rec.componentKV)

        // create a text entity
        const textEntity = getTextEntity()
        world.addEntityWithComponent(textEntity.entity, textEntity.componentKV)

        // create a sprite entity
        const spriteEntity = getSpriteEntity('ghost', 0.3, 0.3)
        world.addEntityWithComponent(spriteEntity.entity, spriteEntity.componentKV)

        // create fullscreen entity
        const fsEntity = getFullScreenEntity()
        world.addEntityWithComponent(fsEntity.entity, fsEntity.componentKV)
      })
    )
    .subscribe()

  onMount(() => {
    isReady$.next(true)

    return () => {
      deviceDetectorSub.unsubscribe()
      gameInitSub.unsubscribe()
    }
  })
</script>

{#if $isIPhoneHideToolbar$}
  <IPhoneHideToolbar />
{/if}
{#if $isIPhoneFullScreen$}
  <IPhoneFullScreen />
{/if}
{#if $isForceLandscape$}
  <ForceLandscape />
{/if}
<main bind:this={mainElem}></main>

<style>
</style>
